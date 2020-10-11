const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash',

  description: 'Hash something.',

  inputs: {
    stringToBeEncrypted: {
      type: 'string',
      example: 'password',
      description: 'The string to be bcrypted',
      required: true,
    },
    saltRounds: {
      friendlyName: 'Number of salt rounds',
      description: 'Number of rounds for salting',
      type: 'number',
      defaultsTo: 10,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Encrypted string',
      outputDescription: 'String hashed with bcrypt',
    },
  },

  async fn(inputs, exits) {
    bcrypt.hash(inputs.stringToBeEncrypted, inputs.saltRounds, (err, hash) => {
      if (err) {
        throw err;
      }

      return exits.success(hash);
    });
  },
};
