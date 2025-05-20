const express = require('express');
const router = express.Router();
const {
    getTotalLeads,
    getCostPerLead,
    getConversionRate,
    getLeadsSummary
} = require('../controllers/analyticsController');

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/total-leads', getTotalLeads);
router.get('/cost-per-lead', getCostPerLead);
router.get('/conversion-rate', getConversionRate);
router.get('/summary', getLeadsSummary);

module.exports = router;
