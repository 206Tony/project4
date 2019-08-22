require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Set = require('../models/set');
const ParksNeeded = require('../models/partsNeeded');
const Comment= require('../models/comment');

//onst PartsNeeded = require('../models/partsNeeded');

router.get('/sets', (req, res) => { 
  User.findById(req.user._id).populate('set').exec((err, user) => {
    if (err) res.json(err)
    res.json(user)
  }) 
})

router.post('/sets', (req, res) => {
  console.log("REQ USER", req.user)
  User.findById(req.user._id, function(err, user) {
    Set.create({
      setName: req.body.setName,
      user: req.params._id
  }, 
      function(err, set){
        user.set.push(set)
        user.save(function(err, user){
        if (err) res.json(err)
          User.findById(req.user._id).populate('set').exec((err, user) => {
        // populate user 
        // then send forward user.set
        res.json(user.set)
        })
      })
    })
  })
})

router.delete('/sets/:id', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    Set.findByIdAndDelete({
      _id: req.params.id
    },
      (err, user) => {
      if (err) res.json(err)
      console.log("here", req.params.id)
      })
    })
  })







// router.get('/', (req, res) => {
//   res.send('server working');
// })

// router.get('/sets', (req, res) => {
//   Set.find({}, function (err, sets) {
//       if (err) res.json(err)
//       res.json(sets)
//   })
// })

// router.get("/sets/:sid", (req, res) => {
//   Set.findById(req.params.sid, (err, set) => {
//   if (err) res.json(err)
//   res.json(sset)
//   })
// })

// router.post('/sets/', (req, res) =>{
//   User.findById(req.user._id, function(err, user) {
//     Set.create({
//       setName: req.body.setName,
//       user: req.params.userid
//       }, function(err,set){
//           user.set.push(set)
//           user.save(function(err, user){
//             if (err) res.json(err)
//             res.json(user)
//       })
//     })
//   })
// })

// router.put('/sets/:sid', (req, res) => {
//   User.findById(req.user._id, function(err, user) {
//       Set.findByIdAndUpdate (
//         req.params.sid,
//         {
//           setName: req.body.setName,
//           user: req.params.userid
//         },
//         (err, set) => {
//           if (err) res.json(err)
//           res.json(set)
//         }
//       )
//     }
//   )
// })

// router.delete('/sets/:sid', (req, res) => {
//   User.findById(req.user._id, (err, user) => {
//     Set.deleteOne({_id: req.params.sid}, (err, user) => {
//     if (err) res.json(err)
//     res.json(user);
//     })
//   })
// })
  
module.exports = router;



// router.get('/', (req, res) => {
//   res.send('server working');
// })

// router.get('/sets', (req, res) => {
//   Set.find({}, function (err, sets) {
//       if (err) res.json(err)
//       res.json(sets)
//   })
// })

// router.get("/sets/:sid", (req, res) => {
//   Set.findById(req.params.sid, (err, set) => {
//   if (err) res.json(err)
//   res.json(sset)
//   })
// })

// router.post('/sets/', (req, res) =>{
//   User.findById(req.user._id, function(err, user) {
//     Set.create({
//       setName: req.body.setName,
//       user: req.params.userid
//       }, function(err,set){
//           user.set.push(set)
//           user.save(function(err, user){
//             if (err) res.json(err)
//             res.json(user)
//       })
//     })
//   })
// })

// router.put('/sets/:sid', (req, res) => {
//   User.findById(req.user._id, function(err, user) {
//       Set.findByIdAndUpdate (
//         req.params.sid,
//         {
//           setName: req.body.setName,
//           user: req.params.userid
//         },
//         (err, stock) => {
//           if (err) res.json(err)
//           res.json(set)
//         }
//       )
//     }
//   )
// })

// router.delete('/sets/:sid', (req, res) => {
//   User.findById(req.user._id, (err, user) => {
//     Set.deleteOne({_id: req.params.sid}, (err, user) => {
//     if (err) res.json(err)
//     res.json(user);
//     })
//   })
// })





















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