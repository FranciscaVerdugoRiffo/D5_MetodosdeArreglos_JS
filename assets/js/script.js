//id tareas

let tareas = [
    { id: 1, descripcion: "Estudiar DesafíoLatam", completado: false },
    { id: 2, descripcion: "Hacer ejercicio", completado: true },
    { id: 3, descripcion: "Leer un libro", completado: false },
    { id: 4, descripcion: "Subir a la montaña", completado: true }
];

//Función para actualizar el contador de tareas totales y contador de tareas completadas

function actualizarResumen() {
    document.getElementById('total-tareas').textContent = tareas.length;
    const tareasCompletadas = tareas.filter(tarea => tarea.completado).length;
    document.getElementById('tareas-completadas').textContent = tareasCompletadas;
}

//Función para mostrar la lista de tareas y actualizarla

function renderizarTareas() {
    const taskList = document.getElementById('task-list');//Selecciona el  HTML con el id 
    taskList.innerHTML = ''; // Borra el contenido actual de task-list para que la lista se pueda regenerar desde cero
    tareas.forEach(tarea => {//Recorriendo el arreglo
        const row = document.createElement('tr');//Crea un nuevo elemento <tr>
        //Define el contenido HTML de la fila 
        row.innerHTML = ` 
            <td>${tarea.id}</td>
            <td class="${tarea.completado ? 'completed' : ''}">${tarea.descripcion}</td>
            <td>
                <input type="checkbox" ${tarea.completado ? 'checked' : ''} 
                    onclick="cambiarEstado(${tarea.id})">
            </td>
            <td>
                <button onclick="eliminarTarea(${tarea.id})" class="delete-btn">❌</button>
            </td>
        `;
        taskList.appendChild(row);//Agrega la fila (<tr>) recién creada con la información de la tarea al contenedor taskList
    });
    actualizarResumen(); //Llama a la función actualizarResumen() para actualizar el contador de tareas totales y completadas después de renderizar la lista.
}

//Función que permite agregar una nueva tarea al arreglo y actualizar

function agregarTarea() {
    const nuevaTareaDescripcion = document.getElementById('new-task').value.trim();
    if (nuevaTareaDescripcion) {
        const nuevaTarea = {

            //Crea un nuevo objeto llamado nuevaTarea que representa la tarea a agregar
            id: Date.now(),
            descripcion: nuevaTareaDescripcion,
            completado: false
        };
        //Agrega el objeto nuevaTarea al final del arreglo tareas
        tareas.push(nuevaTarea);
        //Limpia el campo de entrada de texto después de agregar la tarea, dejando el espacio en blanco para que el usuario pueda ingresar otra tarea si lo desea.
        document.getElementById('new-task').value = '';
        renderizarTareas(); //Llama a la función renderizarTareas() para actualizar la lista de tareas visibles en la página, incluyendo la nueva tarea recién agregada
    } else {
        alert("Por favor, ingresa una descripción para la tarea.");
    }
}

//Función para eliminar una tarea específica del arreglo tareas
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id); //Condición Mantén solo las tareas cuyo id sea diferente al id recibido como argumento
    renderizarTareas(); ////Llama a la función renderizarTareas() para Vaciar y volver a construir la lista de tareas visibles en la página

}
//Función tiene como objetivo cambiar el estado de completado de una tarea específica en el arreglo 
function cambiarEstado(id) {
    const tarea = tareas.find(tarea => tarea.id === id); // Encuentra la tarea con el ID proporcionado
    if (tarea) {
        tarea.completado = !tarea.completado; // Cambia el estado de completado
    }

    // Encuentra el elemento correspondiente en el DOM y alterna la clase "completed"
    const filas = document.querySelectorAll('#task-list tr');
    filas.forEach(fila => {
        if (parseInt(fila.children[0].textContent) === id) {
            fila.children[1].classList.toggle('completed'); // Alterna la clase "completed" en la descripción
        }
    });

    actualizarResumen(); // Actualiza los contadores
}

// Inicializa la lista de tareas al cargar la página
document.addEventListener('DOMContentLoaded', renderizarTareas);
