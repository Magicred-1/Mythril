require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");
const FormData = require("form-data");

const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN;
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY;
const axios = require("axios");

const SUMSUB_BASE_URL = "https://api.sumsub.com";

const levelName = "basic-kyc-level";

var config = {};
config.baseURL = SUMSUB_BASE_URL;

axios.interceptors.request.use(createSignature, function (error) {
  return Promise.reject(error);
});

// Make sure to specify 'Content-Type' header with value of 'application/json' if you're not sending a body for most of requests

// This function creates signature for the request as described here: https://developers.sumsub.com/api-reference/#app-tokens

function createSignature(config) {
  console.log("Creating a signature for the request...");

  var ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data instanceof FormData) {
    signature.update(config.data.getBuffer());
  } else if (config.data) {
    signature.update(config.data);
  }

  config.headers["X-App-Access-Ts"] = ts;
  config.headers["X-App-Access-Sig"] = signature.digest("hex");

  return config;
}

function createApplicant(externalUserId) {
  console.log("Creating an applicant...");

  var method = "post";
  var url = "/resources/applicants?levelName=" + encodeURIComponent(levelName);
  var ts = Math.floor(Date.now() / 1000);

  var body = {
    externalUserId: externalUserId,
  };

  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = JSON.stringify(body);

  return config;
}

function createAccessToken(externalUserId, ttlInSecs = 600) {
  console.log("Creating an access token for initializng SDK...");

  var method = "post";
  var url =
    "/resources/accessTokens?userId=" +
    encodeURIComponent(externalUserId) +
    "&ttlInSecs=" +
    ttlInSecs +
    "&levelName=" +
    encodeURIComponent(levelName);

  var headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  config.method = method;
  config.url = url;
  config.headers = headers;
  config.data = null;

  return config;
}

module.exports = {
  createApplicant,
  createAccessToken,
};
