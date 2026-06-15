
# STYRAX — Sistema Inteligente de Control de Riego  

Sistema para automatizar la gestión de riego agrícola usando el método FAO-56.  

## Características 
- Captura de lecturas de sensores (humedad, temperatura, HR)
- Cálculo de evapotranspiración (ETc) con método FAO-56
- Balance hídrico automatizado
- Generación de recomendaciones de riego
- Panel de control con semáforo de estado
- Roles: OPERADOR y SUPERVISOR

## Requisitos 
- Node.js 18+
- MariaDB 10+
- WSL / Linux (recomendado)
- Git  

## Instalación 

### 1. Clonar e instalar dependencias
```bash 
git clone https://github.com/Hildara67/sistema-riego-equipo.git
cd sistema-riego-equipo 
npm install 
```

### 2. Configurar MariaDB
```bash
# Instalar MariaDB
sudo apt install mariadb-server fonts-noto-color-emoji -y

# Iniciar el servicio
sudo service mariadb start

# Crear la base de datos
sudo mysql -e "CREATE DATABASE IF NOT EXISTS riego_db;"

# Importar el esquema
sudo mysql riego_db < docs/init_db.sql

# Configurar acceso root sin contraseña
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY ''; FLUSH PRIVILEGES;"
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
```

## Ejecución
```bash
# Modo escritorio (Electron):
npm start
```

Si solo se quiere probar el frontend sin base de datos:
```bash
npm run start:web
```

## Credenciales de prueba
(disponibles solo en modo web demo)

Supervisor: admin / admin123 
Operador: operador1 / operador123 

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
│   ├── 📁 js/                   #   12 scripts
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
│   │   ├── mock-api.js          #     API mock (modo demo)
│   │   └── renderer.js          #     Puente Electron ↔ frontend
├── 📁 docs/
│   └── init_db.sql              #   Script de base de datos
├── 📁 datos/
│   └── sensores.csv             #   Datos de prueba
├── 📁 scripts/
│   └── backup.js                #   Backup de base de datos
├── server.js                    # Servidor Express (modo web)
├── package.json                 # Dependencias y scripts
├── electron-builder.yml          # Configuración de empaquetado
├── render.yaml                  # Despliegue en Render
├── .env.example                 # Variables de entorno
├── logo*.png                    # Logos del proyecto
└── LICENSE                      # Licencia MIT
```
