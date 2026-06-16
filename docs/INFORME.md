# INFORME DEL PROYECTO — STYRAX
## Sistema Inteligente de Control de Riego Agrícola

---

### 1. Descripción del proyecto

STYRAX es una aplicación de escritorio desarrollada con Electron y MariaDB que automatiza la gestión de riego agrícola utilizando el método FAO-56 para calcular la evapotranspiración de referencia (ETo). El sistema permite capturar lecturas de sensores, generar recomendaciones de riego, administrar parcelas y cultivos, y controlar el acceso mediante roles de usuario (OPERADOR y SUPERVISOR).

### 2. Herramientas y tecnologías utilizadas

Node.js 20+ se utilizó como entorno de ejecución principal y Electron 28+ como framework para generar la aplicación de escritorio, permitiendo que el sistema funcione de forma nativa en Windows, Linux y macOS sin necesidad de un navegador web. MariaDB 10+ se eligió como motor de base de datos relacional para almacenar la información de usuarios, parcelas, lecturas, recomendaciones y configuraciones del sistema, con la librería mysql2 como puente de conexión desde Node.js. Para la obtención de datos climáticos se utilizó Axios como cliente HTTP para consumir la API de NASA POWER, que proporciona datos históricos de temperatura, precipitación y radiación solar. La importación de datos desde archivos CSV se realizó mediante la librería csv-parser, y la configuración del entorno se manejó con dotenv para separar credenciales y ajustes del código fuente. El control de versiones se gestionó con Git a través de la plataforma GitHub, utilizando WSL2 como entorno de desarrollo en sistemas Windows y Visual Studio Code como editor de código principal.

### 3. Flujo de trabajo

Se utilizó GitHub Flow como modelo de desarrollo. Este flujo consiste en crear una rama feature a partir de main, desarrollar la funcionalidad en ella, abrir un Pull Request para revisar el código y finalmente integrar los cambios a main mediante merge. Se eligió este modelo por su simplicidad y adecuación al tamaño del equipo de cuatro integrantes, permitiendo integraciones frecuentes, revisión de código mediante Pull Requests y manteniendo la rama principal siempre estable.

Las ramas creadas durante el proyecto fueron cuatro. La rama feature/backend-core, desarrollada por la compañera 1 (Hildara), contiene el módulo backend completo con la lógica de negocio, los DAOs de acceso a base de datos y la implementación del método FAO-56. La rama feature/frontend-admin, desarrollada por la compañera 3 (Nicol), contiene los módulos de administración incluyendo gestión de parcelas, usuarios, catálogo de cultivos, configuración de umbrales y auditoría. La rama feature/frontend-operativo, desarrollada por la compañera 2 (María), contiene los módulos operativos como el dashboard principal, la captura de lecturas, el historial y la visualización de recomendaciones. La rama feature/reportes-assets, desarrollada por la compañera 4 (Danna), contiene los módulos de reportes y KPIs, los logos y recursos gráficos, los datos de prueba y el script de instalación automatizada.

### 4. Integrantes y contribuciones

El equipo estuvo conformado por cuatro integrantes. Hildara se encargó del desarrollo del backend completo incluyendo la implementación del método FAO-56, los objetos de acceso a datos (DAOs), la conexión a MariaDB, los manejadores de comunicación IPC y la integración general del sistema en Electron. Nicol desarrolló el frontend de administración que abarca las pantallas de gestión de parcelas, usuarios, configuración de umbrales y el módulo de auditoría de cambios. María desarrolló el frontend operativo que incluye el dashboard con indicadores y semáforo de estado, la captura de lecturas de sensores, el historial de lecturas con filtros y la visualización de recomendaciones generadas. Danna desarrolló el módulo de reportes y KPIs, creó los logos y la imagen corporativa del proyecto, generó los datos de prueba para sensores, implementó el script de instalación automatizada y documentó la inicialización de la base de datos.

### 5. Arquitectura del sistema

El backend corre dentro de Electron como proceso principal ejecutándose en Node.js. Cuando el usuario interactúa con la interfaz gráfica, el frontend se comunica con el backend mediante IPC (Inter-Process Communication) de Electron. El backend recibe las solicitudes, las procesa a través de los módulos de lógica de negocio como el motor FAO-56 y el gestor de decisiones, y accede a MariaDB mediante los DAOs correspondientes. Los datos climáticos se obtienen de la API de NASA POWER y los datos de sensores se importan desde un archivo CSV.

### 6. Resultados obtenidos

Se obtuvo una aplicación de escritorio funcional con interfaz gráfica que se conecta a MariaDB para el almacenamiento persistente de datos. El sistema calcula la evapotranspiración utilizando datos climáticos provenientes de NASA POWER y genera recomendaciones de riego automáticas cada sesenta segundos. Adicionalmente, importa lecturas desde un archivo CSV cada treinta segundos de forma automática. El sistema cuenta con roles de usuario (OPERADOR y SUPERVISOR) y un panel de control con semáforo de estado que muestra el nivel de humedad de cada parcela.

### 7. Enlaces

Repositorio oficial: https://github.com/Hildara67/sistema-riego-equipo

Documentación completa disponible en la carpeta docs/ del repositorio.

---

*Documento generado como parte del proyecto final de Tecnologías Computacionales.*
