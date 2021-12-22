
import { Request, Response } from "express";
import debug, {IDebugger} from "debug";
import axios from "axios";
import {configUrls} from "../config";

const log: IDebugger = debug("index:controller");

class IndexController {
    constructor() {}
    getNumber() {
        return 3;
    }
    async getSocialInfo(req:any, res:any) {
        try {
            const twitterPromise = axios(`${configUrls.base}${configUrls.twitter}`);
            const facebookPromise = axios(`${configUrls.base}${configUrls.facebook}`);
            const instagramPromise = axios(`${configUrls.base}${configUrls.instagram}`);
            const [twitterResponse, facebookResponse, instagramResponse] = await Promise.all([twitterPromise, facebookPromise, instagramPromise]);
            return res.status(200).send({
                twitter: twitterResponse.data.map((data: { tweet: any; }) => data.tweet),
                facebook: facebookResponse.data.map((data: { status: any; }) => data.status),
                instagram: instagramResponse.data.map((data: { picture: any; }) => data.picture)
            });

        } catch (e) {
            log("Controller capturing error", e);
            return res.json({
                error: {
                    message: e.message,
                    status: 500
                }
            });
        }
    }
}

export default new IndexController();
