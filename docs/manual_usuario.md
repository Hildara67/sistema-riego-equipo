# Manual de Usuario — STYRAX

## Sistema Inteligente de Control de Riego

---

### 1. Inicio de sesión

Al ejecutar el sistema con npm start aparece una pantalla de presentación con el logo del proyecto durante aproximadamente dos segundos, seguida del formulario de inicio de sesión. El usuario debe ingresar su nombre de usuario y contraseña en los campos correspondientes. La contraseña debe tener al menos ocho caracteres. Existe un botón con forma de ojo que permite mostrar u ocultar la contraseña mientras se escribe. Una vez ingresadas las credenciales, el botón de Ingresar se habilita y al hacer clic el sistema verifica los datos contra la base de datos. Si las credenciales son correctas, el sistema redirige al usuario según su rol. Si son incorrectas, se muestra un mensaje de error en color rojo.

### 2. Rol OPERADOR

El rol OPERADOR tiene acceso a las pantallas de dashboard, captura de lecturas, historial y recomendaciones. No puede gestionar parcelas, usuarios ni configuraciones del sistema.

#### 2.1 Dashboard

El dashboard es la pantalla principal del OPERADOR. En la parte superior se muestran cuatro tarjetas con indicadores: el total de parcelas registradas, la cantidad de lecturas en estado óptimo, las alertas activas y los déficits detectados. Debajo de los indicadores aparece una tabla con el estado actual de cada parcela, mostrando la humedad del suelo, la temperatura ambiente, la humedad relativa, la evapotranspiración del día, el estado del semáforo y la acción recomendada. El estado del semáforo puede ser óptimo en verde, alerta en amarillo, déficit en rojo o exceso en azul. Cuando una parcela supera el umbral máximo, aparece una alerta visible recomendando detener el riego. Los datos se actualizan automáticamente cada doce segundos.

#### 2.2 Captura de lecturas

En esta pantalla el OPERADOR puede registrar manualmente una lectura de sensores para una parcela específica. Debe seleccionar la parcela de una lista desplegable, ingresar el porcentaje de humedad del suelo (entre 0 y 100), la temperatura ambiente en grados Celsius (entre -10 y 50) y opcionalmente la humedad relativa. Al hacer clic en Guardar, el sistema valida los datos y los almacena en la base de datos. Si los datos son inválidos, se muestra un mensaje de error indicando el problema.

#### 2.3 Historial de lecturas

Esta pantalla permite consultar las lecturas registradas en un período de tiempo. El usuario puede seleccionar una parcela específica o elegir la opción Todas para ver todas las parcelas. También puede definir una fecha de inicio y una fecha de fin para filtrar los resultados. Los datos se muestran en una tabla con las columnas de parcela, humedad, temperatura, humedad relativa, origen de la lectura, fecha de registro y validez.

#### 2.4 Recomendaciones

En esta pantalla se muestran las recomendaciones de riego generadas por el sistema. Cada recomendación incluye la parcela, el volumen de agua sugerido en litros, la acción recomendada que puede ser aplicar riego o detener riego, la urgencia que puede ser crítico, alto, medio o bajo, el estado de la recomendación, la fecha de generación y botones para enviar a validación. El OPERADOR puede enviar una recomendación a validación para que el SUPERVISOR la revise y la apruebe o rechace.

### 3. Rol SUPERVISOR

El rol SUPERVISOR tiene acceso a todas las pantallas del sistema incluyendo la gestión de parcelas, configuración de umbrales, auditoría, usuarios y reportes.

#### 3.1 Parcelas

Esta pantalla permite gestionar las parcelas registradas en el sistema. Se muestra una tabla con el nombre de la parcela, el tipo de cultivo, el área en metros cuadrados, la ubicación y la fecha de registro. El SUPERVISOR puede crear una nueva parcela haciendo clic en el botón Nueva Parcela, lo que abre un formulario para ingresar el nombre, el cultivo, el área y la ubicación. También puede editar una parcela existente o eliminarla mediante los botones correspondientes en cada fila de la tabla.

#### 3.2 Configuración

En esta pantalla el SUPERVISOR puede configurar los umbrales de riego para cada parcela. Para cada parcela se puede definir el umbral mínimo de humedad, el umbral máximo de humedad y el coeficiente del cultivo (Kc) que se utiliza en el cálculo de evapotranspiración. El Kc debe estar entre 0.1 y 2.0. También se muestran indicadores de conexión a la base de datos y a la API de NASA POWER, permitiendo verificar que ambos servicios están funcionando correctamente.

#### 3.3 Auditoría

Esta pantalla muestra el registro de cambios realizados en las recomendaciones de riego. Se listan las recomendaciones con su parcela, la acción tomada, la urgencia, el usuario que realizó la acción y la fecha del cambio. Esto permite al SUPERVISOR dar seguimiento a todas las decisiones de riego tomadas en el sistema.

#### 3.4 Usuarios

El SUPERVISOR puede gestionar los usuarios del sistema desde esta pantalla. Se muestra una tabla con todos los usuarios registrados, incluyendo su nombre, rol y estado. Se puede crear un nuevo usuario ingresando un nombre de usuario, seleccionando el rol (OPERADOR o SUPERVISOR) y asignando una contraseña de al menos ocho caracteres. También se puede desactivar un usuario existente, lo que le impide iniciar sesión sin eliminarlo del sistema.

#### 3.5 Reportes

Esta pantalla muestra indicadores y estadísticas generales del sistema. Incluye datos como el total de parcelas, el promedio de humedad del suelo, la temperatura promedio, las lecturas del día actual, las recomendaciones pendientes y el total de recomendaciones generadas. También se muestran las parcelas con mayor necesidad de riego.

### 4. Barra de navegación

Todas las pantallas del sistema cuentan con una barra de navegación lateral que permite acceder a las secciones disponibles según el rol del usuario. En la parte superior de la barra se muestra el nombre y el rol del usuario que inició sesión. En la parte inferior se encuentra el botón de Cerrar Sesión que elimina los datos de la sesión y redirige a la pantalla de inicio de sesión.

### 5. Cierre de sesión

Para cerrar la sesión, el usuario debe hacer clic en el botón Cerrar Sesión ubicado en la parte inferior de la barra de navegación lateral. El sistema limpia los datos de la sesión y redirige a la pantalla de inicio de sesión, donde se puede ingresar con otro usuario si es necesario.

### 6. Solución de problemas comunes

Si al ejecutar npm start aparece un error de conexión a la base de datos, verificar que MariaDB esté corriendo con el comando sudo service mariadb start en WSL o sudo systemctl start mariadb en Linux nativo.

Si la aplicación se abre pero no carga correctamente o muestra un mensaje de API no disponible, verificar que se ejecutó npm install correctamente y que no hay errores en la terminal donde se lanzó el sistema.

Si los emojis no se ven correctamente en la interfaz, instalar las fuentes con sudo apt install fonts-noto-color-emoji y cerrar y volver a abrir la aplicación.

Los mensajes de error relacionados con GPU en la terminal como viz_main_impl.cc o command_buffer_proxy_impl.cc son normales en entornos WSL sin aceleración gráfica y no afectan el funcionamiento del sistema.
