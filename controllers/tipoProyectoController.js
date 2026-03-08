const TipoProyecto = require('../models/tipoProyecto');
const { request, response } = require('express');

const getTiposProyecto = async (req = request, res = response) => {
    try {
        const tipos = await TipoProyecto.find();
        res.status(200).json(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener tipos de proyecto'
        });
    }
};

const createTipoProyecto = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;

        const tipoDB = await TipoProyecto.findOne({ nombre });

        if (tipoDB) {
            return res.status(400).json({
                msg: `El tipo de proyecto ${nombre} ya existe`
            });
        }

        const tipo = new TipoProyecto({ nombre });
        await tipo.save();

        res.status(201).json(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear tipo de proyecto'
        });
    }
};

const updateTipoProyecto = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const tipo = await TipoProyecto.findByIdAndUpdate(id, data, { new: true });

        res.json(tipo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar tipo de proyecto'
        });
    }
};

module.exports = {
    getTiposProyecto,
    createTipoProyecto,
    updateTipoProyecto
};