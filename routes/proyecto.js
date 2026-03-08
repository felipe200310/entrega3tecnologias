const { Router } = require('express');

const {
    getProyectos,
    createProyecto,
    updateProyecto
} = require('../controllers/proyectoController');

const router = Router();

router.get('/', getProyectos);
router.post('/', createProyecto);
router.put('/:id', updateProyecto);

module.exports = router;