const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Brick = require('../models/setOwned');

router.get('/', (req, res) => {
  res.json({type: 'success', message: 'You accessed the protected api routes'});
});

router.get('/sets', (req, res) => {
  SetOwned.find({}, (err, bricks) => {
    if (err) res.json(err) 
    res.json(bricks)
    // res.json({type: 'success', message: "You accessed the protected api routes"})
  })
});

router.get('/bricks/:id', (req, res) => {
  SetOwned.findById(req.params.bricks, (err, drink) => {
    if (err) res.json(err)
    res.json(drink)
  })
})

router.post('/bricks', (req, res) => {
  User.findById(req.user._id, function(err, user) {
    Brick.create(
      req.body._id, 
      function(err, brick){
          user.bricks.push(brick)
          user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
      })
    })
  })
})

router.delete('/bricks/:brickid', (req, res) => {
  User.findById(req.user._id, (err, user) => {
    user.bricks.pop(req.params.brickid)
    user.save(err => {
      if (err) res.json(err)
      // Brick.deleteOne({_id: req.body.brickId}, err => {
      //   if (err) res.json(err)
        res.json(user)
      })
    })
  })

module.exports = router;