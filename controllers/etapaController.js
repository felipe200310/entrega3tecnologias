const Etapa = require('../models/etapa');
const { request, response } = require('express');

const getEtapas = async (req = request, res = response) => {
    try {
        const etapas = await Etapa.find();
        res.status(200).json(etapas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener etapas'
        });
    }
};

const createEtapa = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;

        const etapaDB = await Etapa.findOne({ nombre });

        if (etapaDB) {
            return res.status(400).json({
                msg: `La etapa ${nombre} ya existe`
            });
        }

        const etapa = new Etapa({ nombre });
        await etapa.save();

        res.status(201).json(etapa);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear etapa'
        });
    }
};

const updateEtapa = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const etapa = await Etapa.findByIdAndUpdate(id, data, { new: true });

        res.json(etapa);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar etapa'
        });
    }
};

module.exports = {
    getEtapas,
    createEtapa,
    updateEtapa
};