
# STYRAX — Sistema Inteligente de Control de Riego  

Sistema para automatizar la gestión de riego agrícola usando el método FAO-56.  

## Características 
- Captura de lecturas de sensores (humedad, temperatura, HR)
- Cálculo de evapotranspiración (ETc) con método FAO-56
- Balance hídrico automatizado
- Generación de recomendaciones de riego
- Panel de control con semáforo de estado
- Roles: OPERADOR y SUPERVISOR
- Modo demo sin servidor (localStorage)  

## Requisitos 
- Node.js 18+ 
- WSL / Linux (recomendado) 
- Git  

## Instalación 
```bash 
git clone https://github.com/Hildara67/sistema-riego-equipo.git
cd sistema-riego-equipo 
npm install 
```

## Ejecucion
# Modo web demo (sin servidor): 
npm run start:web 
# Modo escritorio (Electron): 
npm start

## Credenciales de prueba

Supervisor: admin / admin123 
Operador: operador1 / operador123 

## Estructura del Proyecto 
src/          Backend (core, data, dto, servidor) 
public/     Frontend (HTML, CSS, JS)
docs/       Documentación y script BD 
datos/      Datos de prueba 
scripts/    Utilerías 
Documentación de Proyecto/   Guías del equipo
