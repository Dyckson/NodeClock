const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'test123',
    database: 'dbrest',
    port: '5432'
});

//retorna todos os dados da Data Base
const getClock = async (req, res) => {
    const response = await pool.query('SELECT * FROM clock ORDER BY id ASC');
    res.status(200).json(response.rows);
};

//Retorna dados buscados somente por horas
const getClockByH = async (req, res) => {
    const hour = parseInt(req.params.hour);
    const minute = 0;
    const response = await pool.query('SELECT angle FROM clock WHERE hour = $1 AND minute = $2', [hour, minute]);

    if(typeof response.rows[0] == "undefined"){
        let date = new Date();
        let angle = ((11 * minute - 60 * hour)/2);
        angle = Math.round(Math.abs(angle));
        if (angle > 180){
            angle = 360 - angle
        };

        if(hour >= 0 & hour <= 11){
            const response = await pool.query('INSERT INTO public.clock (hour, minute, angle, date) VALUES ($1, $2, $3, $4)', [hour, minute, angle, date]);
            res.json({angle})
        } else{
            res.json('O valor de horas deve está entre 0 e 11')
        };
        }else{
            res.json(response.rows[0]);
        }
};

//Retorna dados buscados por horas e minutos
const getClockByHM = async (req, res) => {
    const hour = parseInt(req.params.hour);
    const minute = parseInt(req.params.minute);
    const response = await pool.query('SELECT angle FROM clock WHERE hour = $1 AND minute = $2', [hour, minute]);
    
    if(typeof response.rows[0] == "undefined"){
        let date = new Date();
        let angle = ((11 * minute - 60 * hour)/2);
        angle = Math.round(Math.abs(angle));
        if (angle > 180){
            angle = 360 - angle
        };
        if(hour >= 0 & hour <= 11){
            if(minute >= 0 & minute <=59){
                const insert = await pool.query('INSERT INTO public.clock (hour, minute, angle, date) VALUES ($1, $2, $3, $4)', [hour, minute, angle, date]);
            res.json({angle})
            } else{
                res.json('O número de minutos deve estar entre 0 e 59')
            };
        } else{
            res.json('O valor de horas deve está entre 0 e 11')
        };
        }else{
            res.json(response.rows[0]);
        }
};

const deleteClock = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM clock where id = $1', [
        id
    ]);
    res.json(`Clock ${id} Deletado com Sucesso`);
};

module.exports = {
    getClock,
    getClockByH,
    getClockByHM,
    deleteClock
};