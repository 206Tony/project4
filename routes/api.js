require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const SetsOwned = require('../models/setsOwned');
const ParksNeeded = require('../models/partsNeeded');
const Comment= require('../models/comment');

//onst PartsNeeded = require('../models/partsNeeded');

// router.get('/sets', (req, res) => {
//   axios.get(`https://rebrickable.com/api/v3/lego/sets/?key=${process.env.LEGO_API}`)
//   .then(res => {
//     res.json(res.data)
//   })
// });

// router.get('/sets', (req, res) => {
//   SetsOwned.findById, (err, set) => {
//     if (err) res.json(err)
//     res.json(set)
//   })
// })

router.get('/sets', (req, res) => {
  User.findById(req.user._id).populate('setsOwned').exec((err, user) => {
    if (err) res.json(err)
    res.json(user.setsOwned)
  }) 
})

router.post('/sets', (req, res) => {
  console.log("REQ USER", req.user)
  User.findById(req.user._id, function(err, user) {
    SetsOwned.create({
      setApiId: req.body.setApiId,
      user: req.params._id
  }, 
      function(err, set){
        user.setsOwned.push(set)
        user.save(function(err, user){
        if (err) res.json(err)
          User.findById(req.user._id).populate('setsOwned').exec((err, user) => {
        // populate user 
        // then send forward user.setsOwned
        res.json(user.setsOwned)
        })
      })
    })
  })
})

router.delete('/sets/:id', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    user.setsOwned.splice(req.params.set)
    user.save(err => {
      if (err) res.json(err)
      // Brick.deleteOne({_id: req.body.brickId}, err => {
      //   if (err) res.json(err)
        res.json(user.setOwned)
      })
    })
  })

module.exports = router;

























//  Was in initial GET route

// router.get('/setsowned', (req, res) => {
//   User.findById(req.user._id, function(err, user) {
//   // var setsUrl = "https://api/v3/users/" + process.env./setlists/" + 
//   // axios.get(setUrl)
//   SetsOwned.find({}, (err, set) => {
//     if (err) res.json(err) 
//     res.json(user)
//     // res.json({type: 'success', message: "You accessed the protected api routes"})
//   })
// });

//  Was in initial GET route
// .populate([{
    //   path: 'setsOwned',
    //   model: 'SetsOwned'
    //   }])
    //     .populate([{
    //       path: 'partsNeeded',
    //       model: 'PartsNeeded' 
    //   }]
    // ).exec((err, user) => 