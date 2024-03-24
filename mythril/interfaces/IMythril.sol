pragma solidity ^0.8.13;

import {MythrilData} from "../lib/MyrhrilData.sol";

interface IMythril {
    /* -------------------- EXTERNAL FNS -------------------------*/

    function whitelistSubscriber(address subscriber) external;

    function createOffer(
        MythrilData.InsuranceOfferDataParam calldata params
    ) external;

    function addInsurance(address insurance, string calldata country) external;

    function withdrawFunds(uint256 offerId, uint256 amount) external;

    function subscribe(uint256 offerId) external;

    function paymentMonthlySubscription(uint256 subscriptionId) external;

    function revokeSubscription(uint256 subscriptionId) external;

    function insurancePayback(
        uint256 subscriptionId,
        address tokenPayBack,
        uint256 amount
    ) external;

    /* -------------------- EVENTS -------------------------*/

    event SubscriberWhitelisted(address indexed subscriber);

    event OfferCreated(
        uint256 indexed offerId,
        address indexed insurance,
        MythrilData.InsuranceOfferData offerDetails
    );
    event InsuranceAdded(address indexed insurance, string country);

    event FundsWithdrawn(uint256 indexed offerId, uint256 amount);

    event SubscriptionMade(
        uint256 indexed subscriptionId,
        address indexed subscriber,
        MythrilData.Subscription newSubscription
    );

    event MonthlySubscriptionPaid(
        uint256 indexed subscriptionId,
        uint256 amount
    );

    event SubscriptionRevoked(uint256 indexed subscriptionId);

    event PaybackProcessed(
        uint256 indexed subscriptionId,
        address tokenPayBack,
        uint256 amount
    );
}
