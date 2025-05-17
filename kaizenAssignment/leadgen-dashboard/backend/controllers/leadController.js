const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
    const { campaign, startDate, endDate, minScore } = req.query;

    let filter = {};
    if (campaign) filter.campaign = campaign;
    if (startDate && endDate) {
        filter.date = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }
    if (minScore) filter.score = { $gte: parseInt(minScore) };

    try {
        const leads = await Lead.find(filter);
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

