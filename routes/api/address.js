const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const BodyParser = require('body-parser')

// Address model - Help make queries
const address = require('../../models/address')

router.get('/', async (req, res) => { //represents api/items (because we're already in that file)
  await address.find()
    .then(address => res.json(address))
})

router.get('/:id', async(req, res) => {
  await address
    .findById(req.params.id)
    .then(address => res.json(address))
})

router.post('/', (req, res) => {
  const newAddress = new address({
    name: req.body.name, // comes from a request
    url: req.body.url, 
    address: req.body.address,
    notes: req.body.notes,
  });
  newAddress.save().then(address => res.json(address)); //save to the database, spit out JSON
})

router.put('/:id', (req, res) => {
  console.log(req.body)
  address.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, address) => {
      if (err) return res.status(500).send(err);
      return res.send(address);
    }
  ) 
});

router.delete('/:id', (req, res) => { //represents api/items (because we're already in that file)
  address
    .findById(req.params.id)
    .then(address => address.remove()
    .then(() => res.json({sucess: true})))
    .catch (err => res.status(404).json({success: false}))
})

module.exports = router