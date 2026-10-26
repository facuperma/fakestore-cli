# fakestore-cli

Herramienta de línea de comandos en Node.js para consultar, crear y eliminar productos de la [Fake Store API](https://fakestoreapi.com). Los resultados se muestran en tablas directamente en la terminal.

No usa dependencias externas: todo está hecho con `fetch` nativo de Node y `async/await`.

## Requisitos

Node.js 18 o superior, que trae `fetch` incluido.

## Instalación

```bash
git clone https://github.com/facuperma/fakestore-cli.git
cd fakestore-cli
```

## Uso

```bash
npm run start <MÉTODO> <recurso> [argumentos]
```

Listar todos los productos:

```bash
npm run start GET products
```

Ver un producto por id:

```bash
npm run start GET products/5
```

Crear un producto (título, precio y categoría):

```bash
npm run start POST products "Remera básica" 1500 clothing
```

Eliminar un producto:

```bash
npm run start DELETE products/5
```

## Validaciones

- Solo acepta los métodos `GET`, `POST` y `DELETE`
- El recurso tiene que empezar con `products`
- En `POST` son obligatorios los tres datos y el precio tiene que ser numérico
- Si la API responde con error (por ejemplo, un id que no existe), muestra el código y el detalle

Fake Store API es una API de prueba: los `POST` y `DELETE` devuelven una respuesta simulada, pero no modifican los datos reales.

---

Facundo Peralta Marello 
