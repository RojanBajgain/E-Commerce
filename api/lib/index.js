const debug = () => process.env.DEBUG == "true";

const showError = (error, next) => {
  if (debug) {
    console.error(error);
  }
  next({
    message: `There was problem while executing req ${error}`,
    status: 400,
  });
};

module.exports = { showError, debug };
