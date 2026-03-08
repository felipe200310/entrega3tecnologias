const { Router } = require('express');

const {
    getClientes,
    createCliente,
    updateCliente
} = require('../controllers/clienteController');

const router = Router();

router.get('/', getClientes);
router.post('/', createCliente);
router.put('/:id', updateCliente);

module.exports = router;