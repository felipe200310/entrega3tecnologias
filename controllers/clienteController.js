const Cliente = require('../models/cliente');
const { request, response } = require('express');

const getClientes = async (req = request, res = response) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener clientes'
        });
    }
};

const createCliente = async (req = request, res = response) => {
    try {
        const { nombre, email } = req.body;

        const clienteDB = await Cliente.findOne({ email });

        if (clienteDB) {
            return res.status(400).json({
                msg: `El cliente con email ${email} ya existe`
            });
        }

        const cliente = new Cliente({ nombre, email });
        await cliente.save();

        res.status(201).json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear cliente'
        });
    }
};

const updateCliente = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true });

        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar cliente'
        });
    }
};

module.exports = {
    getClientes,
    createCliente,
    updateCliente
};