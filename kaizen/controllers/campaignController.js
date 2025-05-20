const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.create({ ...req.body, user: req.user.id });
        res.status(201).json(campaign);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCampaigns = async (req, res) => {
    let userId=req.params.id;
    try {
        const campaigns = await Campaign.find({ userId:userId});
        res.json(campaigns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json(campaign);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
        res.json({ message: 'Campaign deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
