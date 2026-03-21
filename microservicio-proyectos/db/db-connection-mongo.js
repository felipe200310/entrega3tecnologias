const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.log('Error al conectar MongoDB', error);
    }
};

module.exports = {
    getConnection
};