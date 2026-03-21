# API Proyecto Asesorías

Esta es una API RESTful construida en Node.js, Express y MongoDB (Mongoose) para gestionar los proyectos, clientes, etapas, universidades y tipos de proyecto para un sistema de asesorías.

## Requisitos Previos

- Tener instalado [Node.js](https://nodejs.org/) (versión 18+ recomendada)
- Tener acceso o crear un cluster en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Instalación y Configuración

1. **Clona o descarga este repositorio** a tu disco duro local.
2. Abre una terminal dentro de la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   En la raíz del proyecto, asegúrate de tener un archivo llamado `.env` que contenga el puerto y tu enlace de conexión (`MONGO_URI`) hacia la base de datos de Mongo.

   A modo de plantilla, puedes basarte en esto (o renombrar el archivo `.env.template` a `.env`):
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://tuUsuario:tuContraseña@tu-cluster.mongodb.net/proyecto_asesorias?retryWrites=true&w=majority
   ```

## Ejecución del Proyecto

Para iniciar el servidor en tu computadora, puedes usar cualquiera de los dos comandos:

**Modo de Producción (Normal):**
```bash
npm run start
```

**Modo de Desarrollo (con recargas automáticas con Nodemon):**
```bash
npm run dev
```

El servidor arrancará y debería mostrar en tu consola los mensajes:
- "Servidor corriendo en puerto 4000"
- "Conectado a MongoDB"

## Uso de la API y Endpoints

El dominio principal mientras se trabaja local es: `http://localhost:4000/api`.

El sistema cuenta con un **CRUD completo** (GET, GET por Id, POST, PUT, DELETE) para 5 entidades diferentes:

1. `/clientes`
2. `/etapas`
3. `/tipos-proyecto`
4. `/universidades`
5. `/proyectos`

Para ver el formato exacto de las peticiones JSON (Body) aceptado por cada ruta y detalles de cómo consumir cada una, **revisa el archivo `api_documentation.md` (ubicado en tu panel de Gemini)**.

## Tecnologías Utilizadas
- Node.js
- Express
- Mongoose (Traductor de MongoDB)
- Dotenv (Para el manejo de entorno `process.env`)
- Cors (Para permitir llamadas entre distintos dominios)
- Nodemon (Para desarrollo)
