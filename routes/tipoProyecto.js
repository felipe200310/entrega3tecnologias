const { Router } = require('express');

const {
    getTiposProyecto,
    createTipoProyecto,
    updateTipoProyecto,
    getTipoProyectoById,
    deleteTipoProyecto
} = require('../controllers/tipoProyectoController');

const router = Router();

router.get('/', getTiposProyecto);
router.get('/:id', getTipoProyectoById);
router.post('/', createTipoProyecto);
router.put('/:id', updateTipoProyecto);
router.delete('/:id', deleteTipoProyecto);

module.exports = router;