const { Router } = require('express');

const {
    getEtapas,
    createEtapa,
    updateEtapa,
    getEtapaById,
    deleteEtapa
} = require('../controllers/etapaController');

const router = Router();

router.get('/', getEtapas);
router.get('/:id', getEtapaById);
router.post('/', createEtapa);
router.put('/:id', updateEtapa);
router.delete('/:id', deleteEtapa);

module.exports = router;