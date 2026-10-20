# Vulture Fitness & Box — rediseño web (demo)

Propuesta de rediseño **no oficial** para enseñar al gimnasio. Sitio estático: HTML, CSS y JavaScript sin dependencias ni paso de compilación.

## Ejecutar

```bash
node serve.mjs
```

Abre http://localhost:5173/ (otro puerto: `node serve.mjs 8080`). También funciona abriendo `index.html` directamente, porque los datos se cargan con un `<script>` y no con `fetch`.

- `index.html`: la web.

## Estructura

| Ruta | Para qué |
|---|---|
| `data/data.js` | Tarifas, horarios, programas y enlaces. Aquí se edita el contenido. |
| `css/styles.css` | Estilos y paleta (variables en `:root`). |
| `js/main.js` | Tarifas con selector de periodo, horario con filtros, formulario de demo, menú. |
| `assets/img/` | Fotos y logo descargados de la web actual (12 MB, provisional; sustituir por originales). |
| `serve.mjs` | Servidor local mínimo. |

## Identidad aplicada

Fondo negro. Villains en magenta/púrpura (`--v`, `--v-2`), Heroes en azul/cian (`--h`, `--h-2`), HYROX en dorado. Los colores salen de los carteles de tarifas y horarios; la web actual solo usa grises de plantilla.

## Pendiente antes de publicar

Ver el informe de la primera entrega. Resumen: sustituir fotos y logo por originales, validar tarifas y horarios con el gimnasio, textos legales propios, conectar el formulario real y decidir hosting y dominio. La web lleva `noindex` a propósito.
