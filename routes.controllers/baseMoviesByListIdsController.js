const client = require('../db/db');
const errorHandler = require('../middlewares/errorMiddlewares');
const infoStructure = require('./infoStructure');
const {listsCollections} = require('./filterStructure');

const baseMoviesByListIdsController = async (req, res, next) => {
  const { info, idsList, list } = req.query
  try {
    const result = await client.db(process.env.DB_NAME)
                              .collection(listsCollections[list])
                              .find({"id": {"$in": idsList}})
                              .project(infoStructure[info])
                              .maxTimeMS(Number(process.env.MAX_TIME))
                              .toArray();
    
    res.json({'entries': result.length, 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = baseMoviesByListIdsController;