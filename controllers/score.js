const express = require('express');
const router = express.Router();
const Score = require('../models/scores.js')

router.get('/' , (req, res) => {
  res.render('splash.ejs');
});


//*****************************************************
//              Seed Route
//*****************************************************
router.get('/score/seed', (req, res)=>{
  Score.create(
        [
          { usrname: "M.Cooper",
            oppname: "M. Spates",
            date: "01/01/2019",
            usrscore: 82,
            oppscore: 85,
            usrhdcp: 10,
            opphdcp:  13,
            rndnotes: "wet with fresh cut greens"
          },
          { usrname: "M.Cooper",
            oppname: "M. Spates",
            date: "03/21/2019",
            usrscore: 91,
            oppscore: 92,
            usrhdcp: 10,
            opphdcp:  13,
            rndnotes: "heavy wind"
          },
          { usrname: "M.Cooper",
            oppname: "D. Yates",
            date: "12/01/2000",
            usrscore: 82,
            oppscore: 75,
            usrhdcp: 10,
            opphdcp:  4,
            rndnotes: "wet with fresh cut greens"
            },
            {usrname: "M.Cooper",
            oppname: "D. Yates",
            date: "03/21/2019",
            usrscore: 90,
            oppscore: 81,
            usrhdcp: 10,
            opphdcp:  3,
            rndnotes: "brutally hot cart girl mia"
            }
        ],
        (err, data)=>{
            res.redirect('/score');
        }
    )
  });
//*****************End of Seed*************************

/// routes - this is an add route
router.get('/score/new', (req, res) => {
    res.render('new.ejs');
  })

router.post('/create', (req, res) => {
    Score.create(req.body,(error,item) =>{
      res.redirect('/score')
    })
  })

router.get('/score/:id/edit', (req,res) => {
    Score.findById(req.params.id, (error, pairing)=>{
      console.log('in edit')
      res.render(
        'edit.ejs',
        {
          pairing,
          id: req.params.id
        })
      })
    })

  ///////////// put for edit route ///////////
router.put('/score/:id/edit', (req, res)=>{
      Score.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
          res.redirect(`/score`);
      });
  });

//*****************************************************
//              Delete Route
//*****************************************************
router.delete('/score/:id', (req, res)=>{
        Score.findByIdAndRemove(req.params.id, (err, data)=>{
            res.redirect('/score');//redirect back to score index
        });
    });


//*****************************************************
//              Index Route
//*****************************************************
router.get('/score', (req, res) => {
    Score.find({}, (error, scorearray) =>{
      res.render('index.ejs',
        {
          scorearray: scorearray
        })
    })
  })

  // //////      show route for the pairing   /////////////////////////
router.get('/score/:id', (req,res) => {
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

  //////////////  Delete route ////////////////
router.delete('/score/:id', (req, res)=>{
      Score.findByIdAndRemove(req.params.id, (err, data)=>{
          res.redirect('/score');//redirect back to score index
      });
  });




module.exports = router;
