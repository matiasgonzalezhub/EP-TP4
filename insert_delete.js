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
      nombre: "Matias",
      apellido: "Gonzalez",
      dni: 123456,
    })
  )
  .then(() =>
    Alumnos.destroy({
      where: {
        dni: 123456,
      },
    })
  )
  .then(() => {
    console.log("Termino");
  });
