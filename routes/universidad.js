const { Router } = require('express');

const {
    getUniversidades,
    createUniversidad,
    updateUniversidad,
    getUniversidadById,
    deleteUniversidad
} = require('../controllers/universidadController');

const router = Router();

router.get('/', getUniversidades);
router.get('/:id', getUniversidadById);
router.post('/', createUniversidad);
router.put('/:id', updateUniversidad);
router.delete('/:id', deleteUniversidad);

module.exports = router;