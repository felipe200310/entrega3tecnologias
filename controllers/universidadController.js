const Universidad = require('../models/universidad');
const { request, response } = require('express');

const getUniversidades = async (req = request, res = response) => {
    try {
        const universidades = await Universidad.find();
        res.status(200).json(universidades);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener universidades'
        });
    }
};

const createUniversidad = async (req = request, res = response) => {
    try {
        const { nombre, direccion, telefono } = req.body;

        const universidad = new Universidad({ nombre, direccion, telefono });
        await universidad.save();

        res.status(201).json(universidad);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear universidad'
        });
    }
};

const updateUniversidad = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const universidad = await Universidad.findByIdAndUpdate(id, data, { new: true });

        res.json(universidad);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar universidad'
        });
    }
};

const getUniversidadById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const universidad = await Universidad.findById(id);

        if (!universidad) {
            return res.status(404).json({ msg: 'Universidad no encontrada' });
        }

        res.json(universidad);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener universidad' });
    }
};

const deleteUniversidad = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const universidad = await Universidad.findByIdAndDelete(id);

        if (!universidad) {
            return res.status(404).json({ msg: 'Universidad no encontrada' });
        }

        res.json({ msg: 'Universidad eliminada', universidad });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar universidad' });
    }
};

module.exports = {
    getUniversidades,
    createUniversidad,
    updateUniversidad,
    getUniversidadById,
    deleteUniversidad
};
