const { TextDecoder, TextEncoder } = require("util");

module.exports = {
  testEnvironment: "jsdom",
  globals: {
    TextDecoder: TextDecoder,
    TextEncoder: TextEncoder,
  },
};
