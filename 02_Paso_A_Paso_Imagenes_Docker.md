# Guía Paso a Paso: Análisis e Implementación de Imágenes Docker

Este archivo aborda sistemáticamente cómo tomamos el código de ambas aplicaciones Node.js (el Monolito y el Microservicio) y los convertimos en recipientes estandarizados e idénticos utilizando archivos **Dockerfile**.

## 1. Fundamentación de la Imagen Base (`FROM`)
Para que un sistema sea altamente escalable y ágil, la imagen base del contenedor no debe pesar 2 GB ni utilizar la versión completa de sistemas operativos. Por lo anterior, ambas aplicaciones inicializan en su `Dockerfile` con:
```dockerfile
FROM node:20-alpine
```
*Alpine Linux* es una distribución ultraligera, orientada directamente a minimizar recursos, pesando apenas ~5 MB, garantizando una virtualización inmediata y segura.

## 2. Paso a Paso: Configuración del Contenedor

Para cada aplicación (`Dockerfile` en la raíz, y `microservicio-proyectos/Dockerfile`), el flujo de acciones está estrictamente delimitado de la siguiente manera:

### A. Directorio de Trabajo
```dockerfile
WORKDIR /app
```
Al correr dentro del contendedor, todos los comandos subsiguientes trabajarán por defecto sobre el directorio principal `/app`. Esto evita problemas de ruta en la ejecución.

### B. Gestión y Caché de Dependencias
```dockerfile
COPY package*.json ./
RUN npm install
```
Se procede a copiar *primero* únicamente los datos de dependencias, y se le instruye al contenedor que haga la instalación. Realizar este proceso *antes* de copiar el código fuente nos permite utilizar los niveles de caché dinámico de Docker y evitar que se reinstale `node_modules/` a menos de que exista un cambio sustancial en `package.json`.

### C. Inyección de Código Limpio
```dockerfile
COPY . .
```
Las demás instrucciones y código de backend se empaquetan y clonan al contenedor.

## 3. Parametrización de Exposición y Puertos (`EXPOSE`)
Dado que seccionamos la aplicación en dos componentes independientes, los puertos expuestos de red a la máquina Host difieren obligatoriamente:

* **Contenedor 1 (Monolito Central):** Se estableció estrictamente `EXPOSE 4000`.
* **Contenedor 2 (Microservicio de Proyectos de Alta Demanda):** Se definió el aislamiento bajo el comando `EXPOSE 4001`.

## 4. Ejecución del Entorno Principal (`CMD`)
Ambos `Dockerfile` finalizan con el mandato de encendido de la aplicación Express:
```dockerfile
CMD ["npm", "start"]
```
Esto obedece a la semántica descrita internamente en los propios archivos `package.json`, en los que existe un parámetro `scripts: { "start": "node index.js" }`, dictando así que al construir y ejecutar el contenedor, Node.js se levantará instantáneamente iniciando nuestro ecosistema API.
