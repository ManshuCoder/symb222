// Centralized error handler
export function notFoundHandler(req, res, next) {
  res.status(404).json({ message: "Route not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.statusCode || 500;
  const message =
    err.message || "An unexpected error occurred. Please try again later.";

  res.status(status).json({
    message
  });
}


