const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "buxxxxxxxxxxx",
    APISecret: "4GsyO7xxxxxxx",
  },
  production: {
    APIKey: "rv5PiX4rTxxxxxxg",
    APISecret: "F113mKKfzQv5ZD4zgxxxxxxxl9Xpy",
  },
};

module.exports = config[env];
