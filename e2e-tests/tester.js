const axios = require('axios');

const URL_MONOLITO = 'http://localhost:4000/api';
const URL_MICROSERVICIO = 'http://localhost:4001/api';

const correrPruebasE2E = async () => {
    console.log('==============================================');
    console.log('🚀 INICIANDO PRUEBAS E2E (SIMULACIÓN POSTMAN) 🚀');
    console.log('==============================================\n');

    let ids = {
        clienteId: null,
        universidadId: null,
        etapaId: null,
        tipoId: null,
        proyectoId: null
    };

    try {
        console.log('[1/5] Creando Cliente en el Monolito (Pto. 4000)...');
        const clienteRes = await axios.post(`${URL_MONOLITO}/clientes`, {
            nombre: `Testing Cliente ${Date.now()}`,
            email: `cliente${Date.now()}@e2etesting.com`
        });
        ids.clienteId = clienteRes.data._id;
        console.log(`✅ Cliente creado: ${ids.clienteId}`);

        console.log('[2/5] Creando Universidad en el Monolito (Pto. 4000)...');
        const univRes = await axios.post(`${URL_MONOLITO}/universidades`, {
            nombre: `Testing Univ ${Date.now()}`,
            direccion: 'Calle Falsa 123',
            telefono: '555-0192'
        });
        ids.universidadId = univRes.data._id;
        console.log(`✅ Universidad creada: ${ids.universidadId}`);

        console.log('[3/5] Creando Etapa en el Monolito (Pto. 4000)...');
        const etapaRes = await axios.post(`${URL_MONOLITO}/etapas`, {
            nombre: `Etapa Piloto-${Date.now()}`
        });
        ids.etapaId = etapaRes.data._id;
        console.log(`✅ Etapa creada: ${ids.etapaId}`);

        console.log('[4/5] Creando TipoProyecto en el Monolito (Pto. 4000)...');
        const tipoRes = await axios.post(`${URL_MONOLITO}/tipos-proyecto`, {
            nombre: `Ensayo de Pruebas-${Date.now()}`
        });
        ids.tipoId = tipoRes.data._id;
        console.log(`✅ Tipo de Proyecto creado: ${ids.tipoId}`);

        // Ahora probamos el Microservicio enviando todos los ObjectId recolectados
        console.log('\n[5/5] Construyendo Proyecto en MICROSERVICIO (Pto. 4001)...');
        const proyectoData = {
            numero: Date.now(), // Unique random number based on timestamp
            titulo: `Proyecto Testing Integral ${Date.now()}`,
            fechaInicio: "2026-01-01",
            fechaEntrega: "2026-12-31",
            valor: 5000000,
            cliente: ids.clienteId,
            tipoProyecto: ids.tipoId,
            universidad: ids.universidadId,
            etapa: ids.etapaId
        };

        const proyectoRes = await axios.post(`${URL_MICROSERVICIO}/proyectos`, proyectoData);
        ids.proyectoId = proyectoRes.data._id;
        console.log(`✅ Proyecto guardado exitosamente: ${ids.proyectoId}`);
        console.log(`[R] - Título del proyecto creado en Microservicio: "${proyectoRes.data.titulo}"`);

        console.log('\n==============================================');
        console.log('✅✅ ÉXITO FINAL: SISTEMA DESACOPLADO FUNCIONA CORRECTAMENTE ✅✅');
        console.log('El Monolito (4000) y Microservicio (4001) procesaron todo sin errores.');
        console.log('==============================================\n');

    } catch (error) {
        console.error('❌ FATAL ERROR:');
        if (error.response) {
            console.error(error.response.data);
            console.error('Status:', error.response.status);
        } else {
            console.error(error.message);
        }
    }
};

correrPruebasE2E();
