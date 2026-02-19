Aquí tienes un informe detallado y estructurado en formato Markdown, listo para ser utilizado como `README.md` en tu repositorio de GitHub. 

***

# 📅 iOS Calendar for Windows

Una aplicación de escritorio moderna que trae la experiencia estética y funcional del calendario de iOS a Windows. Construida con tecnologías web de vanguardia, esta agenda ofrece un sistema completo para gestionar **eventos, tareas y notas**, con soporte nativo para **sincronización bidireccional con iCloud**.

## ✨ Características Principales

* **Vistas de Calendario Completas:** Navega fluidamente entre vistas de Día, Semana, Mes y Año.
* **Gestión Integrada de Tareas:** Crea tareas y subtareas con seguimiento de progreso, y márcalas como completadas con un solo clic.
* **Bloc de Notas Estilo Post-it:** Crea notas con códigos de colores, fíjalas (pin) en la parte superior y realiza búsquedas en su contenido.
* **Sincronización con iCloud (CalDAV):** Conecta tu Apple ID usando una Contraseña de Aplicación para sincronizar eventos bidireccionalmente. Soporta la inyección de colores personalizados mediante etiquetas `<COLOR:#HEX>` en la descripción de iCloud.
* **Buscador Global (Omnibar):** Presiona **`Ctrl + K`** (o `Cmd + K`) para abrir la búsqueda global y encontrar al instante eventos, tareas o notas.
* **Navegación por Gestos:** Soporte para cambio de páginas mediante scroll, gestos de touchpad o deslizamiento táctil (swipe).
* **Notificaciones de Escritorio:** Alertas nativas del sistema que te avisan antes de que comience un evento, según los recordatorios configurados.
* **UI/UX Nativa de Apple:** Diseño meticuloso usando Tailwind CSS que emula la interfaz de iOS/macOS, incluyendo la clásica barra de título personalizada con controles estilo Mac (botones rojo, amarillo y verde).

## 🛠️ Stack Tecnológico

El proyecto está desarrollado con las siguientes herramientas principales:

* **Frontend:** React 18, Vite y Tailwind CSS.
* **Entorno de Escritorio:** Electron (utilizando `vite-plugin-electron` para una integración fluida con Vite).
* **Base de Datos Local:** IndexedDB a través de **Dexie.js**, gestionando las tablas de `events`, `tasks` y `notes` de forma reactiva con `dexie-react-hooks`.
* **Sincronización iCloud:** Peticiones HTTP a través de un proxy IPC (`icloudRequest`) en Electron para evadir el CORS, parseo de XML con `fast-xml-parser` y manejo del formato iCal con `ical.js`.
* **Utilidades:** `date-fns` para la manipulación de fechas, y `lucide-react` para la iconografía.

## 📂 Estructura del Proyecto

El código fuente está organizado de la siguiente manera:

```text
├── electron/                  # Código del proceso principal de Electron
│   ├── main.ts                # Inicialización de ventana y proxy CORS (CalDAV)
│   ├── preload.ts             # Puente IPC expuesto al renderer
│   └── electron-env.d.ts      # Tipos globales
├── src/
│   ├── assets/                # Imágenes y recursos estáticos
│   ├── components/            # Componentes UI de React (Vistas, Modales, Layout)
│   ├── db/
│   │   └── database.js        # Configuración del esquema de IndexedDB (Dexie)
│   ├── services/
│   │   └── iCloudService.js   # Lógica cliente para el protocolo CalDAV de Apple
│   ├── App.jsx                # Componente principal y lógica de estados globales/notificaciones
│   ├── main.jsx               # Punto de entrada de React
│   └── index.css              # Configuración base de Tailwind y animaciones personalizadas
├── electron-builder.json5     # Configuración para compilar los ejecutables de escritorio
├── tailwind.config.cjs        # Configuración de colores del tema (ios-blue, ios-surface, etc.)
└── vite.config.ts             # Configuración de empaquetado y plugins de Vite
```

## 🚀 Instalación y Desarrollo

Para ejecutar este proyecto en tu entorno local, asegúrate de tener [Node.js](https://nodejs.org/) instalado.

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/bytrigi/ios-agenda-calendar-for-windows.git
   cd bytrigi-ios-agenda-calendar-for-windows
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el entorno de desarrollo:**
   Esto arrancará el servidor de Vite y abrirá la ventana de Electron en modo desarrollo con Hot-Module Replacement (HMR).
   ```bash
   npm run dev
   ```

4. **Construye el ejecutable (Producción):**
   Generará los instaladores para el sistema operativo en la carpeta `release/`.
   ```bash
   npm run build
   ```

## ☁️ Guía de Configuración de iCloud

Para habilitar la sincronización con el calendario de Apple:

1. Ve a los **Ajustes** dentro de la aplicación.
2. Ingresa el correo electrónico asociado a tu **Apple ID**.
3. **Importante:** No uses tu contraseña habitual. Debes ir a [appleid.apple.com](https://appleid.apple.com) y generar una **Contraseña de Aplicación**.
4. Introduce la contraseña de aplicación, selecciona los calendarios que deseas importar y pulsa en "Guardar y Sincronizar". 
5. La aplicación protegerá tus credenciales localmente e implementará comprobaciones automáticas con control de inercia y retrasos (debounce lag-protection) para sincronizar en segundo plano o al volver el foco a la ventana.
