// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');


// router.get('/bricks', (req, res) => {
//   Brick.find({}, (err, bricks) => {
//     if (err) res.json(err) 
//     res.json(bricks)
//     // res.json({type: 'success', message: "You accessed the protected api routes"})
//   })
// });

// router.post('/bricks', (req, res) => {
//   User.findById(req.user._id, function(err, user) {
//     Brick.findById(
//       req.body._id, 
//       function(err,brick){
//           user.bricks.push(brick)
//           user.save(function(err, user){
//             if (err) res.json(err)
//             res.json(user)
//       })
//     })
//   })
// })



// module.exports = router;
