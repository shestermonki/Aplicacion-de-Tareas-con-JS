const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmarBorrar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
//const { pausa } = require("./helpers/mensajes");
const Tareas = require("./models/tareas");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
require("colors");

/*const main = async () => {
  console.clear();

  let opt = "";
  do {
    opt = await mostrarMenu();
    console.log({ opt });
    if (opt !== '0') await pausa();
  } while (opt !== "0");
};*/

//CON DEPENDENCIA INQUIRER Y FUNCIONES PERZONALIZADAS
const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    /**
     * const tareas = new Tareas();
     * const tarea = new Tarea("Comprar Comida");
     * tareas._listado[tarea.id] = tarea;
     * console.log(tareas);
     */
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.createTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.ListadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.ListadoArr);
        if (id !== "0") {
          const siOno = await confirmarBorrar("¿Estas seguro?");
          if (siOno) {
            tareas.borrarTarea(id);
            console.log("BORRADA CORRECTAMENTE");
          }
        }

        break;
      case "0":
        break;
    }
    guardarDB(tareas.ListadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
