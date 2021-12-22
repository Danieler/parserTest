import express, {Application, Request, Response} from "express";
import { port} from './config';
import indexController from "./controllers/index.controller";


const app: Application = express();
// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get(
    "/",
    indexController.getSocialInfo
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error.message}`);
}
