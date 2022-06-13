const errorCatch = (req, res, next) => {

  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  return errorHandle(req, res, next, error)
};

const errorHandle = (req, res, next, error) => {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  if (Object.keys(error).includes('except')){
    statusCode = error.except || 500
  }
  res.status(statusCode);

  res.json({
    error: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    results: error.response ? error.response.data : null,
  });
};


const errorFunction = (req, res, next,error_message, except_code) => {
  const error = new Error(error_message);
  error.except = except_code;
  return errorHandle(req, res, next, error);
}

module.exports = {errorCatch, errorHandle, errorFunction};