const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Generate',

  description: 'Generate jwt.',

  inputs: {
    userId: {
      type: 'string',
      example: 'userId',
      description: 'user id that would be put into the jwt sub',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Generated Token',
    },
  },

  fn: async function (inputs, exits) {
    const token = jwt.sign(
      {
        sub: inputs.userId,
      },
      process.env.JWT_SECRET
    );

    return exits.success(token);
  },
};
