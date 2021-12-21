import express, { Application, Request, Response } from "express";
import axios from 'axios';
import { configUrls } from './config';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
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
			return res.json({ error: {
					message: e.message,
					status: 500
				} });
		}
	}
);

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${error.message}`);
}
