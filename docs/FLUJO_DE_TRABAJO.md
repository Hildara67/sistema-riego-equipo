# Flujo de trabajo — GitHub Flow

## Justificación

Se eligió **GitHub Flow** como modelo de desarrollo por su simplicidad y adecuación al tamaño del equipo (4 integrantes). Este flujo permite:

- Integraciones frecuentes y rápidas
- Revisión de código mediante Pull Requests
- Mantener `main` siempre estable
- Baja complejidad administrativa

A diferencia de Git Flow, no se requieren ramas adicionales como `develop`, `release` o `hotfix`, lo cual reduce conflictos de merge y acelera el desarrollo.

## Estructura del repositorio

```
main ──► feature/backend-core       (Compañera 1)
     ├── feature/frontend-admin     (Compañera 3)
     ├── feature/frontend-operativo (Compañera 2)
     └── feature/reportes-assets    (Compañera 4)
```

## Ciclo de desarrollo

### 1. Crear una rama

Cada integrante crea una rama a partir de `main`:

```bash
git checkout main
git pull origin main
git checkout -b feature/nombre-rama
```

### 2. Desarrollar y hacer commits

```bash
git add archivo-modificado.js
git commit -m "feat: agregar funcionalidad X"
git push origin feature/nombre-rama
```

### 3. Abrir un Pull Request

En GitHub, crear un Pull Request desde la rama hacia `main`.

### 4. Revisar y mergear

Otro integrante revisa el código y, si todo está correcto, se mergea a `main`.

## Pull Requests realizados

| PR | Rama origen | Autor | Fecha |
|----|-------------|-------|-------|
| #1 | `feature/backend-core` | Hildara | 14/06/2026 |
| #2 | `feature/frontend-admin` | Nicol | 14/06/2026 |
| #3 | `feature/frontend-operativo` | María | 14/06/2026 |
| #4 | `feature/reportes-assets` | Danna | 14/06/2026 |

## Commits por integrante

```bash
$ git log --format="%an: %s" --all

Hildara: fix: coma sobrante en package.json que rompia JSON
Hildara: chore: eliminar scripts web demo y dependencia express
Hildara: docs: README sin referencias a web demo
Hildara: fix: corregir ruta CSV e imágenes para Electron
Hildara: feat: agregar backend core y base de datos
Danna: feat: agregar módulo de reportes y KPIs del sistema
Danna: feat: agregar datos de prueba para sensores
Danna: docs: agregar script de inicialización de base de datos
María: feat: agregar frontend operativo (dashboard, captura, etc.)
María: style: agregar hoja de estilos principal
María: feat: agregar control de inactividad de sesión
Nicol: feat: agregar módulo de gestión de parcelas
Nicol: feat: agregar módulo de configuración de umbrales
Nicol: feat: agregar módulo de auditoría de recomendaciones
Nicol: feat: agregar módulo de gestión de usuarios
Nicol: feat: agregar script de setup automático
```

## Resolución de conflictos

Los conflictos se resolvieron mediante comunicación directa entre los integrantes y usando `git mergetool` cuando fue necesario. No se presentaron conflictos mayores gracias a que cada integrante trabajó en módulos separados.

## Comandos útiles para el equipo

```bash
# Ver el historial gráfico
git log --oneline --graph --all

# Ver cambios entre ramas
git diff main..mi-rama

# Actualizar rama con main
git checkout mi-rama
git merge main

# Descargar cambios del repositorio remoto
git pull origin main
```
