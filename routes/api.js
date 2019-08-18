const express = require('express');
const router = express.Router();
const User = require('../models/user');
const SetsOwned = require('../models/setsOwned');
const ParksNeeded = require('../models/partsNeeded');
const Comment= require('../models/comment');
//onst PartsNeeded = require('../models/partsNeeded');

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed the protected api routes'});
});

router.get('/sets', (req, res) => {
  SetsOwned.find({}, (err, sets) => {
    if (err) res.json(err)
    res.json(sets)
    //res.json({type: 'success', message: "You accessed the protected api routes"})
  })
})

router.get('/sets', (req, res) => {
  User.findById(req.user._id, function(err, user) {
    SetsOwned.find(req.body._id)
    if (err) res.json(err)
    res.json(user)
  }) 
})

router.get('/sets/:id', (req, res) => {
  SetsOwned.findById(req.params.setsOwnedId, (err, set) => {
    if (err) res.json(err)
    res.json(set)
  })
})

// router.post('/sets', (req, res) => {
//   User.findById(req.user._id, function(err, user) {
//     SetsOwned.create(
//       req.body._id, 
//       function(err, set){
//           user.setsOwned.push(set)
//           user.save(function(err, user){
//             if (err) res.json(err)
//             res.json(user)
//       })
//     })
//   })
// })

// router.delete('/sets/:set', (req, res) => {
//   User.findById(req.user._id, (err, user) => {
//     user.setsOwned.splice(req.params.set)
//     user.save(err => {
//       if (err) res.json(err)
//       // Brick.deleteOne({_id: req.body.brickId}, err => {
//       //   if (err) res.json(err)
//         res.json(user)
//       })
//     })
//   })

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
    // ).exec((err, user) => {