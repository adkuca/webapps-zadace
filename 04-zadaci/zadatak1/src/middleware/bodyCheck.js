import HTTPError from '../helpers/HTTPError.js';

export default (...fields) =>
  (req, res, next) => {
    if (!fields.every((field) => Object.hasOwn(req.body, field)))
      next(new HTTPError('Missing required field(s).', 422));

    return next();
  };
