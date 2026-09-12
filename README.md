# CorpusChile

Buscador documental de normas y publicaciones oficiales de Chile.

## Estructura

```
/
├── index.html          → Portada (corpuschile.cl/)
├── Busqueda/
│   └── index.html      → Resultados de búsqueda (corpuschile.cl/Busqueda)
├── assets/             → Logos e imágenes
└── README.md
```

## URLs

| Página              | Ruta local / GitHub Pages                  | Dominio propio          |
|---------------------|--------------------------------------------|-------------------------|
| Portada             | `/` o `/CorpusChile/`                      | `corpuschile.cl/`       |
| Búsqueda / Resultados | `/Busqueda/` o `/CorpusChile/Busqueda/`  | `corpuschile.cl/Busqueda` |

## Cómo subir a GitHub

1. Sube **toda la carpeta** (index.html de la raíz + carpeta `Busqueda/`).
2. Activa GitHub Pages (branch `main`, carpeta `/ (root)`).
3. La búsqueda quedará en:
   - `https://dacercry.github.io/CorpusChile/Busqueda/`
   - o `https://corpuschile.cl/Busqueda` cuando configures el dominio.

## Uso local

```bash
npx serve .
# luego abre http://localhost:3000/Busqueda/
```
