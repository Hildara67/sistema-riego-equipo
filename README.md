
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
src/          Backend (core, data, dto, servidor) 
public/       Frontend (HTML, CSS, JS)
docs/         Documentación y script BD 
datos/        Datos de prueba 
scripts/      Utilerías
