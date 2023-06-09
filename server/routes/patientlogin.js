const express = require('express');
const router = express.Router();
const fs = require('fs');
const hashHelper = require('../helper/hashHelper.js');


router.get('/', (req, res) => {
  res.redirect('/patientlogin')
});

router.post('/', async (req, res) => {

  let patients = JSON.parse(fs.readFileSync('../halodoc/src/database/patients.json'))
  const { email, password } = req.body;
  let patient = patients.find((patient) => patient.email === email);
  if (!patient) {
      res.json(null)
      return;
  }
  else {
    let password_matched = await hashHelper.comparePassword(password, patient.password);
    if(password_matched) {
      try {
        req.session.patientID = patient.id;
        res.json(patient)
      } catch (err) {
        console.log(err)
      }
    }
    else {
      res.json(null)
      return;
    }
  }

});

module.exports = router;