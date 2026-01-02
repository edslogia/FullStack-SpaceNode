# Página_web_SpaceNode - Instrucciones para el agente de código AI

Siempre responder en español. Pero como estoy aprediendo a comunicarme en inglés, de vez en cuando ayudame a practicarlo de la manera que se te ocurra.

Comentarios de código deben estar en español. Solo comentarios necesarios para clarificar lógica compleja.

Nombres de variables y funciones deben estar en inglés, siguiendo las convenciones de estilo de TypeScript.

Desarrollo en Linux Parrillada OS, usando VSCode. De ser posible, sugiere pruebas de seguridad para mi aplicación web.

Cada vez que se crea un archivo debes actualizar la arquitectura del proyecto en /.guthub/copilot-instructions.md

## Habilidades del desarrollador

- Python, JavaScript, C++, HTML, Bootstrap, React, Express, Node.js, WebSockets programación de microcontroladores, MongoDB, SQL (ESP32, ESP 8266)
- Este proyecto es para aprender: NestJS, TypeScript, MQTT, Prisma, TimescaleDB, Docker, Vite, TailwindCSS 

## Ruta de lo que se ha implmentado en el proyecto

## Backend

- NestJS + TypeScript, ya corre
- Se conecta con EMQX via MQTT, e imprime en consola los mensajes recibidos
- Estructura modular básica creada
- Prisma instalado, pero no configurado

## Frontend

- React + TypeScript + Vite + TailwindCSS, ya corre

## Infraestructura

- Docker Compose con EMQX, TimescaleDB, PGAdmin

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

## Arquitectura actual del proyecto

```
FullStack-SpaceNode/
├── .github/
│   └── copilot-instructions.md      # Instrucciones para el agente AI
├── .env                              # Variables de entorno (gitignored)
├── .env.copy                         # Plantilla de variables de entorno
├── .gitignore                        # Archivos ignorados por git
├── docker-compose.yml                # Orquestación de contenedores
│
├── backend/                          # API NestJS + MQTT + WebSocket
│   ├── src/
│   │   ├── main.ts                   # Punto de entrada de la aplicación
│   │   ├── app.module.ts             # Módulo raíz
│   │   ├── app.controller.ts         # Controlador raíz
│   │   ├── app.service.ts            # Servicio raíz
│   │   ├── app.controller.spec.ts    # Tests del controlador
│   │   ├── mqtt/                     # Módulo MQTT
│   │   │   ├── mqtt.module.ts        # Configuración del módulo MQTT
│   │   │   └── mqtt.service.ts       # Servicio de suscripción MQTT
│   │   └── prisma/                   # Módulo Prisma (vacío por ahora)
│   ├── prisma/                       # Configuración de Prisma (vacío)
│   ├── test/                         # Tests E2E
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   ├── dist/                         # Build compilado
│   ├── node_modules/                 # Dependencias npm
│   ├── package.json                  # Dependencias y scripts
│   ├── package-lock.json
│   ├── tsconfig.json                 # Configuración TypeScript
│   ├── tsconfig.build.json           # Config de build
│   ├── nest-cli.json                 # Config de NestJS CLI
│   ├── eslint.config.mjs             # Config de ESLint
│   ├── .prettierrc                   # Config de Prettier
│   ├── .gitignore
│   └── README.md
│
├── frontend/                         # App React + Vite + TailwindCSS
│   ├── src/
│   │   ├── main.tsx                  # Punto de entrada React
│   │   ├── App.tsx                   # Componente raíz
│   │   ├── App.css                   # Estilos del componente App
│   │   ├── index.css                 # Estilos globales + Tailwind
│   │   └── assets/                   # Recursos estáticos
│   │       └── react.svg
│   ├── public/                       # Assets públicos
│   │   └── vite.svg
│   ├── .vite/                        # Cache de Vite
│   ├── node_modules/                 # Dependencias npm
│   ├── package.json                  # Dependencias y scripts
│   ├── package-lock.json
│   ├── index.html                    # Punto de entrada HTML
│   ├── vite.config.ts                # Configuración de Vite
│   ├── tsconfig.json                 # Config TypeScript base
│   ├── tsconfig.app.json             # Config TS para build (bundler mode)
│   ├── tsconfig.vscode.json          # Config TS para VSCode (node resolution)
│   ├── tsconfig.node.json            # Config TS para Node
│   ├── tailwind.config.js            # Configuración TailwindCSS
│   ├── postcss.config.js             # Configuración PostCSS
│   ├── eslint.config.js              # Configuración ESLint
│   ├── .gitignore
│   └── README.md
│
├── .vscode/                          # Configuración de VSCode
│   └── settings.json                 # Settings del workspace
│
└── docker-compose.yml                # Servicios:
    ├── timescale (PostgreSQL + TimescaleDB) → Puerto 5432
    ├── pgadmin (Administrador de BD) → Puerto 5050
    └── emqx (Broker MQTT) → Puertos 1883, 18083
```

### Estado actual de desarrollo

**Backend:**
- ✅ Estructura base NestJS configurada
- ✅ Módulo MQTT inicializado
- ✅ Dependencias instaladas: Prisma, MQTT, Pino Logger, class-validator
- ⏳ Prisma schema pendiente de creación
- ⏳ WebSocket Gateway pendiente
- ⏳ API REST pendiente
- ⏳ Autenticación JWT pendiente

**Frontend:**
- ✅ Estructura base React + Vite configurada
- ✅ TailwindCSS configurado
- ✅ Configuración dual de TypeScript (bundler + node) para desarrollo
- ⏳ Componentes de UI pendientes
- ⏳ WebSocket client pendiente
- ⏳ Cliente API REST pendiente
- ⏳ Sistema de autenticación pendiente
- ⏳ Dashboard y gráficas pendientes

**Infraestructura:**
- ✅ Docker Compose configurado
- ✅ TimescaleDB configurado
- ✅ PGAdmin configurado
- ✅ EMQX configurado
- ⏳ Backend en Docker pendiente
- ⏳ Frontend en Docker pendiente

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