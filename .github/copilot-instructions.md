# Página_web_SpaceNode - Instrucciones para el agente de código AI

Siempre responder en español. Pero como estoy aprediendo a comunicarme en inglés, de vez en cuando ayudame a practicarlo de la manera que se te ocurra.

Comentarios de código deben estar en español. Solo comentarios necesarios para clarificar lógica compleja.

Nombres de variables y funciones deben estar en inglés, siguiendo las convenciones de estilo de TypeScript.

Desarrollo en Linux Parrillada OS, usando VSCode. De ser posible, sugiere pruebas de seguridad para mi aplicación web.

Cada vez que se crea un archivo debes actualizar la arquitectura del proyecto en /.guthub/copilot-instructions.md

## Habilidades del desarrollador

###

- Python, JavaScript, C++, HTML, Bootstrap, React, Express, Node.js, WebSockets programación de microcontroladores, MongoDB, SQL (ESP32, ESP 8266)
- Este proyecto es para aprender: NestJS, TypeScript, MQTT, Prisma, TimescaleDB, Docker, Vite, TailwindCSS 

## Stack y componentes

### Backend (NestJS + TypeScript)
- Generar código orientado a módulos NestJS.
- Crear microservicios MQTT listos para EMQX.
- Suscripción y validación de telemetría.
- Transformación a DTOs (usando Zod o class-validator).
- Guardado en BD con Prisma (TimescaleDB sobre PostgreSQL).
- Reenvío de datos a WebSocket Gateway (evento estándar: node_update).
- API REST versionada (/api/v1) para gestión de nodos, historial, configuración y autenticación JWT.
- Documentación OpenAPI.
- Servicio de métricas: cálculo de estado, detección de fallas, heartbeat.
- Autenticación JWT + Argon2.
- Logging con Pino Logger.
- Health checks para servicios.

### Infraestructura (Docker Compose)
- EMQX (broker MQTT) - puertos 1883/18083.
- TimescaleDB - puerto 5432.
- PGAdmin 4 - puerto 5050.
- Backend NestJS (API: 3000, WS: 3001).
- Frontend Vite (puerto 5173).

### Frontend
- React + TypeScript, Vite, TailwindCSS.
- WebSocket client para tiempo real.
- Consumo de API REST.
- Recharts/ECharts para gráficas.
- JWT Auth.
- Pantallas: login, dashboard, historial, estado, log de fallas, configuración.

### Objetivos técnicos
- Ingesta estable de telemetría desde ESP32 vía MQTT.
- Procesamiento en tiempo real de voltaje/corriente/potencia.
- Detección de fallas (baja tensión, pérdida de nodo, sobreconsumo).
- Históricos eficientes con TimescaleDB.
- Dashboard en tiempo real vía WebSockets.
- API REST para login y gestión.
- Arquitectura modular y escalable.

### Estándares del proyecto
- Diseño responsivo
- Código en TypeScript estricto.
- Arquitectura de módulos independientes.
- DTOs tipados (Zod o class-validator).
- Endpoints REST versionados (/api/v1).
- Publicación de eventos WebSocket en formato JSON.
- Uso de commit semántico.
- Dockerización completa.

## Capacidades del asistente IA

El asistente debe poder:
- Generar código NestJS orientado a módulos.
- Crear MQTT consumers listos para EMQX.
- Producir eventos WebSocket estándar.
- Diseñar schemas de Prisma para TimescaleDB.
- Generar endpoints REST tipados.
- Escribir funciones de validación.
- Ofrecer recomendaciones de arquitectura.
- Optimizar consultas a series de tiempo.
- Diagnosticar problemas de ingestión.
- Crear archivos Docker y Compose.