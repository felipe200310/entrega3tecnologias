# Guía Paso a Paso: Despliegue Público hacia Docker Hub

En el caso de Estudio fue solicitado que la aplicación de mayor criticidad y mayor demanda (que en nuestro diseño es el **Microservicio de Proyectos**) sea publicable y descargable globalmente desde la nube pública de Docker.

A continuación, se documenta el flujo operacional ejecutado para cumplir con este proceso, para ser ejecutado desde su sistema en la terminal.

## 1. Proceso de Autenticación
Dado que el Registro Docker Hub protege su ambiente en la nube, el primer paso para impulsar nuestra imagen construida previamente es certificar identidad contra el repositorio oficial:

```bash
docker login
```
El prompt le exigirá el ingreso de sus credenciales (Nombre de Usuario de Docker y Contraseña). Una vez la plataforma arroje el mensaje de `Login Succeeded`, tenemos vía libre para interactuar.

## 2. Proceso de Construcción Local y Etiquetado (`Tagging`)
Las imágenes de Docker utilizan un formato estandarizado que incluye `usuario/nombre_de_imagen:etiqueta`.

Para construir nuestro componente crítico de Proyectos de forma empaquetada y asignarle nuestro sello:
```bash
docker build -t mimbreuario_de_docker/microservicio-proyectos:latest ./microservicio-proyectos
```
* **Nota Técnica:** Usamos de modificador la opción `-t` para indicar explícitamente el nombre público al que apuntará la imagen. Le sugerimos el tag `latest` para advertirles a la comunidad y a sistemas CI/CD que esta es la versión actual del módulo transaccional de Proyectos.
* **Nota de Ruta:** Usamos `./microservicio-proyectos` al final del comando porque es ahí donde reside nuestro microservicio.

## 3. Comprobación Interna (Opcional pero Recomendado)
Antes de subir datos a la red remota, se garantiza que la imagen construida resida en el caché del Host tecleando:
```bash
docker images
```
Se observará listado `mimbreuario_de_docker/microservicio-proyectos` en la columna de Repositorio.

## 4. Traspaso y Despliegue Global Automático (`Push`)
Finalmente, la subida de datos que emite la contenedorización a nivel mundial se invoca mediante el comando Push:

```bash
docker push mimbreuario_de_docker/microservicio-proyectos:latest
```

En la consola surgirán varias barras de progreso. Cada nivel (Layer) generado durante la creación de nuestro `Dockerfile` (la imagen de Node Alpine, los paquetes NPM, nuestro Código de `index.js`, etc.) es subido recursivamente a su repositorio alojado en `hub.docker.com`.

Tras completarse el 100%, cualquier servidor remoto ahora bastará con operar un simple `docker pull mimbreuario_de_docker/microservicio-proyectos` para obtener toda nuestra arquitectura independientemente y comenzar a usar Proyectos en segundos.
