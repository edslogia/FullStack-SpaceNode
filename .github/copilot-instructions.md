# ESP32_SpaceNode - Instrucciones para el agente de código AI

Siempre responder en español.

Comentarios de código deben estar en español. Solo comentarios necesarios para clarificar lógica compleja.

Nombres de variables y funciones deben estar en inglés, siguiendo las convenciones de estilo de TypeScript.

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

### Frontend (no implementado, pero estandarizado)
- React + TypeScript, Vite, TailwindCSS.
- WebSocket client para tiempo real.
- Recharts/ECharts para gráficas.
- JWT Auth.
- Pantallas: dashboard, historial, estado, log de fallas, configuración.

### Objetivos técnicos
- Ingesta estable de telemetría desde ESP32 vía MQTT.
- Procesamiento en tiempo real de voltaje/corriente/potencia.
- Detección de fallas (baja tensión, pérdida de nodo, sobreconsumo).
- Históricos eficientes con TimescaleDB.
- Dashboard en tiempo real vía WebSockets.
- API REST documentada con OpenAPI.
- Arquitectura modular y escalable.

### Estándares del proyecto
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