//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
require('dotenv').config()
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

const Score = require('./models/scores.js')
//___________________
//Middleware
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.render('splash.ejs');
});


//*****************************************************
//              Seed Route
//*****************************************************
  app.get('/score/seed', (req, res)=>{
    Score.create(
        [
          { usrname: "M.Cooper",
            oppname: "M. Spates",
            roundDetail: [{date: "01/01/2000",
                            usrscore: 82,
                            oppscore: 85,
                            usrhdcp: 10,
                            opphdcp:  13,
                            rndnotes: "wet with fresh cut greens"
                          },
                          {date: "03/21/2019",
                            usrscore: 91,
                            oppscore: 92,
                            usrhdcp: 10,
                            opphdcp:  13,
                            rndnotes: "heavy wind"
                          }]
          },          { usrname: "M.Cooper",
                      oppname: "D. Yates",
                      roundDetail: [{date: "12/01/2000",
                                      usrscore: 82,
                                      oppscore: 75,
                                      usrhdcp: 10,
                                      opphdcp:  4,
                                      rndnotes: "wet with fresh cut greens"
                                    },
                                    {date: "03/21/2019",
                                      usrscore: 90,
                                      oppscore: 81,
                                      usrhdcp: 10,
                                      opphdcp:  3,
                                      rndnotes: "brutally hot cart girl mia"
                                    }]
                    }
        ],
        (err, data)=>{
            res.redirect('/score');
        }
    )
  });
//*****************End of Seed*************************

//*****************************************************
//              Delete Route
//*****************************************************
  app.delete('/score/:id', (req, res)=>{
        Score.findByIdAndRemove(req.params.id, (err, data)=>{
            res.redirect('/score');//redirect back to score index
        });
    });


//*****************************************************
//              Index Route
//*****************************************************
  app.get('/score', (req, res) => {
    Score.find({}, (error, scorearray) =>{
      console.log(scorearray)
      res.render('index.ejs',
        {
          scorearray: scorearray
        })
    })
  })

  // //////      show route for the pairing   /////////////////////////
  app.get('/score/show/:id', (req,res) => {
    Score.findById(req.params.id, (error, pairing)=>{
      res.render(
        'show.ejs',
        {
          pairing,
          id: req.params.id
        })
      })
    })
  // //////////////////////////////////////////////////

  // //////      show route for the pairing   /////////////////////////
  app.get('/score/show2/:id', (req,res) => {
    Score.findById(req.params.id, (error, roundinfo)=>{
      console.log(roundinfo, error,req.params.id)
      res.render(
        'show2.ejs',
        {
          roundinfo,
          id: req.params.id
        })
      })
    })
  // //////////////////////////////////////////////////


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
