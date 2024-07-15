import { createServer } from 'http';
import app from './app';
import AppDataSource from './dataSource';
import config from './appConfig';

const server = createServer(app);
// init db
AppDataSource.initialize()
  .then(() => {
    console.log("Database initial");
    server.listen(config.app.port, () => {
      console.log(`app listening on port ${config.app.port}`);
    });

  })
  .catch((error) => console.log(error));

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await AppDataSource.destroy();
  server.close(() => {
    console.log('Server has been stopped');
    process.exit(0);
  });
});

