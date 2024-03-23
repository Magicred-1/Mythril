pragma solidity ^0.8.13;

import {MythrilData} from "../lib/MyrhrilData.sol";

interface IMythril {
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
}
