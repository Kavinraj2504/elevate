const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
    try {
        const lead = await Lead.insertOne(req.body);
        res.status(201).json(lead);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLeadsByCampaign = async (req, res) => {
    try {
        console.log(req.user._id)
        const leads = await Lead.find({
            // user: req.user.id,
            campaignId:req.params.campaignId,
        });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateLeadStatus = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(lead);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findOneAndDelete({
            _id: req.params.id,
            // user: req.user._id
        });
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json({ message: 'Lead deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
