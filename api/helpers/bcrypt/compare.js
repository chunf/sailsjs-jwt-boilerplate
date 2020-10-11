const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Compare',

  description: 'Compare bcrypt hash',

  inputs: {
    stringToBeCompared: {
      type: 'string',
      example: 'password',
      description: 'The string to be compared',
      required: true,
    },
    hash: {
      type: 'string',
      example: 'hash',
      description: 'Hash to be compared',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Hash Matches',
    },
    notMatch: {
      description: 'Hash does not match',
    },
  },

  async fn(inputs, exits) {
    bcrypt.compare(inputs.stringToBeCompared, inputs.hash, (err, res) => {
      if (err) {
        throw err;
      }

      if (res) {
        return exits.success(true);
      }

      return exits.success(false);
    });
  },
};
