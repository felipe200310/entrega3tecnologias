const { Router } = require('express');

const {
    getTiposProyecto,
    createTipoProyecto,
    updateTipoProyecto
} = require('../controllers/tipoProyectoController');

const router = Router();

router.get('/', getTiposProyecto);
router.post('/', createTipoProyecto);
router.put('/:id', updateTipoProyecto);

module.exports = router;