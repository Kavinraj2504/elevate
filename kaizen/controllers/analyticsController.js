const Lead = require('../models/Lead');
const Campaign = require('../models/Campaign');

exports.getTotalLeads = async (req, res) => {
    try{
        let campaings=await Campaign.find({userId:req.user_id})

    }
    catch(err){
        console.log(err);
    }
    try {
        const total = await Lead.countDocuments({ user: req.user.id });
        res.json({ totalLeads: total });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCostPerLead = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ user: req.user._id });
        let totalBudget = 0;
        let totalLeads = 0;

        for (let campaign of campaigns) {
            totalBudget += campaign.budget;
            const leads = await Lead.countDocuments({ campaign: campaign._id });
            totalLeads += leads;
        }

        const costPerLead = totalLeads ? (totalBudget / totalLeads).toFixed(2) : 0;
        res.json({ costPerLead });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getConversionRate = async (req, res) => {
    try {
        const leads = await Lead.find({ user: req.user._id });
        const total = leads.length;
        const converted = leads.filter(lead => lead.status === 'converted').length;
        const rate = total ? ((converted / total) * 100).toFixed(2) : 0;
        res.json({ conversionRate: rate });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLeadsSummary = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ user: req.user._id });
        const stats = [];

        for (let campaign of campaigns) {
            const leads = await Lead.find({ campaign: campaign._id });

            const totalLeads = leads.length;
            const converted = leads.filter((l) => l.status === 'converted').length;
            const costPerLead = totalLeads ? (campaign.budget / totalLeads).toFixed(2) : 0;
            const conversionRate = totalLeads ? ((converted / totalLeads) * 100).toFixed(2) : 0;

            stats.push({
                campaignId: campaign._id,
                campaignName: campaign.name,
                totalLeads,
                converted,
                costPerLead,
                conversionRate,
            });
        }

        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
