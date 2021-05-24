const sections = [
  {
    id: "algoritmos",
    name: "Algoritmos",
    icon: "/assets/img/icons/algorithm-white.svg",
    description: `Las estructuras de datos nos sirven para almacenar datos de una
    manera especial para que entonces nos ayuden a resolver un problema en
    especifico.`,
    sections: [
      {
        name: "ordenamiento",
        icon: "/assets/img/icons/array.svg",
        sections: [
          {
            name: "burbuja",
            special: {
              iteracion: 0,
              inicial: 0,
              restante: null,
            },
          },
          {
            name: "seleccion",
            special: {
              iteracion: 0,
              posicionMasBajo: 0,
              posicionEscaneo: 1,
              restante: null,
            },
          },
          {
            name: "insercion",
            special: {
              iteracion: 0,
              posicionMasBajo: 0,
              posicionEscaneo: 1,
              restante: null,
            },
          },
          {
            name: "merge",
            special: {
              mode: "split",
              timesDivided: 0,
              history: []
            },
          },
        ],
      },
      {
        name: "Big O",
        icon: "/assets/img/icons/array.svg",
        sections: [
          {
            name: "Introduccion",
          },
          {
            name: "Complejidad temporal",
          },
          {
            name: "Complejidad espacial",
          },
        ],
      },
    ],
  },
  {
    id: "estructurasDeDatos",
    name: "Estructuras de datos",
    icon: "/assets/img/icons/ds.svg",
    description: `Las estructuras de datos nos sirven para almacenar datos de una
    manera especial para que entonces nos ayuden a resolver un problema en
    especifico.`,
    sections: [
      {
        name: "Arrays",
        icon: "/assets/img/icons/array.svg",
        sections: [
          { name: "Explicacion" },
          { name: "Acceso" },
          { name: "Inserciones" },
          { name: "Borrados" },
          { name: "Busqueda" },
        ],
      },
      {
        name: "Arboles",
        icon: "/assets/img/icons/ds-black.svg",
        sections: [
          {
            name: "Explicacion",
            special: {
              restante: null,
            },
          },
          { name: "Acceso" },
          { name: "Inserciones" },
          { name: "Borrados" },
          { name: "Busqueda" },
          { name: "Busqueda" },
        ],
      },
      {
        name: "Pilas",
        icon: "/assets/img/icons/stack.svg",
        sections: [
          { name: "Explicacion" },
          { name: "Acceso" },
          { name: "Inserciones" },
          { name: "Borrados" },
          { name: "Busqueda" },
        ],
      },
      {
        name: "Colas",
        icon: "/assets/img/icons/queues.svg",
        sections: [
          { name: "Explicacion" },
          { name: "Acceso" },
          { name: "Inserciones" },
          { name: "Borrados" },
          { name: "Busqueda" },
        ],
      },
    ],
  },
  {
    id: "practica",
    name: "Practica",
    icon: "/assets/img/icons/practice.svg",
  },
];

export { sections };
