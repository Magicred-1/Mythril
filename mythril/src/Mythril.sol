// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {EnumerableSet} from "../lib/openzeppelin-contracts/contracts/utils/structs/EnumerableSet.sol";
import {IMythril} from "../interfaces/IMythril.sol";
import {MythrilData} from "../lib/MyrhrilData.sol";
import {Math} from "openzeppelin-contracts/contracts/utils/math/Math.sol";
import {Constants} from "../lib/Constants.sol";

contract Mythril is IMythril, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableSet for EnumerableSet.AddressSet;
    using Math for uint256;

    uint256 public NONCE_INSURANCES = 0; // incremental offer nonce counter, this is the unique ID for the next insurance offer
    uint256 public NONCE_SUBSCRIPTIONS = 0; // incremental subscription nonce counter, this is the unique ID for the next subscription

    EnumerableSet.AddressSet private insurances;
    mapping(address insurance => MythrilData.InsuranceData) insuranceData;
    mapping(address insurance => EnumerableSet.UintSet)
        private INSURANCE_OFFERS;
    mapping(address subscribers => EnumerableSet.UintSet)
        private SUBSCRIBER_SUBSCRIPTIONS;
    mapping(uint256 idOffer => EnumerableSet.AddressSet)
        private OFFER_SUBSCRIBERS;
    mapping(address subscriber => MythrilData.SubscriberData) subscribers;
    mapping(uint256 idOffer => MythrilData.InsuranceOfferData) insuranceOffers;
    mapping(uint256 idSubscription => MythrilData.Subscription) subscriptions;

    constructor() Ownable(msg.sender) {}

    function createOffer(
        MythrilData.InsuranceOfferDataParam calldata params
    ) external {
        require(
            insurances.contains(msg.sender),
            "INVALID SENDER, NOT INSURANCE"
        );
        MythrilData.InsuranceOfferData memory newOffer;
        newOffer.priceAmount = params.priceAmount;
        newOffer.tokenPayment = params.tokenPayment;
        newOffer.maxSubscribers = params.maxSubscribers;
        newOffer.balance = 0;
        newOffer.depositedAmount = 0;

        string memory country = insuranceData[msg.sender].country;

        uint256 ratio = getRatio(country);
        newOffer.ratio = ratio;

        insuranceOffers[NONCE_INSURANCES] = newOffer;
        INSURANCE_OFFERS[msg.sender].add(NONCE_INSURANCES);

        NONCE_INSURANCES++;
    }

    function subscribe(uint256 offerId) external {
        require(
            subscribers[msg.sender].isWhitelisted,
            "Subscriber is not whitelisted"
        );

        require(offerId < NONCE_INSURANCES, "Offer does not exist");

        MythrilData.InsuranceOfferData storage offer = insuranceOffers[offerId];
        require(
            OFFER_SUBSCRIBERS[offerId].length() < offer.maxSubscribers,
            "Offer has reached maximum subscribers"
        );

        require(
            !OFFER_SUBSCRIBERS[offerId].contains(msg.sender),
            "Caller already subscribed"
        );

        bool paymentProcessed = IERC20(offer.tokenPayment).transferFrom(
            msg.sender,
            address(this),
            offer.priceAmount
        );

        require(paymentProcessed, "Payment failed");
        offer.balance += offer.priceAmount;
        offer.depositedAmount += offer.priceAmount;

        bool added = OFFER_SUBSCRIBERS[offerId].add(msg.sender);
        require(added, "Already subscribed");

        MythrilData.Subscription memory newSubscription;
        newSubscription.offerId = offerId;
        newSubscription.subscriber = msg.sender;
        newSubscription.startDate = block.timestamp;
        newSubscription.endDate = 0;
        newSubscription.lastPayment = block.timestamp;
        newSubscription.isActive = true;

        subscriptions[NONCE_SUBSCRIPTIONS] = newSubscription;

        SUBSCRIBER_SUBSCRIPTIONS[msg.sender].add(NONCE_SUBSCRIPTIONS);
        NONCE_SUBSCRIPTIONS++;
    }

    function withdrawFunds(uint256 offerId, uint256 amount) external {
        require(offerId < NONCE_INSURANCES, "Offer does not exist");
        require(
            INSURANCE_OFFERS[msg.sender].contains(offerId),
            "insurance caller is the owner of this offer"
        );

        MythrilData.InsuranceOfferData storage offer = insuranceOffers[offerId];
        uint256 minBalanceAfterWithdrawal = offer.depositedAmount.mulDiv(
            offer.ratio,
            Constants.constantUNITS
        );

        require(
            offer.balance - amount >= minBalanceAfterWithdrawal,
            "Withdrawal exceeds limit"
        );

        bool sent = IERC20(offer.tokenPayment).transfer(msg.sender, amount);
        require(sent, "Failed to withdraw funds");

        offer.balance -= amount;
    }

    function paymentMonthlySubscription(uint256 subscriptionId) external {
        require(
            subscriptionId < NONCE_SUBSCRIPTIONS,
            "Subscription does not exist"
        );
        MythrilData.Subscription storage subscription = subscriptions[
            subscriptionId
        ];
        require(
            subscription.subscriber == msg.sender,
            "Caller is not the subscriber"
        );
        require(subscription.isActive, "Subscription is not active");
        MythrilData.InsuranceOfferData storage offer = insuranceOffers[
            subscription.offerId
        ];
        bool paymentProcessed = IERC20(offer.tokenPayment).transferFrom(
            msg.sender,
            address(this),
            offer.priceAmount
        );
        require(paymentProcessed, "Payment failed");

        subscription.lastPayment += Constants.secondsInMonth;
    }

    function revokeSubscription(uint256 subscriptionId) external {
        require(
            subscriptionId < NONCE_SUBSCRIPTIONS,
            "Subscription does not exist"
        );
        MythrilData.Subscription storage subscription = subscriptions[
            subscriptionId
        ];
        require(subscription.isActive, "Subscription already inactive");

        subscription.isActive = false;

        // Authorization assurance offer or subscription owner
        require(
            SUBSCRIBER_SUBSCRIPTIONS[msg.sender].contains(subscriptionId) ||
                INSURANCE_OFFERS[msg.sender].contains(subscription.offerId),
            "Not authorized to revoke"
        );

        OFFER_SUBSCRIBERS[subscriptionId].remove(subscription.subscriber);
    }

    function insurancePayback(
        uint256 subscriptionId,
        address tokenPayBack,
        uint256 amount
    ) external {
        require(
            subscriptionId < NONCE_SUBSCRIPTIONS,
            "Subscription does not exist"
        );

        MythrilData.Subscription storage subscription = subscriptions[
            subscriptionId
        ];

        require(
            INSURANCE_OFFERS[msg.sender].contains(subscription.offerId),
            "Caller is not the insurance provider of this offer"
        );

        require(
            subscription.lastPayment > block.timestamp,
            "Subscriber has not paid this month"
        );

        bool payBackProcessed = IERC20(tokenPayBack).transferFrom(
            msg.sender,
            subscription.subscriber,
            amount
        );
        require(payBackProcessed, "Token transfer failed");
    }

    /* ------------------------- INTERNAL FUNCTION ------------------------- */

    function getRatio(string memory country) public pure returns (uint256) {
        // Check the country and return the corresponding ratio
        if (keccak256(bytes(country)) == keccak256(bytes("FR"))) {
            return 1500;
        } else if (keccak256(bytes(country)) == keccak256(bytes("CH"))) {
            return 2500;
        } else {
            revert("Unsupported country");
        }
    }

    /* -------------------------- SETTER FUNCTION ------------------------- */

    function whitelistSubscriber(address subscriber) external onlyOwner {
        subscribers[subscriber].isWhitelisted = true;
    }

    function addInsurance(
        address insurance,
        string calldata country
    ) external onlyOwner {
        insurances.add(insurance);
        insuranceData[insurance].country = country;
    }

    /* -------------------------- GETTER FUNCTION ------------------------- */

    function isInsurance(address assurance) external view returns (bool) {
        return insurances.contains(assurance);
    }
}
