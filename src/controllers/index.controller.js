const { Pool } = require("pg");
const { CadastrarClock } = require("./service/register-service");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "test123",
  database: "dbrest",
  port: "5432",
});

//Retorna todos os clocks
const getClock = async (req, res) => {
  const response = await pool.query("SELECT * FROM clock ORDER BY id ASC");
  res.status(200).json(response.rows);
};

////Retorna o ângulo baseado na hora e se não existir ele criará
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

//Retorna o ângulo baseado na hora e minuto e caso não exista ele criará
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

module.exports = {
  getClock,
  getClockByH,
  getClockByHM,
};
