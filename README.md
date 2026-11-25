# Asesorías IUDigital (Node.js + MongoDB)

Aplicación del caso de estudio con los módulos: tipos de proyecto, clientes, universidades, etapas y proyectos.

- Puerto de la aplicación: **3000**
- Job de Jenkins: **cd-asesorias-iudigital**
- Pipeline: `Jenkinsfile` (checkout, pruebas, imagen Docker, push a Docker Hub, despliegue con Docker Compose, verificación)

## Endpoints
`GET/POST /api/<modulo>` y `GET/PUT /api/<modulo>/:id` para `tipos-proyecto`, `clientes`, `universidades`, `etapas`, `proyectos`. Salud: `GET /health`.
