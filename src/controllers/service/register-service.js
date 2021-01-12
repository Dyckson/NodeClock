const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "test123",
  database: "dbrest",
  port: "5432",
});

const CadastrarClock = async (hour, minute) => {
  let date = new Date();
  let angle = (11 * minute - 60 * hour) / 2;
  angle = Math.round(Math.abs(angle));
  if (angle > 180) {
    angle = 360 - angle;
  }
  if ((hour >= 0) & (hour <= 11)) {
    if ((minute >= 0) & (minute <= 59)) {
      const response = await pool.query(
        "INSERT INTO public.clock (hour, minute, angle, date) VALUES ($1, $2, $3, $4)",
        [hour, minute, angle, date]
      );
      return { angle };
    } else {
      return { message: "O número de minutos deve estar entre 0 e 59" };
    }
  } else {
    return {
      message: "O número de horas deve está entre o intervalo de 0 e 11",
    };
  }
};

module.exports = {
  CadastrarClock,
};
