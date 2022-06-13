const express = require('express');
const router = express.Router();

const queryMiddleware = require('../middlewares/queryMiddleware');
const baseActorsController = require('../routes.controllers/baseActorsController');
const baseSingleActorController = require('../routes.controllers/baseSingleActorController');

router.get('/', queryMiddleware, baseActorsController);

router.get('/:id', queryMiddleware, baseSingleActorController);

module.exports = router;