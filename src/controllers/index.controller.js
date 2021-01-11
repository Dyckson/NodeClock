const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'test123',
    database: 'dbrest',
    port: '5432'
});

//retorna todos os dados do BD
const getClock = async (req, res) => {
    const response = await pool.query('SELECT * FROM clock ORDER BY id ASC');
    res.status(200).json(response.rows);
};

//Retorna dados buscados somente por horas
const getClockByH = async (req, res) => {
    const hour = parseInt(req.params.hour);
    const minute = 0;
    const response = await pool.query('SELECT angle FROM clock WHERE hour = $1 AND minute = $2', [hour, minute]);
    res.json(response.rows[0]);

    if(typeof response.rows[0] == "undefined"){
        
    };
};

//Retorna dados buscados por horas e minutos
const getClockByHM = async (req, res) => {
    const hour = parseInt(req.params.hour);
    const minute = parseInt(req.params.minute);
    const response = await pool.query('SELECT angle FROM clock WHERE hour = $1 AND minute = $2', [hour, minute]);
    res.json(response.rows[0]);
};

//Adiciona dados via URL tendo hora como único parâmetro
const postClockHour = async (req, res) => {
    const hour = parseInt(req.params.hour)
    const minute = 0
    // retorna a data atual
    let date = new Date();
    // calculo para o valor do ângulo
    let angle = ((11 * minute - 60 * hour)/2);
    // Arredonda o Ângulo
    angle = Math.round(Math.abs(angle));
    // Calcula o menor ângulo
    if (angle > 180){
        angle = 360 - angle
    };
    // Os dados só serão gravados se a hora estiver entre 0 e 11
    if(hour >= 0 & hour <= 11){
        const response = await pool.query('INSERT INTO public.clock (hour, minute, angle, date) VALUES ($1, $2, $3, $4)', [hour, minute, angle, date]);
        res.json({
            message: 'Clock cadastrado com sucesso',
            clock: {hour, minute, angle, date}
        })
    } else{
        res.json('O valor de horas deve está entre 0 e 11')
    };
};

//Adiciona dados via URL tendo como parâmetro Hora e Minuto 
const postClockHM = async (req, res) => {
    const hour = parseInt(req.params.hour)
    const minute = parseInt(req.params.minute)
    // retorna a data atual
    let date = new Date();

    // calculo para o valor do ângulo
    let angle = ((11 * minute - 60 * hour)/2);
    // Arredonda o valor do ângulo
    angle = Math.round(Math.abs(angle));
    // Calcula o menor ângulo
    if (angle > 180){
        angle = 360 - angle
    };
    // Validador de horas
    if(hour >= 0 & hour <= 11){
        if(minute >= 0 & minute <=59){
            const response = await pool.query('INSERT INTO public.clock (hour, minute, angle, date) VALUES ($1, $2, $3, $4)', [hour, minute, angle, date]);
        res.json({
            message: 'Clock cadastrado com sucesso',
            clock: {hour, minute, angle, date}
        })
        } else{
            res.json('O número de minutos deve estar entre 0 e 59')
        };
    } else{
        res.json('O valor de horas deve está entre 0 e 11')
    };
};

const putClock = async (req, res) => {
    const id = parseInt(req.params.id);
    const { hour, minute } = req.body;

    const response =await pool.query('UPDATE clock SET hour = $1, minute = $2 WHERE id = $3', [
        hour,
        minute,
        id
    ]);
    res.json({
        message: 'Clock Atualizado com Sucesso',
        clock: {id, hour, minute}
    });
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
    postClockHour,
    postClockHM,
    putClock,
    deleteClock
};