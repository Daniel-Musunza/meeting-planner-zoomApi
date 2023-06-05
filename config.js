const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "bu4v_ZeER0SAeMEEwh0vwQ",
    APISecret: "4GsyO7d8Smt8MrvtW59NM44onkH7nx8K",
  },
  production: {
    APIKey: "rv5PiX4rTTCDucEMeUTYng",
    APISecret: "F113mKKfzQv5ZD4zgc4j345pevkl9Xpy",
  },
};

module.exports = config[env];
