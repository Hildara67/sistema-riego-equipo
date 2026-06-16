# Arquitectura del Sistema

## Diagrama general

```
┌─────────────────────────────────────────────────────┐
│                   Electron                          │
│  ┌─────────────────────────────────────────────┐    │
│  │           Proceso Principal (Node.js)        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │    │
│  │  │ main.js  │─▶│  DAOs    │─▶│ MariaDB  │  │    │
│  │  │ (IPC)    │  │ (DB)     │  │          │  │    │
│  │  └────┬─────┘  └──────────┘  └──────────┘  │    │
│  │       │                                     │    │
│  │  ┌────▼─────────────────────────────┐      │    │
│  │  │      Lógica de negocio           │      │    │
│  │  │  ┌──────────┐  ┌──────────────┐  │      │    │
│  │  │  │  FAO-56   │  │    Gestor    │  │      │    │
│  │  │  │ (ETo/ETc) │──│ Decisiones   │  │      │    │
│  │  │  └──────────┘  │ (Umbrales)    │  │      │    │
│  │  │                └──────────────┘  │      │    │
│  │  └────────────────────────────────┘      │    │
│  └─────────────────────────────────────────────┘    │
│                          │ IPC                       │
│  ┌─────────────────────────────────────────────┐    │
│  │           Proceso Renderer (Frontend)        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │    │
│  │  │  HTML    │  │    JS    │  │   CSS    │  │    │
│  │  │(9 págs)  │  │(11 arch) │  │ estilos  │  │    │
│  │  └──────────┘  └──────────┘  └──────────┘  │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## Flujo de datos

```
Sensores (CSV) ──▶ AdaptadorCSV ──▶ LecturaDAO ──▶ MariaDB
                          │
                    API NASA POWER ──▶ AdaptadorAPI
                          │
               MotorFAO56.calcularETc()
                          │
               GestorDecisiones.evaluarUmbral()
                          │
                    RecomendacionDAO ──▶ MariaDB
                          │
                    Frontend (dashboard)
```

## Ciclo de procesamiento automático

```
Cada 30 segundos:   Importar CSV → Insertar lecturas nuevas
Cada 60 segundos:   Leer últimas lecturas → Calcular FAO-56 →
                    Evaluar umbrales → Generar recomendaciones
```

## Descripción de módulos

### src/ (Backend)

| Módulo | Archivo | Función |
|--------|---------|---------|
| Punto de entrada | `main.js` | Inicia Electron, maneja IPC, orquesta procesos |
| FAO-56 | `core/motor_fao56.js` | Calcula ETo, ETc, balance hídrico |
| Decisiones | `core/gestor_decisiones.js` | Evalúa umbrales, determina urgencia, calcula volumen |
| Validación | `core/validador.js` | Valida datos de entrada |
| Conexión DB | `data/db.js` | Pool de conexiones MariaDB |
| DAO Parcela | `data/dao/parcela.dao.js` | CRUD de parcelas |
| DAO Lectura | `data/dao/lectura.dao.js` | CRUD de lecturas |
| DAO Usuario | `data/dao/usuario.dao.js` | CRUD de usuarios |
| DAO Config | `data/dao/config.dao.js` | Configuración de umbrales |
| DAO Recomendación | `data/dao/recomendacion.dao.js` | CRUD de recomendaciones |
| API externa | `data/adaptador_api.js` | Consulta NASA POWER |
| CSV | `data/adaptador_csv.js` | Lectura de archivos CSV |
| Archivos | `data/sistema_archivos.js` | Exportación y respaldos |
| DTOs | `dto/lectura.dto.js`, etc. | Objetos de transferencia |

### public/ (Frontend)

| Pantalla | Archivo HTML | Archivo JS | Función |
|----------|-------------|------------|---------|
| Login | `index.html` | `login.js` | Autenticación de usuarios |
| Dashboard | `dashboard.html` | `dashboard.js` | Panel con indicadores y semáforo |
| Captura | `captura.html` | `captura.js` | Registro de lecturas |
| Historial | `historial.html` | `historial.js` | Visualización historial |
| Recomendaciones | `recomendaciones.html` | `recomendaciones.js` | Recomendaciones generadas |
| Parcelas | `parcelas.html` | `parcelas.js` | CRUD de parcelas |
| Configuración | `configuracion.html` | `configuracion.js` | Umbrales y Kc |
| Auditoría | `auditoria.html` | `auditoria.js` | Registro de cambios |
| Usuarios | `usuarios.html` | `usuarios.js` | Gestión de usuarios |
| Reportes | `reportes.html` | `reportes.js` | Reportes y KPIs |

## Roles de usuario

| Rol | Permisos |
|-----|----------|
| OPERADOR | Capturar lecturas, ver recomendaciones, ver dashboard |
| SUPERVISOR | Todo lo de OPERADOR + gestionar parcelas, usuarios, configuración, aprobar/rechazar recomendaciones |

## Base de datos (MariaDB)

Ver `docs/init_db.sql` para el esquema completo.

Tablas principales:
- `usuarios` — Credenciales y roles
- `parcelas` — Parcelas registradas
- `lecturas` — Lecturas de sensores
- `recomendaciones` — Recomendaciones generadas
- `configuraciones` — Umbrales por parcela
- `auditoria_recomendaciones` — Registro de cambios en recomendaciones
