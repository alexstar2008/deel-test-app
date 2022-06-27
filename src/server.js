const app = require('./app');

function init() {
  try {
    app.listen(3001, () => {
      // eslint-disable-next-line
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    // eslint-disable-next-line
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

init();
