import Joi from "joi";

// Generic Joi validation middleware
export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        details: error.details.map((d) => d.message)
      });
    }

    req.body = value;
    next();
  };
}


