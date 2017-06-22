require('dotenv').config();
const { DATABASE_URL, PORT } = require('./config');
const { User } = require('./models')
const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const socketRooms = require('./socket').socketRooms;
const rooms = require('./socket').rooms;
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const nodeServer = require('http').createServer(app);
const io = require('socket.io')(nodeServer);
socketRooms(io);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
});

const upload = multer({ storage: storage});


mongoose.Promise = global.Promise

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}

if (process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}


app.use(passport.initialize());

passport.use(
  new GoogleStrategy({
    clientID: secret.CLIENT_ID,
    clientSecret: secret.CLIENT_SECRET,
    callbackURL: `/api/auth/google/callback`
  },
  (accessToken, refreshToken, profile, cb) => {
    User
      .findOneAndUpdate({ 
        googleId: profile.id,
        displayName: profile.displayName 
      },
      { 
        $set: { 
          accessToken: accessToken, 
          googleId: profile.id 
        } 
      }, { 
        upsert: true, 
        new: true 
      })
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        console.error(err)
      })
  }
  ));
  
passport.use(
  new BearerStrategy(
    (token, done) => {
      User
        .findOne({ accessToken: token })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
        })
        .catch((err) => { 
          console.error(err) 
        })
    }
  )
);

app.get('/api/auth/google',
  passport.authenticate('google', { 
    scope: ['profile'] 
  }));

app.get('/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    res.cookie('accessToken', req.user.accessToken, { expires: 0 });
    res.redirect('/');
  }
);

app.get('/api/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

app.get('/api/me',
  passport.authenticate('bearer', { session: false }),
  (req, res) => res.json({
    googleId: req.user.googleId,
    displayName: req.user.displayName
  })
);

app.use(express.static('audioupload'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  bodyParser.raw({ type: 'audio/ogg', limit: '50mb' })
);

app.post('/api/audioupload', upload.single('mic'), function(req, res, next) {
    try{
    let obj = req.file;
    let sliceString = obj.originalname.substr(0, obj.originalname.indexOf('.'))
    let splitFileName = sliceString.split('_')
    console.log(sliceString, splitFileName)
    io.emit('getMic', 'hello')
    // const audioFile = req.file;
    // console.log(req);
    // //create unique filenames
    // let d = new Date();
    // let n = d.getTime();
    // let newFilename = n+'.ogg'
    // //write file
    // fs.writeFile('../client/public/' + newFilename, req.body, function(err){
    //     if(err) {
    //         console.log('Error in writing file: ', err);
    //     } else {
    //       //broadcast to socket to make an ajax request thru thunk.
    //     }
    // })
    // res.send();
    }
    catch(e){
    console.log(e);
    res.sendStatus(400);
    }
    next();
});


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

let server;

function runServer(port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl = DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = nodeServer.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', (err) => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
