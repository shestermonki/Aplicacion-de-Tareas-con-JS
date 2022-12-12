const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");
/**
 * SI DA ERROR AL REQUIRE LA DEPENDENCIA PROBAMOS LO SGUIENTE
 * npm install --save inquirer@^8.0.0
 *This will then allow import inquirer with the commonjs require:
 *const inquirer = require('inquirer');
 */
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      /*MANERA DE HACER CON STRING "opt1", "opt2", "opt3"*/
      /*O PODEMOS MOSTRAR LAS OPCIONES EN MANERA DE OBJETO*/
      {
        value: "1",
        name: `${"1.".green} Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar Tareas`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar Tareas`,
      },
      {
        value: "0",
        name: `${"0.".green}: Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=====================".green);
  console.log("Seleccione una Opcion".white);
  console.log("=====================\n".green);

  //DESENSTRUTURAMOS LA OPCION
  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: `Precione ${"Enter".green} para continuar`,
      menssage: `\nPrecione ${"Enter".green} para continuar\n`,
    },
  ];
  await inquirer.prompt(question);
};

const leerInput = async (mensaje) => {
  const question = [
    {
      type: "input",
      name: "desc",
      mensaje,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmarBorrar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmarBorrar,
  mostrarListadoChecklist,
};
