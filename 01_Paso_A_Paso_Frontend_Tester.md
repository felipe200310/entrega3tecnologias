# Guía Paso a Paso: Construcción Analítica de la Aplicación Frontend / Tester E2E

Para verificar el correcto funcionamiento del sistema y simular de forma integral todas las peticiones que realizaría una aplicación front-end real (o un software de pruebas como Postman), se estructuró un script de pruebas "End to End" (E2E). 

## 1. Configuración del Entorno de Pruebas
Dado que nuestras aplicaciones backend están escritas en Node.js, emplearemos Node.js con `axios` (un cliente de peticiones HTTP en JavaScript) para fungir como el frontend.

1. **Creación del directorio de pruebas:** 
   Se creó una carpeta dedicada en la raíz del proyecto llamada `e2e-tests` (a través del comando `mkdir e2e-tests`).
2. **Instalación de la librería de Peticiones HTTP:**
   En la raíz del proyecto se instaló axios mediante npm:
   ```bash
   npm install axios --save
   ```
3. **Creación del Script:**
   Se generó el archivo de pruebas en la ruta `e2e-tests/tester.js`.

## 2. Desarrollo Lógico del Script de Pruebas

El objetivo de este archivo no es solo validar que las APIs existan, sino **validar la cadena relacional** entre las dos computadoras/servidores de nuestro ecosistema (el monolito y el microservicio de Proyectos).

### A. Definición de Constantes y Entorno
El script es consciente de los dos entornos que acabamos de desacoplar y orquestar:
```javascript
const axios = require('axios');
const URL_MONOLITO = 'http://localhost:4000/api';
const URL_MICROSERVICIO = 'http://localhost:4001/api';
```

### B. Ejecución Asíncrona (Promesas Secuenciales)
El flujo fue programado adentro de una función `async` llamada `correrPruebasE2E()` para obligar a que el script espere a que un dato sea creado antes de intentar enviarlo a otra ruta.

**Flujo secuencial programado en el script (Código Implementado):**
1. **Petición POST (Puerto 4000):** Se emite una petición POST a `/api/clientes`. El objeto `res.data._id` generado por Mongo es guardado en memoria RAM en la variable `ids.clienteId`.
2. **Petición POST (Puerto 4000):** Se emite una petición POST a `/api/universidades`. El ID devuelto se guarda como `ids.universidadId`.
3. **Petición POST (Puerto 4000):** Se emite a `/api/etapas`, alojando `ids.etapaId`.
4. **Petición POST (Puerto 4000):** Se emite a `/api/tipos-proyecto`, guardando `ids.tipoId`.

### C. Prueba de Estrés y Desacoplamiento (Cruzando la línea)
Una vez que el monolito (Puerto 4000) nos proveyó de los datos periféricos, el script JavaScript arma un objeto final (`proyectoData`) *utilizando* los códigos ObjectId capturados en la fase anterior y dirige una petición tipo POST directamente al **Microservicio Desacoplado** de alta demanda:
```javascript
const proyectoRes = await axios.post(`${URL_MICROSERVICIO}/proyectos`, proyectoData);
```

## 3. Modo de Ejecución y Resultado
Para correr y validar el entorno, un usuario tan sólo debe abrir la consola y escribir:
```bash
node e2e-tests/tester.js
```

**Resultados Esperados en la terminal:**
El sistema imprime mensajes secuenciales demostrando su avance: `[1/5] Creando Cliente...`, `[2/5] Creando Universidad...`. Si todo sale de acuerdo al análisis de arquitectura, el sistema culminará mostrando que el Proyecto se guardó en el Puerto 4001 de manera exitosa, lo que afirma que las claves foráneas viajaron de un programa al otro e interactuaron con el modelo transaccional de MongoDB satisfactoriamente.
