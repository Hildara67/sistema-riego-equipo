
# STYRAX — Sistema Inteligente de Control de Riego  

Sistema de escritorio para automatizar la gestión de riego agrícola usando el método FAO-56.  

## Objetivos

- Automatizar el cálculo de evapotranspiración (ETo/ETc) con datos climáticos reales
- Generar recomendaciones de riego precisas basadas en umbrales configurables
- Proveer una interfaz gráfica intuitiva para el monitoreo y control de parcelas
- Almacenar y consultar el historial de lecturas y recomendaciones
- Facilitar la toma de decisiones mediante un panel de control con semáforo de estado

## Tecnologías utilizadas

| Tecnología | Propósito |
|------------|-----------|
| Electron 28 | Aplicación de escritorio multiplataforma |
| Node.js 20 | Entorno de ejecución backend |
| MariaDB 10 | Base de datos relacional |
| MySQL2 | Conexión a base de datos |
| Axios | Consultas a API NASA POWER |
| dotenv | Variables de entorno |

## Características 
- Captura de lecturas de sensores (humedad, temperatura, HR)
- Cálculo de evapotranspiración (ETc) con método FAO-56
- Balance hídrico automatizado
- Generación de recomendaciones de riego cada 60 segundos
- Panel de control con semáforo de estado
- Importación automática de CSV cada 30 segundos
- Roles: OPERADOR (captura) y SUPERVISOR (administración)

## Requisitos 
- Node.js 18+
- MariaDB 10+
- WSL / Linux (recomendado)
- Git  

## Instalación 

### Alternativa rápida (automatizada)
```bash
bash scripts/setup.sh
```
Esto instala Node.js 20, MariaDB, librerías necesarias, configura la base de datos y las dependencias del proyecto automáticamente.

### 1. Clonar e instalar dependencias
```bash 
git clone https://github.com/Hildara67/sistema-riego-equipo.git
cd sistema-riego-equipo 
npm install 
```

### 2. Configurar MariaDB
```bash
# Instalar MariaDB
sudo apt install mariadb-server -y

# Iniciar el servicio
sudo service mariadb start

# Crear la base de datos
sudo mysql -e "CREATE DATABASE IF NOT EXISTS riego_db;"

# Importar el esquema
sudo mysql riego_db < docs/init_db.sql

# Configurar acceso root sin contraseña
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY ''; FLUSH PRIVILEGES;"
```

### 3. Fuente para emojis
La interfaz usa emojis como indicadores de estado (🟢 conectado, 🔴 desconectado, etc.).  
En WSL/Linux es necesario instalarlos para que se vean correctamente:

```bash
sudo apt install fonts-noto-color-emoji -y
```

### 4. Configurar variables de entorno
```bash
cp .env.example .env
```
 
## Ejecución
```bash
npm start
```

## Credenciales de prueba

Supervisor: `admin` / `admin123`
Operador: `operador1` / `operador123`

## Flujo de trabajo

Este proyecto utiliza **GitHub Flow**: ramas `feature/` desde `main`, Pull Requests para integración y merges directos.

Ver [`docs/FLUJO_DE_TRABAJO.md`](docs/FLUJO_DE_TRABAJO.md) para más detalle.

## Autores

| Integrante | Contribución principal |
|------------|----------------------|
| Hildara | Backend (FAO-56, DAOs, Electron) |
| Nicol | Frontend administración (parcelas, usuarios, configuración, auditoría) |
| María | Frontend operativo (dashboard, captura, historial, recomendaciones) |
| Danna | Reportes, logos, datos de prueba, script setup.sh |

## Estructura del Proyecto 

```
📦sistema-riego-equipo
├── 📁 src/                      # Backend (Electron)
│   ├── 📁 core/                 #   Lógica de negocio
│   │   ├── motor_fao56.js       #     Cálculo FAO-56 (ETc)
│   │   ├── gestor_decisiones.js #     Evaluación de umbrales
│   │   └── validador.js         #     Validación de datos
│   ├── 📁 data/                 #   Capa de datos
│   │   ├── 📁 dao/              #     Acceso a base de datos
│   │   ├── db.js                #     Conexión MariaDB
│   │   ├── adaptador_api.js     #     API NASA POWER
│   │   ├── adaptador_csv.js     #     Importación CSV
│   │   └── sistema_archivos.js  #     Archivos locales
│   ├── 📁 dto/                  #   Objetos de transferencia
│   └── main.js                  #   Punto de entrada Electron
├── 📁 public/                   # Frontend (HTML, CSS, JS)
│   ├── *.html                   #   9 pantallas (login, dashboard, captura, etc.)
│   ├── 📁 css/
│   │   └── estilos.css          #     Hoja de estilos principal
│   ├── 📁 js/                   #   11 scripts
│   │   ├── login.js             #     Autenticación
│   │   ├── dashboard.js         #     Panel de control
│   │   ├── captura.js           #     Captura de lecturas
│   │   ├── historial.js         #     Historial de lecturas
│   │   ├── recomendaciones.js   #     Recomendaciones
│   │   ├── parcelas.js          #     Gestión de parcelas
│   │   ├── configuracion.js     #     Configuración de umbrales
│   │   ├── auditoria.js         #     Auditoría
│   │   ├── usuarios.js          #     Gestión de usuarios
│   │   ├── reportes.js          #     Reportes y KPIs
│   │   ├── inactividad.js       #     Control de sesión
│   │   └── renderer.js          #     Puente Electron ↔ frontend
├── 📁 docs/
│   ├── init_db.sql              #   Script de base de datos
│   ├── INFORME.md               #   Informe del proyecto
│   ├── FLUJO_DE_TRABAJO.md      #   Documentación del flujo de trabajo
│   ├── ARQUITECTURA.md          #   Arquitectura del sistema
│   └── manual_usuario.md       #   Manual de usuario
├── 📁 tests/                    #   Pruebas unitarias
├── 📁 datos/
│   └── sensores.csv             #   Datos de prueba
├── 📁 scripts/
│   ├── setup.sh                 #   Instalación automatizada
│   └── backup.js                #   Backup de base de datos
├── REQUISITOS.txt               #   Requisitos detallados del sistema
├── CONTRIBUTING.md              # Guía para contribuir al proyecto
├── package.json                 # Dependencias y scripts
├── electron-builder.yml          # Configuración de empaquetado
├── .env.example                 # Variables de entorno
├── logo*.png                    # Logos del proyecto
└── LICENSE                      # Licencia MIT
