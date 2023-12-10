//Declaracion de variables
const lista = document.getElementById("listaTareas");
const total = document.getElementById("totalTareas");
const completadas = document.getElementById("tareasCompletadas");
const agregarBtn = document.getElementById("agregarBtn");
const tareas = [];
//Función pora las tareas por default
const addTareaInicial = (texto, completada) => {
  tareas.push({ id: tareas.length + 1, texto, completada });
  renderTareas();
};
//Agregando tareas
const addTarea = () => {
  const textoTarea = entradaTarea.value.trim();
  if (textoTarea === "") {
    alert("Por favor, ingresa una tarea"); //Agregue eso para obligar al usuario a ingresar un dato
    return;
  }
  tareas.push({ id: tareas.length + 1, texto: textoTarea, completada: false });
  renderTareas();
  entradaTarea.value = "";
};
//Renderizado de tareas
const renderTareas = () => {
  lista.innerHTML = "";
  tareas.forEach((tarea) => {
    const elementoLista = document.createElement("li");
    elementoLista.className = `tarea ${
      tarea.completada ? "tarea-completada" : ""
    }`;

    const idTarea = document.createElement("span");
    idTarea.className = "mr-2";
    idTarea.appendChild(document.createTextNode(tarea.id));

    const textoTarea = document.createElement("span");
    textoTarea.appendChild(document.createTextNode(tarea.texto));

    elementoLista.appendChild(idTarea);
    elementoLista.appendChild(textoTarea);
    //Comportamiento de la checkbox
    const casillaVerificacion = document.createElement("input");
    casillaVerificacion.type = "checkbox";
    casillaVerificacion.className = "checkbox mr-2";
    casillaVerificacion.checked = tarea.completada;
    casillaVerificacion.addEventListener("change", () => {
      tarea.completada = casillaVerificacion.checked;
      elementoLista.classList.toggle(
        "tarea-completada",
        casillaVerificacion.checked
      );
      updateContadores();
    });

    elementoLista.appendChild(casillaVerificacion);
    //Comportamiento del botón eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.className = "eliminar";
    botonEliminar.appendChild(document.createTextNode("Eliminar"));
    botonEliminar.addEventListener("click", () => {
      tareas.splice(tareas.indexOf(tarea), 1);
      renderTareas();
      updateContadores();
    });

    elementoLista.appendChild(botonEliminar);
    lista.appendChild(elementoLista);
  });

  updateContadores();
};
//Contadores de tareas
const updateContadores = () => {
  total.innerText = tareas.length;
  completadas.innerText = tareas.filter((tarea) => tarea.completada).length;
};
//Tareas iniciales
addTareaInicial("Pasear al perro", true);
addTareaInicial("Hacer el desafío", false);
addTareaInicial("Ir a comprar", true);
//Boton de agregar tarea
agregarBtn.addEventListener("click", addTarea);
