pragma solidity ^0.8.13;

library MythrilData {
    struct SubscriberData {
        bool isWhitelisted;
    }

    struct Subscription {
        uint256 offerId;
        address subscriber;
        uint256 startDate;
        uint256 endDate;
        uint256 lastPayment;
        bool isActive;
    }

    struct InsuranceOfferDataParam {
        uint256 priceAmount;
        address tokenPayment;
        uint256 maxSubscribers;
    }

    struct InsuranceOfferData {
        uint256 priceAmount;
        address tokenPayment;
        uint256 maxSubscribers;
        uint256 balance;
        uint256 depositedAmount;
        uint256 ratio;
    }

    struct InsuranceData {
        string country;
    }
}
