const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/brick', (req, res) => {
  res.json({type: 'success', message: 'You accessed the protected api routes'});
});



module.exports = router;
