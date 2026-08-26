# farahrd.com — sitio estático para Vercel

Rediseño del sitio de **Farah Restaurant** (antes en GoDaddy Website Builder), en HTML + CSS
puro, sin build ni dependencias. Se despliega tal cual en Vercel.

## Estructura

```
/
├── index.html                       → https://farahrd.com/
├── menu-san-isidro.html             → /menu-san-isidro
├── menu-plaza-duarte.html           → /menu-plaza-duarte
├── restaurante-santo-domingo.html   → /restaurante-santo-domingo
├── comida-tipica-dominicana.html    → /comida-tipica-dominicana
├── 404.html
├── vercel.json                      (cleanUrls, redirects, headers)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css                (toda la hoja de estilos)
    ├── js/main.js                   (menú móvil + navegación de secciones)
    └── img/                         (⚠️ pendiente: ver "Imágenes")
```

Las URLs se mantienen **idénticas** a las de GoDaddy, así que no se pierde el
posicionamiento en Google. `cleanUrls: true` en `vercel.json` hace que
`menu-san-isidro.html` se sirva como `/menu-san-isidro`.

## Cómo editar el contenido

Todo el texto está en los `.html`. No hay plantillas ni componentes: abres el
archivo, buscas el texto y lo cambias.

- **Teléfono / WhatsApp:** busca `18098567886` (aparece en `tel:`, `wa.me` y el pie).
- **Horario:** busca `8:30 am`.
- **Enlaces de reserva:** busca `reservaya.com.do`.
- **Colores y tipografías:** están en las variables `:root` al inicio de `assets/css/style.css`.
- **Cabecera y pie:** están repetidos en cada página (es HTML plano). Si cambias
  algo del menú de navegación, cámbialo en los 5 archivos.

### Añadir platos al menú

En `menu-san-isidro.html` / `menu-plaza-duarte.html`, dentro de cada
`<div class="menu-list">`, copia este bloque por cada plato:

```html
<article class="menu-item">
  <p class="menu-item__row">
    <span>Churrasco</span>
    <span class="dots"></span>
    <span class="menu-item__price">RD$ 850</span>
  </p>
  <p class="menu-item__desc">Corte a la parrilla con guarnición criolla.</p>
</article>
```

Para agrupar por categoría dentro de una sección, envuelve varios `.menu-item`
en un `<div class="menu-group"><h3>Entradas</h3><div class="menu-list">…</div></div>`.

Cuando una sección ya tenga sus platos, **borra el bloque `<div class="menu-empty">`**
correspondiente.

## Estado

- ✅ **Imágenes rescatadas del CDN de GoDaddy** y guardadas en `assets/img/`
  (optimizadas a WebP). El HTML ya apunta a rutas locales — el sitio ya no
  depende de GoDaddy para las imágenes.
- ✅ **Menús pasados a HTML** (texto real) en `menu-san-isidro.html` y
  `menu-plaza-duarte.html`. Ya no dependen de los PDFs de GoDaddy.

## ⚠️ Pendientes

### 1. Revisar precios de los menús

El contenido de los menús se extrajo automáticamente de los PDFs, así que
**algunos precios pueden traer errores de lectura**. Conviene repasarlos contra
la carta real. Todos los precios están en pesos dominicanos (RD$).
Para editar un plato, busca su nombre en el `.html` y cambia el número dentro de
`<span class="menu-item__price">`.

### 2. Imágenes finas (opcional)

Falta un `assets/img/favicon.png` y un `assets/img/og-farah.jpg` (1200×630, para
que se vea bien al compartir en WhatsApp/redes). El resto de las fotos ya están.

### 3. Dirección exacta de San Isidro

En `restaurante-santo-domingo.html` la dirección de San Isidro está genérica
("Zona de San Isidro, Santo Domingo Este"). Hay que poner la calle y número reales,
y ajustar también el bloque de datos estructurados en `index.html`.

## Despliegue en Vercel

1. Sube esta carpeta a un repositorio de GitHub (o arrástrala en vercel.com/new).
2. En Vercel: **New Project** → importar el repo.
   - Framework Preset: **Other**
   - Build Command: *(vacío)*
   - Output Directory: *(vacío / raíz)*
3. Deploy. Vercel te da una URL `*.vercel.app` para revisar antes de tocar el dominio.

## Cambio de DNS desde GoDaddy

Cuando la versión en `*.vercel.app` esté aprobada:

1. En Vercel → Project → **Settings → Domains** → añade `farahrd.com` y `www.farahrd.com`.
2. En GoDaddy → **Mis productos → DNS de farahrd.com**:
   - Registro **A** de `@` → `76.76.21.21`
   - Registro **CNAME** de `www` → `cname.vercel-dns.com`
   - Borra los registros A/CNAME viejos que apuntaban al Website Builder.
3. Espera la propagación (de minutos a unas horas) y confirma en Vercel que el
   dominio queda en *Valid Configuration*. El SSL lo emite Vercel automáticamente.
4. **No canceles el plan de GoDaddy hasta haber resuelto los pendientes 1 y 2**
   (imágenes y PDFs), porque están alojados ahí.
5. Después: en Google Search Console, envía `https://farahrd.com/sitemap.xml`.

## Notas técnicas

- Sin dependencias ni build. Tipografías desde Google Fonts.
- Datos estructurados `Restaurant` (schema.org) en `index.html` para los dos locales.
- Sin banner de cookies: el sitio ya no carga analítica ni cookies de terceros.
  Si añades Google Analytics o Meta Pixel, habrá que volver a poner el aviso.
- Botón flotante de WhatsApp en todas las páginas.
