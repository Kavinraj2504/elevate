const express = require('express');
const router = express.Router();
const {
    createCampaign,
    getCampaigns,
    updateCampaign,
    deleteCampaign
} = require('../controllers/campaignController');

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/:userid', createCampaign);
router.get('/:id', getCampaigns);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

module.exports = router;
