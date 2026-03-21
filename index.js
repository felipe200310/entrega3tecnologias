require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getConnection } = require('./db/db-connection-mongo');

const tipoProyectoRoutes = require('./routes/tipoProyecto');
const clienteRoutes = require('./routes/cliente');
const universidadRoutes = require('./routes/universidad');
const etapaRoutes = require('./routes/etapa');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

getConnection();

app.use('/api/tipos-proyecto', tipoProyectoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/universidades', universidadRoutes);
app.use('/api/etapas', etapaRoutes);

app.get('/', (req, res) => {
    res.json({
        msg: 'API proyecto asesorías funcionando'
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});