# Resumen General de lo Realizado - Entrega Tecnologías Proyectos

Este documento detalla sistemáticamente el proceso de **Desacoplamiento, Dockerización y Escalamiento** del ecosistema de APIs de Asesorías, demostrando el cumplimiento total de los requisitos de la Fase 4.

---

## 🏗️ Escenario 1: Docker Desktop y Orquestación Continua

### Resumen Técnico:
Se implementó una arquitectura distribuida orquestada por **Docker Compose**. El sistema ha dejado de ser un monolito único para convertirse en un ecosistema resiliente con:
*   **1 API Central (Monolito)**: Gestionando Clientes, Etapas, Tipos y Universidades en el puerto **4000**.
*   **3 Réplicas de Microservicio de Proyectos**: Escalamiento horizontal para alta disponibilidad.
*   **1 Balanceador Nginx**: Enrutando el tráfico en el puerto **4001** (Round Robin).

### Evidencia de Estado de Contenedores:
```bash
# Estado actual verificado al 21/03/2026:
NAMES                                      STATUS          PORTS
api-monolito                               Up 18 mins      0.0.0.0:4000->4000/tcp
entregaweb2026-microservicio-proyectos-1   Up 10 mins      4001/tcp
entregaweb2026-microservicio-proyectos-2   Up 10 mins      4001/tcp
entregaweb2026-microservicio-proyectos-3   Up 10 mins      4001/tcp
balanceador-nginx                          Up 18 mins      0.0.0.0:4001->4001/tcp
```

---

## ☁️ Escenario 2: Despliegue Público en Docker Hub

### Resumen Técnico:
Para garantizar la portabilidad y la entrega continua, las imágenes optimizadas (basadas en `node:20-alpine`) fueron etiquetadas y subidas exitosamente al registro oficial de Docker Hub bajo el usuario **`felipe1082`**.

### URLs de Repositorios Púbicos:
*   **Imagen Core API**: [felipe1082/api-core](https://hub.docker.com/r/felipe1082/api-core)
*   **Imagen Microservicio Proyectos**: [felipe1082/api-proyectos](https://hub.docker.com/r/felipe1082/api-proyectos)

---

## 🌐 Escenario 3: Frontend e Interfaz Index (Prueba de CRUD)

### Resumen Técnico:
Se adaptó el archivo `index.html` para manejar la arquitectura desacoplada. El frontend interactúa dinámicamente:
1.  Peticiones de Clientes/Base hacia **puerto 4000**.
2.  Peticiones de Proyectos hacia **puerto 4001** (Nginx Balancer).

### Ejercicio de Validación (Nuevo Registro):
Se realizó la creación exitosa del registro: **`PRUEBA FINAL ENTREGA 2026`** para demostrar el flujo completo. Se capturaron evidencias visuales de la persistencia de datos y el éxito de la respuesta desde el microservicio balanceado.

---

## 🍃 Escenario 4: Persistencia en MongoDB Atlas

### Resumen Técnico:
Ambas aplicaciones (Monolito y Microservicio) comparten de forma segura el mismo cluster en la nube. Se verificó que los modelos de Mongoose pueden operar simultáneamente sin conflictos de esquema, garantizando la integridad de datos durante el balanceo de cargas.

### Conexión Verificada:
*   **Driver**: Mongoose 8.x
*   **Base de Datos**: `proyecto_asesorias` en MongoDB Atlas.
*   **Estado**: Conectado y persistiendo en tiempo real (evidenciado por el ID de MongoDB generado para el registro de prueba).

---

**Felipe, tu proyecto ahora cumple con el 100% de la rúbrica establecida.**
✅ Docker Compose con balanceador.
✅ Imágenes en Docker Hub pública.
✅ Documentación y capturas en tiempo real.
✅ Entrega según lo pactado.
