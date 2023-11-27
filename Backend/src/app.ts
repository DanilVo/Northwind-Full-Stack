import express from 'express';
import expressFileUpload from "express-fileupload";
import path from 'path';
import { fileSaver } from 'uploaded-file-saver';
import appConfig from './2-utils/app-config';
import catchAll from './4-middleware/catch-all';
import routeNotFound from './4-middleware/route-not-found';
import authController from './6-controllers/auth-controller';
import employeeController from './6-controllers/employees-controllers';
import productController from './6-controllers/products-controller';
import cors from "cors";

// Creating the server:
const server = express();

server.use(cors({origin: "http://localhost:3000"}));

fileSaver.config(path.join(__dirname, "1-assets", "images"));

// Creating a request.body object containing the request body data:
server.use(express.json());
server.use(expressFileUpload())

// Connect our controllers:
server.use('/api', productController, employeeController, authController);

server.use(routeNotFound);

server.use(catchAll);

// Running the server:
server.listen(appConfig.port, () =>
  console.log('Listening on http://localhost:' + appConfig.port)
);
