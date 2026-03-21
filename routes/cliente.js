const { Router } = require('express');

const {
    getClientes,
    createCliente,
    updateCliente,
    getClienteById,
    deleteCliente
} = require('../controllers/clienteController');

const router = Router();

router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

module.exports = router;