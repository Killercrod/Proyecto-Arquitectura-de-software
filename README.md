# Aplicación CRUD con Marcos de Trabajo

## Objetivo

Desarrollar una aplicación CRUD (Create, Read, Update, Delete) utilizando el framework presentado en la actividad "Marcos de trabajo".

Al iniciar, la aplicación debe mostrar el listado de registros de una tabla de una base de datos MySQL. La tabla debe tener al menos 3 campos:

- 1 identificador único.
- 1 campo de texto.
- 1 campo numérico.

Cada registro listado tendrá una casilla de verificación para indicar que es el registro seleccionado. Por cada registro, el usuario podrá editar sus valores o eliminarlo. En la parte superior de la tabla deben aparecer botones para crear un registro o borrar los registros seleccionados.

---

## Entregables

### Documento PDF

Realizar la documentación de cada uno de los componentes realizados. El documento deberá contener los siguientes elementos:

#### 1. Descripción de funcionalidades

- **Objetivo principal:** describir el objetivo del módulo.
- **Funcionalidades:** listar las funcionalidades que tiene el módulo realizado.

#### 2. Descripción de componentes

Se hará un listado de los componentes, detallando cada uno según las interfaces que requiera y provea. Formato:

- **Nombre:**
- **Descripción:**
- **Dependencias con otros componentes:** listar los servicios que ocupa de otros componentes.
- **Interfaces de salida:** enumerarlas y agregar el nombre y la descripción de cada una.
- **Interfaces de entrada:** enumerarlas y agregar el nombre y la descripción de cada una.
- **Artefactos:** archivos que deben utilizarse, así como bibliotecas (por ejemplo, archivo de configuración, biblioteca de MySQL).
- **Diagrama:** diagrama de componentes UML.

#### 3. Descripción de clases

Se hará un listado de las clases, detallando funciones y atributos. Formato:

- **Nombre de la clase:**
- **Descripción:**
- **Dependencias con otras clases:** listar las asociaciones, con nombre y descripción (¿para qué existe la asociación?).
- **Atributos:** enumerarlos y agregar nombre, tipo, visibilidad, valor por omisión y descripción.
- **Funciones:** enumerarlas y agregar:
  - Nombre.
  - Listado de argumentos con su tipo.
  - Valor de retorno.
  - Visibilidad.
  - Si es pública, el servicio que implementa (componente e interfaz de salida).
  - Descripción.
- **Diagrama de clases:** agregar el diagrama.

#### 4. Descripción de las secuencias

Describir los diagramas de secuencia realizados. Por cada diagrama se requiere:

- Nombre.
- Descripción.
- Diagrama UML.

#### 5. Descripción de casos de uso

- Enlace a un video de YouTube que muestre la ejecución de la aplicación.

### Código fuente

- Incluir el código fuente con comentarios en Javadoc.
- Incluir la documentación generada a partir de los comentarios.

---

## Forma de evaluación

La evaluación se compone de una **lista de cotejo** (15 puntos) y una **rúbrica** (5 puntos).

### Lista de cotejo (15 pts)

| Criterio | Puntos |
|---|---|
| Descripción de las funcionalidades incluida en el entregable | 4 |
| Descripción de los componentes con los elementos solicitados | 4 |
| Secuencias de los servicios que se proveen y su descripción | 4 |
| Ejemplo de uso | 3 |

### Rúbrica (5 pts)

| Criterio | Puntos |
|---|---|
| Cubrir las funcionalidades pactadas | 3 |
| Manejo de al menos una excepción en el componente | 2 |

**Puntos adicionales:** hasta 4 puntos extra agregando nuevas funcionalidades (2 pts c/u), por ejemplo: paginación, búsqueda, manejo de sesiones, ventanas flotantes, uso de componentes extra, etc.

---

## Requisitos adicionales

- Presentar la aplicación funcionando en una sesión destinada para tal fin.
- Entrega **grupal**.
- Formato del archivo: `Apellido1Apellido2Apellido3Apellido4.ZIP`
