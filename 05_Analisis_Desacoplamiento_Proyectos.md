# Análisis Justificado: Desacoplamiento Arquitectónico (Migrando de Monolito a Microservicios)

Un requerimiento explícito del Caso de Estudio implicaba descubrir el componente predominante en consumo y uso para migrarlo. A continuación se detallan las decisiones sistemáticas que tomamos para solucionar esta directiva y cómo se ejecutaron transversalmente.

## 1. Fundamentos: ¿Cuál es el componente de mayor demanda?
Analizando toda la lógica de rutas, se concluyó que la estructura **Proyecto** es el recurso central del ecosistema. 

**Explicación técnica:**
1. Es el único Objeto en MongoDB que **reúne relaciones múltiples de foraneidad**. Un `Proyecto` se alimenta operativamente del `ID de Cliente`, del `ID de Universidad`, del `ID de Etapa` y del `ID de TipoProyecto`. Estas consultas y agregados de JOIN relacionales producen alto tiempo de cálculo que fácilmente puede sobrecargar al Monolito original. 
2. Si por alguna razón la aplicación principal colapsa, no hay operaciones base para salvar Proyectos de manera ininterrumpida, perdiendo disponibilidad para el proceso central de negocio.
3. Por todo lo anterior, el módulo `Proyecto` fue designado y extraído al microservicio.

## 2. Ingeniería de Software: Proceso y Código Específico Extraído

Para certificar el desacoplamiento se debió reestructurar por diseño todo nuestro árbol de archivos (`tree`), moviendo de forma quirúrgica ciertos comandos:

### Fase del Monolito Principal (Extracción)
En la aplicación matriz (`index.js` principal en puerto 4000), hicimos una **baja de lógica**:
1. Eliminamos físicamente los requerimientos de la ruta:
   ~~`const proyectoRoutes = require('./routes/proyecto')`~~
2. Eliminamos los montajes de punto de entrada API en Express que habilitaban solicitudes CRUD:
   ~~`app.use('/api/proyectos', proyectoRoutes)`~~
3. Del directorio `/models`, `/controllers` y `/routes`, purificamos todo aquel elemento de "Proyecto", quedando nuestro backend Monolítico ahora solo responsivole para elementos "débiles / satelitales" (ej: Clientes, Tipos, Universidades y Etapas propiamente).

### Fase Microservicio (La Independencia Total)
Entrando plenamente en funciones a la carpeta `/microservicio-proyectos`:
1. **Creación del Entry Point Aislado:**
   Desarrollamos un archivo `microservicio-proyectos/index.js` portando sólo y exclusivamente el cargue relacional de Express y `cors`. A este `index.js`, le asignamos expresamente el **Puerto Físico y de Host 4001** (`process.env.PORT || 4001`).
2. **Duplicación de la Cadena de Control de MongoDB:**
   Fue fundamental copiar de origen todo la capeta `/db` a adentro del microservicio. El Microservicio no le "pide" la línea base al sistema. Él se conecta por **su cuenta propia de Mongoose** a Mongo Atlas Cloud.
3. **El Inconveniente Clásico de `populate()` resuelto:**
   En todo modelo arquitectónico de Microservicios, cuando existe separación total de lógica, se pierden accesos y referencias. Para que Mongoose permitiera que el código pre-existente funcionara y lográsemos validar un proyecto, fue estrictamente necesario **copiar los archivos satelitales** (como `cliente.js`, `etapa.js`) a la bandeja `/microservicio-proyectos/models`. Estos esquemas NO tienen rutas expuestas ni un controlador para modificar, solo existen de forma "read-only virtual" para evitar que nuestro nuevo Servicio arrojara `Error: Schema Cliente hasn't been registered`.
4. El nuevo sistema se instanció en sí mismo haciendo `require` a las rutas del proyecto y alojando exclusivamente en `app.use('/api/proyectos', proyectoRoutes);`.

**Conclusión Operativa:**
El esfuerzo y trabajo logístico aquí analizado resultó en una ganancia inmensa para la estabilidad general de la entrega final. Todo el embudo de "Proyectos" opera independientemente, y tanto Mongoose como Docker respaldan robustamente esta funcionalidad.
