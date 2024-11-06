// models/Campaign.js
const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    cause: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String } // URL from Cloudinary
});

module.exports = mongoose.model('Campaign', CampaignSchema);
