"use strict";

const token = '';
const appId = '';
const appSecret = '';
const access_token_url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
const official_accounts_name = '';
const expires_in = 72000;

export {token, access_token_url, expires_in, official_accounts_name};
