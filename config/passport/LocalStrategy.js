const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ id }, (err, users) => {
    cb(err, users);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => {
      User.findOne({ email }, async (err, user) => {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false, { message: 'User not found' });
        }

        const isMatched = await sails.helpers.bcrypt.compare(
          password,
          user.password
        );

        if (isMatched) {
          const userDetails = {
            email: user.email,
            name: user.name,
            id: user.id,
            isAdmin: user.isAdmin,
          };
          return cb(null, userDetails, { message: 'Login Succesful' });
        }
        return cb(null, false, { message: 'Invalid Password' });
      });
    }
  )
);

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(
  new JwtStrategy(
    // opts
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },

    (jwtPayload, done) => {
      User.findOne({ id: jwtPayload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    }
  )
);
