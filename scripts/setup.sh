#!/bin/bash
set -e

echo "=== Configuración automática del Sistema de Riego ==="

# 1. Instalar Node.js vía nvm
if ! command -v nvm &>/dev/null; then
    echo "[1/5] Instalando nvm y Node.js 20..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    nvm install 20
    nvm use 20
else
    echo "[1/5] nvm ya instalado, activando Node.js 20..."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    nvm use 20 || nvm install 20
fi

# 2. Instalar MariaDB y librerías del sistema
echo "[2/5] Instalando MariaDB y librerías del sistema..."
sudo apt-get update -qq
sudo apt-get install -y -qq mariadb-server libnss3 libasound2

# 3. Iniciar MariaDB si no está corriendo
if ! systemctl is-active --quiet mariadb; then
    sudo systemctl start mariadb
fi

# 4. Configurar base de datos
echo "[3/5] Configurando base de datos..."
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY ''; CREATE DATABASE IF NOT EXISTS riego_db;"
sudo mysql riego_db < "$(dirname "$0")/../docs/init_db.sql" 2>/dev/null || echo "  → Tablas ya existen, omitiendo."

# 5. Crear archivo .env si no existe
echo "[4/5] Creando .env..."
cp -n "$(dirname "$0")/../.env.example" "$(dirname "$0")/../.env" 2>/dev/null || echo "  → .env ya existe."

# 6. Instalar dependencias del proyecto
echo "[5/5] Instalando dependencias npm..."
cd "$(dirname "$0")/.."
npm install

echo ""
echo "=============================================="
echo "✅ Configuración completa."
echo "   Cierra y abre una nueva terminal, luego:"
echo "   cd $(dirname "$0")/.."
echo "   npm start"
echo "=============================================="
