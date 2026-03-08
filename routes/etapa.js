const { Router } = require('express');

const {
    getEtapas,
    createEtapa,
    updateEtapa
} = require('../controllers/etapaController');

const router = Router();

router.get('/', getEtapas);
router.post('/', createEtapa);
router.put('/:id', updateEtapa);

module.exports = router;