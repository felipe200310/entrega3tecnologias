# Documentación del Proyecto: API de Asesorías

Este documento describe la arquitectura, configuración, estructura de la base de datos y cómo interactuar con todos los módulos de la **API REST del Proyecto de Asesorías**.

---

## 🚀 1. Descripción General
El proyecto es una **API RESTful** construida en **Node.js** utilizando el framework **Express**. Su propósito es gestionar la información de proyectos de asesorías, incluyendo los clientes que los solicitan, las etapas en las que se encuentran, las universidades vinculadas y los tipos de proyecto.

Los datos se persisten en una base de datos NoSQL alojada en la nube usando **MongoDB Atlas**, interactuando mediante el ODM **Mongoose**.

---

## 🛠️ 2. Tecnologías y Dependencias
- **Node.js**: Entorno de ejecución para el servidor.
- **Express (`^5.2.1`)**: Framework web para la creación de rutas y controladores.
- **Mongoose (`^9.2.4`)**: Librería para modelar objetos de MongoDB y realizar consultas.
- **Dotenv (`^17.3.1`)**: Manejo de variables de entorno (ocultar credenciales como la URL de Mongo).
- **Cors (`^2.8.6`)**: Middleware para permitir peticiones HTTP desde otros dominios o aplicaciones frontend.
- **Nodemon (`^3.1.14`)**: Herramienta de desarrollo que reinicia el servidor automáticamente tras detectar cambios.

---

## 📁 3. Estructura del Proyecto

El proyecto sigue el patrón de diseño modelo-vista-controlador (enfocado en el backend, por lo que actúa como Modelo-Ruta-Controlador):

```text
entregaweb2026/
├── db/
│   └── db-connection-mongo.js    # Lógica de conexión a Base de Datos
├── models/                       # Esquemas de la base de datos
│   ├── cliente.js
│   ├── etapa.js
│   ├── proyecto.js
│   ├── tipoProyecto.js
│   └── universidad.js
├── controllers/                  # Lógica de las operaciones CRUD
│   ├── clienteController.js
│   ├── etapaController.js
│   ├── proyectoController.js
│   ├── tipoProyectoController.js
│   └── universidadController.js
├── routes/                       # Endpoints y métodos HTTP habilitados
│   ├── cliente.js
│   ├── etapa.js
│   ├── proyecto.js
│   ├── tipoProyecto.js
│   └── universidad.js
├── index.js                      # Archivo principal que levanta el servidor
├── package.json                  # Configuración de Node y dependencias
└── .env                          # Variables de entorno secretas (MONGO_URI, PORT)
```

---

## ⚙️ 4. Instalación y Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear archivo `.env` en la raíz (si no existe) basado en el `.env.template` y añadir:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster...
   ```
3. Iniciar el servidor:
   * **Modo desarrollo:** `npm run dev`
   * **Modo producción:** `npm run start` o `node index.js`

El servidor indicará: `Servidor corriendo en puerto 4000` y luego `Conectado a MongoDB`.

---

## 📊 5. Modelos de Base de Datos (Mongoose)

### 👥 Cliente
- `nombre`: String (Requerido)
- `email`: String (Requerido, Único)
- `fechaCreacion`, `fechaActualizacion`: Date (Automáticos)

### 📑 Etapa
- `nombre`: String (Requerido, Único) -> Ej: "Anteproyecto", "Desarrollo", "Finalizado".
- `fechaCreacion`, `fechaActualizacion`: Date

### 🗂️ Tipo de Proyecto
- `nombre`: String (Requerido, Único) -> Ej: "Ensayo", "Artículo", "Tesis".
- `fechaCreacion`, `fechaActualizacion`: Date

### 🏫 Universidad
- `nombre`: String (Requerido, Único)
- `direccion`: String (Requerido)
- `telefono`: String (Requerido)
- `fechaCreacion`, `fechaActualizacion`: Date

### 🚀 Proyecto (Modelo Principal)
Concentra las relaciones foráneas (ObjectId) de los demás modelos:
- `numero`: Number (Requerido, Único)
- `titulo`: String (Requerido)
- `fechaInicio`, `fechaEntrega`: Date (Requerido)
- `valor`: Number (Requerido)
- Relaciones obligatorias: `cliente`, `tipoProyecto`, `universidad`, `etapa`.

---

## 🔌 6. APIs / Endpoints (CRUD)

La URL de prueba por defecto es `http://localhost:4000/api`. Todas las entidades comparten las 5 operaciones básicas.

### Formato General de Rutas

Reemplaza `<entidad>` con:
* `clientes`
* `etapas`
* `tipos-proyecto`
* `universidades`
* `proyectos`

| Acción | Método HTTP | URL (Ejemplo Clientes) | Descripción |
| :--- | :--- | :--- | :--- |
| **Listar Todos** | `GET` | `/api/clientes` | Trae todo el historial de registros. En el caso de `proyectos`, trae la info completa relacionada (populate). |
| **Ver un Registro** | `GET` | `/api/clientes/:id` | Muestra la información de un único registro identificado por su ID de MongoDB. |
| **Crear** | `POST` | `/api/clientes` | Inserta un nuevo documento enviando un JSON en el Body de la petición. |
| **Actualizar** | `PUT` | `/api/clientes/:id` | Modifica un documento existente. Automáticamente actualiza su `fechaActualizacion`. |
| **Inhabilitar/Borrar**| `DELETE` | `/api/clientes/:id` | Busca el documento por su ID y lo elimina de la base de datos de manera definitiva. |

### Ejemplos de JSON Body para peticiones POST y PUT:

**Para Universidad:**
```json
{
    "nombre": "Universidad Los Andes",
    "direccion": "Carrera 1 Este # 19A-40",
    "telefono": "3324400"
}
```

**Para Proyecto:** (Requiere IDs existentes copiados de las otras colecciones)
```json
{
    "numero": 105,
    "titulo": "Análisis de Datos Económicos",
    "fechaInicio": "2026-06-01",
    "fechaEntrega": "2026-12-01",
    "valor": 2500000,
    "cliente": "69b415a78e5ab140f7b02bcf",
    "tipoProyecto": "65b...id...",
    "universidad": "65b...id...",
    "etapa": "65b...id..."
}
```
