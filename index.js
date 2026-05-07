
const url = 'https://fakestoreapi.com';


const comando = process.argv[2]; 
const recurso = process.argv[3]; 

const comandoValido = [ 'GET' , 'POST' , 'DELETE' ].includes(comando);

if(!comandoValido) {
    console.log("Comando no reconocido. Usa: GET, POST o DELETE\n\n");
    process.exit(1);
}else if(!recurso.startsWith('products')) {
        console.log("Usa: products");
        process.exit(1);
    }else {
switch(comando){

    case 'GET':
  
    if (comando === 'GET' && recurso) {
    const arg = recurso.split('/');
    if (arg[0] === 'products') {
        if (arg[1]) {

            obtenerProductos(arg[1]);
        } else {
  
            obtenerProductos();
        }
    break;
    } 
}

    case 'POST':
        const title = process.argv[4];
        const price = process.argv[5];
        const category = process.argv[6];

        if (!title || !price || !category) {
            console.log('Faltan datos para crear el producto.\n\n Usa: npm run start POST products <title> <price> <category>\n\n');
            process.exit(1);
        }

        if (isNaN(Number(price))) {
            console.log('El precio debe ser un número válido.\n\n');
            process.exit(1);
        }

        crearProducto(title, Number(price), category);
        break;

    case 'DELETE':
        const argDelete = recurso.split('/');
        if (argDelete[0] === 'products' && argDelete[1]) {
            eliminarProducto(argDelete[1]);
        } else {
            console.log('Usa: npm run start DELETE products/<id>\n\n');
            process.exit(1);
        }
        break;

    default:
        console.log("Comando no implementado.");
        break;
}}




async function obtenerProductos(id = null) {
    console.log(id ? "Obteniendo producto...\n" : "Obteniendo productos...\n");
    try {
        
        const endpoint = id ? `${url}/products/${id}` : `${url}/products`;
        const response = await fetch(endpoint, { method: 'GET' });
        
        if (response.ok) {
            const productos = await response.json();
            
            if (id) {

                const { id: productId, title, price, category } = productos;
                console.table([{ id: productId, title, price, category }]);
                console.log("Descripcion:\n\n", productos.description + "\n");

            } else {

                const productosFormateados = productos.map(({ id, title, price, category }) => ({
                    id,
                    title,
                    price,
                    category
                }));
                console.table(productosFormateados);
            }
        } else if (response.status === 400 || response.status === 404) {
            console.log("Producto no encontrado. Verifica el ID proporcionado.\nCódigo de error:", response.status);
        } 

    } catch (error) {
    
             console.log("Error al obtener productos\n Verifique su solicitud \n\n Error:\n\n", error);
    
        } finally {
        console.log("Proceso finalizado");
    }
}


async function crearProducto(title, price, category) {
    console.log('Creando producto...\n');
    try {
        const response = await fetch(`${url}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, price, category })
        });

        if (response.ok) {
            
            const producto = await response.json();
            console.log('Producto creado correctamente:');
            console.table([{ id: producto.id, title: producto.title, price: producto.price, category: producto.category }]);

        } else {
            console.log('Error al crear producto. Código de error:', response.status);
            const errorData = await response.text();
            if (errorData) {
                console.log('Detalle del error:\n\n', errorData);
            }
        }
    } catch (error) {
        console.log('Error al crear producto\nVerifique su solicitud\n\nError:\n\n', error);
    } finally {
        console.log('Proceso finalizado');
    }
}

async function eliminarProducto(id) {
    console.log('Eliminando producto...\n');
    try {
        const response = await fetch(`${url}/products/${id}`, { method: 'DELETE' });
        const productoEliminado = await response.json();

        if (response.ok) {
            console.log('Producto eliminado correctamente:\n');
            console.table({ id: productoEliminado.id, title: productoEliminado.title, price: productoEliminado.price, category: productoEliminado.category });
        } else {
            console.log('Error al eliminar producto. Código de error:', response.status);
        }
    } catch (error) {
        console.log('Error al eliminar producto\nVerifique su solicitud\n\nError:\n\n', error);
    } finally {
        console.log('Proceso finalizado');
    }
}
