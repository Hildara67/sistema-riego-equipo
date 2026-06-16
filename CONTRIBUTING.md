# Guía para contribuir

## Requisitos previos

- Tener el repositorio clonado y funcional (ver README.md)
- Node.js 18+ y MariaDB 10+ instalados

## Flujo de trabajo

Este proyecto usa **GitHub Flow**:

1. Crear una rama desde `main`
2. Hacer cambios en la rama
3. Abrir un Pull Request
4. Revisar y validar el código
5. Integrar los cambios a `main`

## Convenciones para ramas

Usar nombres descriptivos con prefijos:

- `feature/nombre-feature` — Nueva funcionalidad
- `fix/nombre-arreglo` — Corrección de errores
- `docs/nombre-cambio` — Cambios en documentación

Ejemplos:
- `feature/modulo-usuarios`
- `fix/error-login`
- `docs/actualizar-readme`

## Convenciones para commits

Cada commit debe tener un mensaje claro. Formato recomendado:

```
tipo: descripción breve en español

Ejemplos:
feat: agregar cálculo de evapotranspiración FAO-56
fix: corregir validación de humedad en captura
docs: actualizar sección de instalación en README
style: ajustar estilo del botón de guardar
refactor: simplificar lectura de CSV
chore: actualizar dependencias
```

## Cómo abrir un Pull Request

1. Subir la rama a GitHub: `git push origin mi-rama`
2. Ir a https://github.com/Hildara67/sistema-riego-equipo
3. Hacer clic en "Compare & pull request"
4. Escribir un título descriptivo
5. En la descripción incluir:
   - Qué cambios se hicieron
   - Por qué son necesarios
   - Captura de pantalla (si aplica)
6. Solicitar revisión a otro integrante

## Cómo reportar un problema

Abrir un Issue en GitHub con:
- Título descriptivo
- Pasos para reproducir el error
- Comportamiento esperado vs actual
- Captura de pantalla (si aplica)
- Versión del sistema operativo y Node.js

## Estructura del proyecto

```
sistema-riego-equipo/
├── src/           # Código fuente (Electron backend)
├── public/        # Frontend (HTML, CSS, JS)
├── docs/          # Documentación
├── tests/         # Pruebas
├── datos/         # Datos de prueba
├── scripts/       # Scripts auxiliares
└── package.json   # Dependencias y configuración
```

## Notas importantes

- No modificar `package-lock.json` manualmente
- No incluir archivos generados (node_modules/, dist/)
- Probar los cambios antes de abrir un PR
- Mantener los mensajes de commit en español
