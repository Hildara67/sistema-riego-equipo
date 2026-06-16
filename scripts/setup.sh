#!/bin/bash
set -e

echo "=== Configuración automática del Sistema de Riego ==="

# Detectar entorno
ES_WSL=false
if grep -qi microsoft /proc/version 2>/dev/null; then
    ES_WSL=true
    echo "  → Entorno detectado: WSL (Windows Subsystem for Linux)"
else
    echo "  → Entorno detectado: Linux nativo"
fi

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

# Intentar instalar libasound2; si falla probar libasound2t64 (Ubuntu 24.04+)
if sudo apt-get install -y -qq mariadb-server libnss3 libasound2 2>/dev/null; then
    echo "  → Paquetes instalados correctamente"
else
    echo "  → libasound2 no disponible, probando libasound2t64..."
    sudo apt-get install -y -qq mariadb-server libnss3 libasound2t64
fi

# 3. Iniciar MariaDB
echo "[3/5] Iniciando MariaDB..."
if $ES_WSL; then
    # WSL no tiene systemd, se usa service
    sudo service mariadb start
else
    # Linux nativo con systemd
    if command -v systemctl &>/dev/null; then
        if ! systemctl is-active --quiet mariadb; then
            sudo systemctl start mariadb
        fi
    else
        sudo service mariadb start 2>/dev/null || true
    fi
fi
sleep 2

# 4. Configurar base de datos
echo "[4/5] Configurando base de datos..."
if ! mysql -u root -e "SELECT 1" &>/dev/null; then
    # Si no hay acceso, configurar root sin contraseña
    sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED BY ''; FLUSH PRIVILEGES;" 2>/dev/null || true
fi
sudo mysql -e "CREATE DATABASE IF NOT EXISTS riego_db;"
# Si ya existe la BD, la segunda carga puede fallar; se omite el error
sudo mysql riego_db < "$(dirname "$0")/../docs/init_db.sql" 2>/dev/null || echo "  → Tablas ya existen, omitiendo."
echo "  → Base de datos lista"

# 5. Crear archivo .env si no existe
echo "[5/5] Creando .env..."
cp -n "$(dirname "$0")/../.env.example" "$(dirname "$0")/../.env" 2>/dev/null || echo "  → .env ya existe."

# 6. Instalar dependencias del proyecto
echo "[6/6] Instalando dependencias npm..."
cd "$(dirname "$0")/.."
npm install

echo ""
echo "=============================================="
echo "✅ Configuración completa."
echo "   Para ejecutar el sistema:"
echo "   cd $(dirname "$0")/.."
echo "   npm start"
echo ""
echo "⚠️  NOTA: Si npm start muestra errores de GPU (viz_main_impl.cc,"
echo "   command_buffer_proxy_impl.cc), son normales en WSL sin aceleración"
echo "   gráfica y NO afectan el funcionamiento del sistema."
echo "=============================================="
