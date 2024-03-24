const { ethers } = require("ethers");
const express = require("express");
const axios = require("axios");

const { toggleWhitelist } = require("../utils/helpers/blockchain.helpers");
const {
  createApplicant,
  createAccessToken,
} = require("../utils/helpers/verify.helpers");

const router = express.Router();

const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  "/getApplicantData/:address",
  asyncMiddleware(async (req, res, next) => {
    await axios(getApplicantData(req.params.address))
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error.response.data);
      });
  })
);

router.get(
  "/getApplicantStatus/:address",
  asyncMiddleware(async (req, res, next) => {
    await axios(getApplicantStatus(req.params.address))
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
        res.send(error.response.data);
      });
  })
);

router.get(
  "/getAccessToken/:signature",
  asyncMiddleware(async (req, res) => {
    const message =
      "You consent to the collection, storage, and processing of your personal data in accordance with our Privacy Policy";
    const address = ethers.verifyMessage(message, req.params.signature);

    await axios(createAccessToken(address, 1200))
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.send(err.response.data);
      });
  })
);

router.post(
  "/createApplicant/:address",
  asyncMiddleware(async (req, res, next) => {
    await axios(createApplicant(req.params.address))
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        res.send(err.response.data);
      });
  })
);

router.post(
  "/webhook",
  asyncMiddleware(async (req, res, next) => {
    toggleWhitelist(req.body);
    res.send(true);
  })
);

module.exports = router;
