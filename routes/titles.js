const express = require('express');
const router = express.Router();

const queryMiddleware = require('../middlewares/queryMiddleware');
const baseMoviesController = require('../routes.controllers/baseMoviesController');
const baseSingleMovieController = require('../routes.controllers/baseSingleMovieController');
const mainActorsController = require('../routes.controllers/mainActorsController');
const crewController = require('../routes.controllers/crewController');
const ratingsController = require('../routes.controllers/ratingsController');
const akasController = require('../routes.controllers/akasController');
const searchByTitleController = require('../routes.controllers/searchByTitleController');
const searchByKeywordsController = require('../routes.controllers/searchByKeywordsController');
const upcomingController = require('../routes.controllers/upcomingController');
const episodesController = require('../routes.controllers/episodesController');
const episodesAndSeasonsController = require('../routes.controllers/episodeAndSeasonsController')
const episodesSeasonsNumberController = require('../routes.controllers/episodeSeasonsNumberController');
const singleEpisodeController = require('../routes.controllers/singleEpisodeController');
const titleTypesController = require('../routes.controllers/titleTypesController');
const genresController = require('../routes.controllers/genresController');
const searchByAkasController = require('../routes.controllers/searchByAkasController');
const baseMoviesByListIdsController = require('../routes.controllers/baseMoviesByListIdsController');
const listsController = require('../routes.controllers/listsController');

router.use(queryMiddleware);

router.get('/', baseMoviesController);

router.get('/:id', baseSingleMovieController);

router.get('/:id/main_actors', mainActorsController);

router.get('/:id/crew', crewController);

router.get('/:id/ratings', ratingsController);

router.get('/:id/aka', akasController);

router.get('/search/title/:title', searchByTitleController);

router.get('/search/keyword/:keyword', searchByKeywordsController);

router.get('/search/akas/:aka', searchByAkasController);

router.get('/x/upcoming', upcomingController);

router.get('/x/titles-by-ids', baseMoviesByListIdsController);

router.get('/series/:seriesId/:season', episodesController);

router.get('/series/:seriesId', episodesAndSeasonsController);

router.get('/seasons/:seriesId', episodesSeasonsNumberController);

router.get('/episode/:id', singleEpisodeController);

router.get('/utils/genres', genresController);

router.get('/utils/titleTypes', titleTypesController);

router.get('/utils/lists', listsController);

module.exports = router;
