const Sequelize = require("sequelize").Sequelize;
// appel bibliothèque l'ORM


const sequelizeConfig = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.dialect,
  }
);

async function main() {
  try {
    //connect to db
    await sequelizeConfig
      .authenticate()
      .then(() => {
        console.log(
          "✔ Connection has been established successfully.".underline
        );
      })
      .catch((err) => {
        console.error(`Unable to connect to the database : ${err}`.bgRed);
      });
    //create table from our models
    await sequelizeConfig
      .sync({ force: false })
      .then(() => {
        console.log("Server is on !".underline);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.error(`Unable to connect to the database : ${err}`.bgRed);
  }
}

main();









module.exports = {
  sequelizeConfig,
  Sequelize,
};
