const express = require("express");
const router = express.Router();
// const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Campaign = require("../models/Campaign");




// POST route to create a new campaign
router.post('/api', async (req, res) => {
    try {
        const newCampaign = new Campaign(req.body);
        const savedCampaign = await newCampaign.save();
        res.status(201).send(savedCampaign);
    } catch (error) {
        console.error('Error saving campaign:', error);
        res.status(500).send({ message: 'An error occurred while saving the campaign.' });
    }
});

// GET route to retrieve all campaigns
router.get('/api', async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).send(campaigns);
    } catch (error) {
        console.error('Error retrieving campaigns:', error);
        res.status(500).send({ message: 'An error occurred while retrieving campaigns.' });
    }
});




module.exports = router;