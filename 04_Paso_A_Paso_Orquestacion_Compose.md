# Guía Paso a Paso: Orquestación Global mediante Compose

Un gran desafío en arquitecturas en las que se rompe un monolito hacia múltiples microservicios, es la administración, inicialización cruzada e inserción de variables de todos los bloques participantes de la infraestructura. Esta guía estipula nuestra solución creada utilizando la herramienta **Docker Compose**.

## 1. La Generación del Archivo Integrado (YAML)
Se construyó un archivo `docker-compose.yml` en la ruta madre (la raíz) del proyecto general. 

Este archivo YAML emplea la versión de sintaxis `3.8`. Contiene internamente una directiva madre llamada `services` de la que se derivan nuestros dos componentes estructurales.

## 2. Detalles Técnicos de la Directiva del Orquestador

### Componente Lógico A: El Monolito Periférico
Se definió el nombre de sistema `api-monolito`. Este sistema sigue atendiendo Clientes, Etapas, Tipos y Universidades.
* **Mapeo de Red (Ports):** El directivo `ports: - "4000:4000"` dictamina que todo acceso al puerto 4000 de origen (`Host`) sea ruteado hacia el puerto `4000` del contenedor virtual.
* **Entornos (Envs):** Se le instruyó leer las claves secretas desde un archivo en la raíz para no exponer el MongoDB string original: `env_file: - .env`.
* **Fuente del Build:** Se especifica el atributo `build: .` que significa "Toma todo lo que encuentres localmente en la carpeta raíz y busca ahí su archivo Dockerfile para construirlo".

### Componente Lógico B: Microservicio Altamente Demandado (Proyectos)
Separado orgánicamente, se definió `microservicio-proyectos`.
* **Mapeo de Red (Ports):** Se enlazó el puerto `- "4001:4001"` para liberar un nuevo socket para las operaciones ininterrumpidas CRUD cruzadas a `Proyecto`.
* **Fuente del Build:** Se especificó `build: ./microservicio-proyectos`. Es crucial puesto que Docker ahora buscará los archivos fuentes exclusivamente dentro del microdirectorio.
* **Reinicio Dinámico:** Para garantizar que el Alta Demanda nunca colapse en escenarios críticos, a ambos servicios se les asignará por defecto: `restart: unless-stopped`. Si la aplicación crashea, el Orquestador la levantará autónomamente.

## 3. Encendido e Inicialización con un Solo Comando
El trabajo arduo de encender servidores locales o subir variables manualmente se vuelve innecesario.
A través de la consola del Host se ejecuta el comando supremo:

```bash
docker-compose up --build
```
**(El parámetro `--build` garantiza que siempre utilice el código fresco y más reciente modificando la imagen).**

**Resultados Internos de Orquestación:**
Docker Compose leerá el archivo y:
1. Creará una red de enrutamiento interna compartida entre ambos microservicios.
2. Compilará secuencialmente el monolito y luego compilará de forma asíncrona sus dependencias en el microservicio.
3. Encenderá ambas redes a la consola unificada, imprimiendo logs de "Servidor Base corriendo en 4000" y aledaño, un colorido "Microservicio Proyectos corriendo en 4001".
