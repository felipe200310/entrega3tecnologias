require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getConnection } = require('./db/db-connection-mongo');
const proyectoRoutes = require('./routes/proyecto');

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

getConnection();

// Sólo se montan las rutas de Proyectos en este microservicio
app.use('/api/proyectos', proyectoRoutes);

app.get('/', (req, res) => {
    res.json({
        msg: 'Microservicio de Proyectos funcionando'
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Microservicio activo y visible en puerto ${port}`);
});
