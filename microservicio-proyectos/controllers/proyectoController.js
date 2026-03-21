const Proyecto = require('../models/proyecto');
const Cliente = require('../models/cliente');
const TipoProyecto = require('../models/tipoProyecto');
const Universidad = require('../models/universidad');
const Etapa = require('../models/etapa');
const { request, response } = require('express');

const getProyectos = async (req = request, res = response) => {
    try {
        const proyectos = await Proyecto.find()
            .populate('cliente')
            .populate('tipoProyecto')
            .populate('universidad')
            .populate('etapa');

        res.status(200).json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al obtener proyectos'
        });
    }
};

const createProyecto = async (req = request, res = response) => {
    try {
        const {
            numero,
            titulo,
            fechaInicio,
            fechaEntrega,
            valor,
            cliente,
            tipoProyecto,
            universidad,
            etapa
        } = req.body;

        const proyectoDB = await Proyecto.findOne({ numero });

        if (proyectoDB) {
            return res.status(400).json({
                msg: `El proyecto con número ${numero} ya existe`
            });
        }

        const clienteExiste = await Cliente.findById(cliente);
        const tipoExiste = await TipoProyecto.findById(tipoProyecto);
        const universidadExiste = await Universidad.findById(universidad);
        const etapaExiste = await Etapa.findById(etapa);

        if (!clienteExiste || !tipoExiste || !universidadExiste || !etapaExiste) {
            return res.status(400).json({
                msg: 'Uno o varios datos relacionados no existen'
            });
        }

        const proyecto = new Proyecto({
            numero,
            titulo,
            fechaInicio,
            fechaEntrega,
            valor,
            cliente,
            tipoProyecto,
            universidad,
            etapa
        });

        await proyecto.save();

        res.status(201).json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al crear proyecto'
        });
    }
};

const updateProyecto = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const proyecto = await Proyecto.findByIdAndUpdate(id, data, { new: true });

        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al actualizar proyecto'
        });
    }
};

const getProyectoById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const proyecto = await Proyecto.findById(id)
            .populate('cliente')
            .populate('tipoProyecto')
            .populate('universidad')
            .populate('etapa');

        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener proyecto' });
    }
};

const deleteProyecto = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const proyecto = await Proyecto.findByIdAndDelete(id);

        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        res.json({ msg: 'Proyecto eliminado', proyecto });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al eliminar proyecto' });
    }
};

module.exports = {
    getProyectos,
    createProyecto,
    updateProyecto,
    getProyectoById,
    deleteProyecto
};