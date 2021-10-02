/*
  Catch Errors Handler
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in catchErrors(),
  catch and errors they throw, and send the error messages in the response object
*/

/* eslint-disable */

exports.DuplicateKeyError = class DuplicateKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateKeyError";
  }
};

exports.NotFoundError = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
};

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch((error) => {
      switch (error.name) {
        case "ValidationError":
          const errors = Object.keys(error.errors).map((key) => ({
            [key]: error.errors[key].message,
          }));
          return res.status(400).send({ error: errors });

        case "DuplicateKeyError":
          return res.status(403).send({ error: error.message });

        case "NotFoundError":
          return res.status(404).send({ error: error.message });

        default:
          next(error);
      }
    });
  };
};
