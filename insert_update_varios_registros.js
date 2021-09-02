const Sequelize = require("sequelize");

const sequelize = new Sequelize("prueba", "root", "", {
  host: "localhost",
  dialect: "mariadb" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

class Alumnos extends Sequelize.Model {}
Alumnos.init(
  {
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    dni: Sequelize.INTEGER,
  },
  { sequelize, modelName: "alumnos" }
);

/* crea usuario y luego lo actualiza*/
sequelize
  .sync()
  .then(() =>
    Alumnos.create({
      nombre: "Pedro1",
      apellido: "Rodriguez1",
      dni: 1,
    })
  )
  .then(() =>
    Alumnos.create({
      nombre: "Pedro2",
      apellido: "Rodriguez2",
      dni: 2,
    })
  )
  .then(() =>
    Alumnos.create({
      nombre: "Pedro3",
      apellido: "Rodriguez3",
      dni: 3,
    })
  )
  .then(() =>
    Alumnos.update(
      { nombre: "Pedro_upd1" },
      {
        where: {
          dni: 1,
        },
      }
    )
  )
  .then(() =>
    Alumnos.update(
      { nombre: "Pedro_upd3" },
      {
        where: {
          dni: 3,
        },
      }
    )
  )
  .then(() => {
    console.log("Termino");
  });
