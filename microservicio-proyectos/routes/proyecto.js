const { Router } = require('express');

const {
    getProyectos,
    createProyecto,
    updateProyecto,
    getProyectoById,
    deleteProyecto
} = require('../controllers/proyectoController');

const router = Router();

router.get('/', getProyectos);
router.get('/:id', getProyectoById);
router.post('/', createProyecto);
router.put('/:id', updateProyecto);
router.delete('/:id', deleteProyecto);

module.exports = router;