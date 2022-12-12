require("colors");
require("inquirer");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=====================".green);
    console.log("Seleccione una Opcion".green);
    console.log("=====================\n".green);

    console.log(`${"1:".green} Crear una Tarea`);
    console.log(`${"2:".green} Listar tareas`);
    console.log(`${"3:".green} Listar tareas Completadas`);
    console.log(`${"4:".green} Listar tareas Pendientes`);
    console.log(`${"5:".green} Completar Tareas`);
    console.log(`${"6:".green} Borrar Tareas`);
    console.log(`${"0:".green} Salir \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opcion: ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolv) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPrecione ${"Enter".green} para continuar\n`, () => {
      readline.close();
      resolv();
    });
  });
};

module.exports = { mostrarMenu, pausa };
