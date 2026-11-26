# Estado del proyecto y tareas

El detalle y el avance de cada tarea están en los [issues del repositorio](https://github.com/Killercrod/Proyecto-Arquitectura-de-software/issues).

## Lo que ya tenemos

1. Frontend en React + TypeScript + Vite (`corvus-frontend/`) con rutas públicas (`/`) y de administración (`/admin/dashboard`, `products`, `events`, `users`).
2. Listado de productos en el panel de administración, con estados de carga, error y vacío.
3. Crear y editar productos con modal y formulario validado con zod.
4. Servicio CRUD del lado del cliente (`ProductService`): listar, obtener por id, crear, actualizar y eliminar, con axios, interceptores y cancelación de peticiones.
5. Manejo de errores en el cliente (`getErrorMessage`, `getAdminErrorMessage`, mensajes en la UI).
6. Funcionalidades candidatas a puntos extra:
   - Búsqueda y paginación en el catálogo.
   - Manejo de sesiones (login, token, rutas protegidas).
   - Ventanas flotantes (modales).
   - Módulos extra: eventos con calendario y usuarios administradores.

## Tareas pendientes

### Frontend — CeciliaCanul

| Issue | Tarea |
|---|---|
| #5 | Casilla de verificación por registro |
| #6 | Botón "Borrar seleccionados" arriba de la tabla |
| #7 | Conectar eliminar por fila |
| #8 | Revisar tipo de `Product` (`categoryName` vs `category`) |
| #9 | Limpiar código duplicado y muerto |

### Backend y documentación — Ozia112

| Issue | Tarea |
|---|---|
| #1 | API REST de productos |
| #3 | Endpoint para borrar registros seleccionados |
| #4 | Manejo de excepciones (2 pts de rúbrica) |
| #11 | Generar documentación a partir de los comentarios |
| #12 | README de ejecución del proyecto |

### Backend y documentación — Killercrod

| Issue | Tarea |
|---|---|
| #2 | Base de datos MySQL: esquema y datos de prueba |
| #13 | PDF §1: Descripción de funcionalidades |
| #14 | PDF §2: Descripción de componentes + diagrama UML |
| #15 | PDF §3: Descripción de clases + diagrama de clases |
| #16 | PDF §4: Diagramas de secuencia |
| #17 | PDF §5: Video de la app en YouTube |
| #18 | Entrega final: ZIP y presentación |

### Todos

| Issue | Tarea |
|---|---|
| #10 | Comentarios de documentación en el código (Javadoc/JSDoc) |

## Orden sugerido

1. #1 y #2 primero: sin API ni base de datos no hay app que mostrar.
2. #3 antes de terminar #6 (el botón necesita el endpoint).
3. #16 cuando la API esté definida.
