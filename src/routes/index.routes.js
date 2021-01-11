const { Router } = require('express');
const router = Router();

const { getClock, getClockByH, getClockByHM, postClockHour, postClockHM, putClock, deleteClock } = require('../controllers/index.controller');

router.get('/clock', getClock); //retorna todos os valores
router.get('/clock/:hour/', getClockByH); 
router.get('/clock/:hour/:minute/', getClockByHM);
router.post('/clock/:hour', postClockHour);
router.post('/clock/:hour/:minute/', postClockHM);
router.put('/clock/:id', putClock)
router.delete('/clock/:id', deleteClock);

module.exports = router;