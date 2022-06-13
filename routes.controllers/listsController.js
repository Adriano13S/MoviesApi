const errorHandler = require('../middlewares/errorMiddlewares');
const {listsCollections} = require('./filterStructure');

const listsController = async (req, res, next) => {
  try {
    const result = Object.keys(listsCollections)
    res.json({'entries': result.length, 'results': result});
  } catch (error) {
    return errorHandler.errorHandle(req, res, next, error);
  }
};

module.exports = listsController;