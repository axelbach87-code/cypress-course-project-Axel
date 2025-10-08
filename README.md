# Proyecto Final - Automatización con Cypress + Cucumber

Este es el repositorio para el Trabajo Integrador Final del curso de QA Automation. El proyecto implementa un framework de automatización de pruebas para una aplicación web y una API, utilizando Cypress y Cucumber.

## Requisitos Previos

Para poder levantar y correr este proyecto, necesitas tener instalado:

- Node.js (v18 o superior)
- npm (se instala junto con Node.js)
- Git

## Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd cypress-course
    ```

2.  **Instalar dependencias:**
    Una vez dentro del directorio, ejecuta el siguiente comando para instalar todo lo necesario.
    ```bash
    npm install
    ```

## Ejecución de Pruebas

El proyecto incluye varios scripts en el `package.json` para ejecutar las pruebas de forma flexible.

### Ejecución en modo Headless (consola)

Estos comandos corren las pruebas en segundo plano, sin abrir la interfaz del navegador. Son ideales para integración continua.

- **Correr todas las pruebas (UI y API):**
  ```bash
  npm run test:all
  ```

- **Correr por entorno (DEV o TST):**
  ```bash
  npm run test:dev
  npm run test:tst
  ```

- **Correr por tipo de prueba:**
  ```bash
  npm run test:ui
  npm run test:api
  ```

### Ejecución Interactiva (con UI de Cypress)

Estos comandos abren el Test Runner de Cypress, lo que te permite ver la ejecución en tiempo real y depurar más fácilmente.

- **Abrir en Chrome:** `npm run open:chrome`
- **Abrir en Firefox:** `npm run open:firefox`

## Reportes

Después de ejecutar las pruebas en modo headless, se puede generar un reporte HTML con los resultados.

```bash
npm run report:generate
```

El reporte se creará en la carpeta `cypress/reports/cucumber_report.html` y se abrirá automáticamente en tu navegador.
