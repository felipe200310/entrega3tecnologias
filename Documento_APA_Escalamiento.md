# PORTADA

**Actividad: Escalamiento Horizontal y Balanceo de Cargas de Arquitectura Desacoplada**
**Estudiante:** [Tu Nombre / Nombres de Integrantes del Grupo, máx. 4]
**Asignatura / Tutor:** [Nombre de Asignatura] - [Nombre Tutor]
**Fecha:** 20 de Marzo de 2026

---

# INTRODUCCIÓN

En la evolución de las arquitecturas de software modernas, migrar de un sistema monolítico a un ecosistema de microservicios orientados a la demanda no solo persigue reducir la deuda técnica, sino también garantizar la Alta Disponibilidad (High Availability). La presente actividad aborda de forma integral la refactorización arquitectónica de una API tipo CRUD construida en Node.js, Express y Mongoose. 

Durante el Caso de Estudio #1, se detectó que el módulo transaccional de "Proyectos" operaba como un eslabón crítico debido a sus múltiples interrelaciones mediante el comando `populate()` hacia las colecciones de Clientes, Universidades, Tipos y Etapas. Para evitar cuellos de botella y maximizar el despacho simultáneo, se logró desacoplar dicho servicio hacia un contenedor autónomo, culminando con la orquestación, el escalamiento horizontal y su protección tras un Balanceador de Cargas basado en Nginx, desplegado mediante Docker Compose.

---

# DESARROLLO Y EXPLICACIÓN DE LA CONFIGURACIÓN

### 1. Desacoplamiento Lógico
Se diseccionó el Monolito (que escucha públicamente en el puerto `4000`), purgando toda lógica del código interno `proyectoRoutes` y `proyectoController`. Este componente fue alojado en la carpeta independiente `microservicio-proyectos` (que procesionalmente se comunica en el puerto `4001` interno). A fin de sostener la integridad de los "Schema References", el subdirectorio replica únicamente los modelos Mongoose satélites estrictamente necesarios para su `populate`, independizándose transaccionalmente de las caídas de latencia del Monolito.

### 2. Contenedorización e Inyección Hacia Docker Hub
Ambos bloques fueron contenerizados escribiendo archivos `Dockerfile` ultra-ligeros fundamentados en `node:20-alpine`. Se asignaron comandos estrictos de exposición de puertos e instalaciones en caché. Las imágenes de este sistema fueron publicadas y empujadas (Pushing) al repositorio intergaláctico "Docker Hub", certificando así la entrega remota exigida en la rúbrica.

### 3. Escalamiento Horizontal Activo (Replicación)
La instrucción de escalar requirió adecuar el orquestador general `docker-compose.yml`. Para el microservicio "Proyectos", se removió cualquier directiva estática de nombres de contenedor (`container_name`) y mapeo estricto contra el local host, inyectando en su lugar la directiva Docker: `deploy: replicas: 3`. Lo anterior clona el contenedor tres veces de forma nativa e invisible; todos escuchando la red virtual de Docker en su puerto interno 4001.

### 4. Componente de Balanceo de Cargas (Nginx)
No es matemáticamente viable exponer 3 contenedores idénticos al mismo puerto de la máquina host. Por tanto, se instauró un proxy reverso y balanceador de cargas (Load Balancer) empleando una imagen de `nginx:alpine`. Este servicio (`balanceador-nginx`) se apropia del puerto físico del anfitrión `4001:4001` y su archivo nativo configurado en `nginx.conf` fue volumizado. Haciendo uso de la función de DNS interno de Docker (Round-Robin), la directiva `proxy_pass http://microservicio-proyectos:4001;` recibe el tráfico del cliente y lo distribuye uniformemente contra las tres (3) réplicas procesables de Node.js.

---

# CONCLUSIONES

1. Se superó eficientemente el desafío del particionamiento de la base de código Node.js (Monolito), manteniendo operante las llaves foráneas No-SQL a través del MongoDB nativo de microservicio.
2. El enrutamiento de peticiones se optimizó exitosamente: un consumidor solo dialoga con el Nginx, ignorando e invisibilizando cuantas réplicas lo conforman. Esto evita saturaciones directas.
3. Se garantizó el uso de las mejores prácticas de automatización al documentar, etiquetar hacia Docker Hub, y facilitar el encendido transaccional de 5 servidores de micro-virtualización combinadas gracias a un único mandato de Compose (`docker-compose up --build`).
