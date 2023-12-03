import cors from 'cors';
import express from 'express';
import expressFileUpload from 'express-fileupload';
import path from 'path';
import { fileSaver } from 'uploaded-file-saver';
import appConfig from './2-utils/app-config';
import activities from './4-middleware/activity';
import catchAll from './4-middleware/catch-all';
import routeNotFound from './4-middleware/route-not-found';
import sanitize from './4-middleware/sanitize';
import authController from './6-controllers/auth-controller';
import employeeController from './6-controllers/employees-controllers';
import productController from './6-controllers/products-controller';

// Creating the server:
const server = express();

if (appConfig.isDevelopment) {
  server.use(cors({ origin: 'http://localhost:3000' }));
} else {
  server.use(cors({ origin: 'http://some-site.com' }));
}

fileSaver.config(path.join(__dirname, '1-assets', 'images'));

// Creating a request.body object containing the request body data:
server.use(express.json());
server.use(expressFileUpload());
server.use(activities);
server.use(sanitize);
// Connect our controllers:
server.use('/api', productController, employeeController, authController);

server.use('*',routeNotFound);

server.use(catchAll);

// Running the server:
server.listen(appConfig.port, () =>
  console.log('Listening on http://localhost:' + appConfig.port)
);
