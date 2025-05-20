const express = require('express');
const router = express.Router();
const {
    createLead,
    getLeadsByCampaign,
    updateLeadStatus,
    deleteLead
} = require('../controllers/leadController');

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', createLead);
router.get('/campaign/:campaignId', getLeadsByCampaign);
router.put('/:id', updateLeadStatus);
router.delete('/:id', deleteLead);

module.exports = router;
