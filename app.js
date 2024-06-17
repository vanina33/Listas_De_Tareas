// Variables
const formulario = document.querySelector("#formulario");
const tituloForm = document.querySelector('#titulo-formulario');
const task = document.querySelector(".tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
let tareas = [];

//eventos
(() => {
    formulario.addEventListener("submit", validarformulario);
    task.addEventListener("click", eliminarTarea);
    task.addEventListener("click", tareaCompletada);
})()


//funciones
function validarformulario(e) {
    e.preventDefault();

    // validar los datos de el imput
    const tarea = document.querySelector("#tarea").value;
    if (!tarea.trim()) {
        tituloForm.textContent = 'Formulario Vacio';

        setTimeout(() => {
            tituloForm.textContent = 'Formulario'
        }, 2000)

        return
    }
    // crear un objeto
    const objTarea = {
        id: Date.now(),
        tarea: tarea,
        estado: false
    }
    tareas = [...tareas, objTarea]
    formulario.reset();
    mostrarHTML();
}

function mostrarHTML() {

    task.innerHTML = '';

    if (tareas.length < 1) {
        const mensaje = document.createElement("h5");
        mensaje.textContent = "~SIN TAREAS~"
        return
    }

    tareas.forEach((item) => {
        const itemTarea = document.createElement("div");
        itemTarea.classList.add("item-tarea");
        itemTarea.innerHTML = `
        ${item.estado ? (
                `<p class="completa">${item.tarea}</p> `
            ) : (
                `<p>${item.tarea}</p> `
            )}
        <div class ="botones">
            <button data-id="${item.id}" class ="eliminar">x</button>
            <button data-id="${item.id}" class="completada">√</button>
        </div>
         `;
        task.appendChild(itemTarea)
    })
    //mostrar el total y completadas 
    const totalTareas = tareas.length;
    total.textContent = `Total Tareas: ${totalTareas}`
    const tareasCompletadas = tareas.filter( item => item.estado === true).length;
    completadas.textContent  = `Completadas: ${tareasCompletadas}`
}


function eliminarTarea(e) {
    if (e.target.classList.contains("eliminar")) {
        const tareaID = Number(e.target.getAttribute("data-id"));
        // eliminar tarea
        const newTask = tareas.filter((item) => item.id !== tareaID);
        tareas = newTask;
        mostrarHTML();
    }
}

function tareaCompletada(e) {
    if (e.target.classList.contains("completada")) {
        const tareaID = Number(e.target.getAttribute("data-id"));

        // darlo por completado la tarea
        const newTask = tareas.map((item) => {
            if (item.id == tareaID) {
                item.estado = !item.estado;
                return item;
            } else {
                return item;
            }
        })
        mostrarHTML();
    }
}