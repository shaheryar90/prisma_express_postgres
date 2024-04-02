class Response {
  failure(statusCode, errorMessage) {
    return {
      status: statusCode,
      error: {
        message: errorMessage,
      },
    };
  }
  success(statusCode, value, successMessage) {
    return {
      status: statusCode,
      data: value,
      message: successMessage,
    };
  }
}
module.exports = new Response();
