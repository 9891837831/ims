
const sendSuccess = (res, message, data) => {
    return res.status(200).json({
      message: message,
      status: true,
      data: data,
    });
  };
  
  const sendError = (res, message, status = 500, error = null) => {
    return res.status(status).json({
      message: message,
      status: false,
      error: error ? error.message : null,
    });
  };
  
  module.exports = {
    sendSuccess,
    sendError,
  };
  