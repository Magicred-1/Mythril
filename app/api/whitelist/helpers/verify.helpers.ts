import { NextApiRequest, NextApiResponse } from 'next';
import { createHmac } from 'crypto';
import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';
import FormData from 'form-data';

require('dotenv').config();

const SUMSUB_APP_TOKEN = process.env.SUMSUB_APP_TOKEN as string;
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET_KEY as string;
const SUMSUB_BASE_URL = process.env.SUMSUB_BASE_URL as string;
const levelName = "basic-kyc-level";

interface CustomRequest extends AxiosRequestConfig {
  method: string;
  url: string;
  headers: {
    [key: string]: string;
  };
  data: any;
}

const config: AxiosRequestConfig = {
  baseURL: SUMSUB_BASE_URL,
};

axios.interceptors.request.use(createSignature, function (error) {
  return Promise.reject(error);
});

function createSignature(config: CustomRequest) {
  const ts = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(ts + config.method.toUpperCase() + config.url);

  if (config.data instanceof FormData) {
    signature.update(config.data.getBuffer());
  } else if (config.data) {
    signature.update(JSON.stringify(config.data));
  }

  config.headers["X-App-Access-Ts"] = ts.toString();
  config.headers["X-App-Access-Sig"] = signature.digest("hex");

  return config;
}

export const createApplicant = (externalUserId: string, levelName: string) => {
  const method = "post";
  const url = `/resources/applicants?levelName=${levelName}`;
  const ts = Math.floor(Date.now() / 1000);

  const body = {
    externalUserId: externalUserId,
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  const customConfig: CustomRequest = {
    method: method,
    url: url,
    headers: headers,
    data: body,
  };

  return customConfig;
};

export function addDocument(applicantId: string) {
  const method = "post";
  const url = `/resources/applicants/${applicantId}/info/idDoc`;
  const filePath = "resources/sumsub-logo.png";

  const metadata = {
    idDocType: "PASSPORT",
    country: "GBR",
  };

  const form = new FormData();
  form.append("metadata", JSON.stringify(metadata));

  const content = fs.readFileSync(filePath);
  console.log("content PNG", content);
  form.append("content", content, filePath);

  const headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
    ...form.getHeaders(),
  };

  const customConfig: CustomRequest = {
    method: method,
    url: url,
    headers: headers,
    data: form,
  };

  return customConfig;
}

export const getApplicantStatus = (applicantId: string) => {
  const method = "get";
  const url = `/resources/applicants/${applicantId}/status`;

  const headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  const customConfig: CustomRequest = {
    method: method,
    url: url,
    headers: headers,
    data: null,
  };

  return customConfig;
};

export const getApplicantData = (externalUserId: string) => {
  const method = "get";
  const url = `/resources/applicants/-;externalUserId=${externalUserId}/one`;

  const headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  const customConfig: CustomRequest = {
    method: method,
    url: url,
    headers: headers,
    data: null,
  };

  return customConfig;
};

export function createAccessToken(
  externalUserId: string,
  levelName: string = "basic-kyc-level",
  ttlInSecs: number = 600
) {
  const method = "post";
  const url = `/resources/accessTokens?userId=${externalUserId}&ttlInSecs=${ttlInSecs}&levelName=${levelName}`;

  const headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  const customConfig: CustomRequest = {
    method: method,
    url: url,
    headers: headers,
    data: null,
  };

  return customConfig;
}
