const { Router } = require('express');

const {
    getUniversidades,
    createUniversidad,
    updateUniversidad
} = require('../controllers/universidadController');

const router = Router();

router.get('/', getUniversidades);
router.post('/', createUniversidad);
router.put('/:id', updateUniversidad);

module.exports = router;