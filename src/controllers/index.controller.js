const { Pool } = require("pg");
const { CadastrarClock } = require("./service/register-service");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "test123",
  database: "dbrest",
  port: "5432",
});

//retorna todos os dados da Data Base
const getClock = async (req, res) => {
  const response = await pool.query("SELECT * FROM clock ORDER BY id ASC");
  res.status(200).json(response.rows);
};

//Retorna dados buscados somente por horas
const getClockByH = async (req, res) => {
  const hour = parseInt(req.params.hour);
  const minute = 0;
  const response = await pool.query(
    "SELECT angle FROM clock WHERE hour = $1 AND minute = $2",
    [hour, minute]
  );

  if (typeof response.rows[0] == "undefined") {
    try {
      res.json(await CadastrarClock(hour, minute));
    } catch {}
  } else {
    res.json(response.rows[0]);
  }
};

//Retorna dados buscados por horas e minutos
const getClockByHM = async (req, res) => {
  const hour = parseInt(req.params.hour);
  const minute = parseInt(req.params.minute);
  const response = await pool.query(
    "SELECT angle FROM clock WHERE hour = $1 AND minute = $2",
    [hour, minute]
  );

  if (typeof response.rows[0] == "undefined") {
    try {
      res.json(await CadastrarClock(hour, minute));
    } catch {}
  } else {
    res.json(response.rows[0]);
  }
};

const deleteClock = async (req, res) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM clock where id = $1", [id]);
  res.json(`Clock ${id} Deletado com Sucesso`);
};

module.exports = {
  getClock,
  getClockByH,
  getClockByHM,
  deleteClock,
};
