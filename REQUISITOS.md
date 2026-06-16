# REQUISITOS — Sistema de Riego STYRAX

## Software necesario

| Software | Versión mínima | Descarga |
|----------|---------------|----------|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Viene con Node.js |
| MariaDB | 10+ | https://mariadb.org |
| Git | 2.30+ | https://git-scm.com |

## Sistema operativo

El proyecto fue desarrollado y probado en los siguientes entornos:

- **Windows 10/11 con WSL2 (recomendado)** — Ubuntu 22.04 dentro de WSL
- **Linux nativo** — Ubuntu 22.04+, Debian 11+, Fedora 38+
- **Windows nativo** — Node.js y MariaDB instalados directamente en Windows
- **macOS** — Solo desarrollo, no probado en producción

## Dependencias del sistema (WSL/Linux)

```bash
sudo apt install -y mariadb-server fonts-noto-color-emoji
```

## Dependencias de Node.js

Se instalan automáticamente con `npm install`:

| Paquete | Propósito |
|---------|-----------|
| electron | Entorno de escritorio |
| mysql2 | Conexión a MariaDB |
| axios | Consultas API NASA POWER |
| csv-parser | Lectura de archivos CSV |
| dotenv | Variables de entorno |

### Versiones actuales (package.json)

Ver `package.json` para las versiones exactas.

## Verificar instalación

```bash
node --version    # Debe mostrar v18 o superior
npm --version     # Debe mostrar 9 o superior
mysql --version   # Debe mostrar 10 o superior
git --version     # Debe mostrar 2.30 o superior
```

## Espacio en disco

- Proyecto sin dependencias: ~5 MB
- Con node_modules: ~250 MB
- MariaDB + datos: ~200 MB adicionales
