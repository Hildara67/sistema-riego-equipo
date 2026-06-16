# INFORME DEL PROYECTO — STYRAX

## Sistema Inteligente de Control de Riego Agrícola

---

### 1. Descripción del proyecto

STYRAX es una aplicación de escritorio desarrollada con **Electron** y **MariaDB** que automatiza la gestión de riego agrícola utilizando el método **FAO-56** para calcular la evapotranspiración de referencia (ETo). El sistema permite capturar lecturas de sensores, generar recomendaciones de riego, administrar parcelas y cultivos, y controlar el acceso mediante roles de usuario (OPERADOR y SUPERVISOR).

### 2. Herramientas y tecnologías utilizadas

| Herramienta | Versión | Propósito |
|-------------|---------|-----------|
| Node.js | 20+ | Entorno de ejecución JavaScript |
| Electron | 28+ | Framework de aplicación de escritorio |
| MariaDB | 10+ | Base de datos relacional |
| MySQL2 | 3.x | Conexión a base de datos desde Node.js |
| Axios | 1.x | Cliente HTTP para API NASA POWER |
| CSV-Parser | 3.x | Lectura de datos de sensores desde CSV |
| dotenv | 16.x | Configuración de variables de entorno |
| Git | 2.30+ | Control de versiones |
| GitHub | — | Plataforma de colaboración |
| WSL2 | — | Entorno de desarrollo (Linux en Windows) |
| Visual Studio Code | — | Editor de código |

### 3. Flujo de trabajo

Se utilizó **GitHub Flow** como modelo de desarrollo. Este flujo consiste en:

1. Crear una rama `feature/` a partir de `main`
2. Desarrollar la funcionalidad en la rama
3. Abrir un Pull Request para revisar el código
4. Integrar los cambios a `main` mediante merge

**Ramas creadas durante el proyecto:**

| Rama | Contenido | Integrante |
|------|-----------|------------|
| `feature/backend-core` | Módulo backend, base de datos, DAOs, lógica FAO-56 | Compañera 1 |
| `feature/frontend-admin` | Gestión de parcelas, usuarios, auditoría, configuración | Compañera 3 |
| `feature/frontend-operativo` | Dashboard, captura, historial, recomendaciones | Compañera 2 |
| `feature/reportes-assets` | Reportes, logos, script de setup, assets | Compañera 4 |

### 4. Integrantes y contribuciones

| Integrante | Contribución principal |
|------------|----------------------|
| Hildara | Backend (FAO-56, DAOs, DB), Electron, integración general |
| Nicol | Frontend administración (parcelas, usuarios, configuración, auditoría) |
| María | Frontend operativo (dashboard, captura, historial, recomendaciones) |
| Danna | Reportes, logos, datos de prueba, script setup.sh |

### 5. Arquitectura del sistema

```
[Electron] → [main.js (IPC)] → [DAO] → [MariaDB]
                ↓
          [FAO-56] → [Gestor Decisiones] → [Recomendación]
                ↓
          [Frontend HTML/JS/CSS]
```

El backend corre dentro de Electron como proceso principal (Node.js). La comunicación entre el frontend (HTML/JS) y el backend se realiza mediante **IPC (Inter-Process Communication)** de Electron.

### 6. Resultados obtenidos

- Aplicación de escritorio funcional con interfaz gráfica
- Conexión a MariaDB para almacenamiento persistente
- Cálculo de evapotranspiración usando datos climáticos de NASA POWER
- Generación automática de recomendaciones de riego cada 60 segundos
- Importación automática de lecturas desde archivo CSV cada 30 segundos
- Sistema de roles (OPERADOR y SUPERVISOR)
- Panel de control con semáforo de estado

### 7. Enlaces

- Repositorio: https://github.com/Hildara67/sistema-riego-equipo
- Documentación completa: `docs/` en el repositorio

---

*Documento generado como parte del proyecto final de Tecnologías Computacionales.*
