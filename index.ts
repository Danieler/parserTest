import express, { Application, Request, Response } from "express";
import axios from 'axios';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		try {
			const twitterPromise = axios('http://codefight.davidbanham.com/twitter');
			const facebookPromise = axios('http://codefight.davidbanham.com/facebook');
			const instagramPromise = axios('http://codefight.davidbanham.com/instagram');
			const [twitterResponse, facebookResponse, instagramResponse] = await Promise.all([twitterPromise, facebookPromise, instagramPromise]);

			console.log("twitter", twitterResponse.data)
			console.log("facebookResponse", facebookResponse.data)
			console.log("instagramResponse", instagramResponse.data)
			return res.status(200).send({
				twitter: twitterResponse.data.map((data: { tweet: any; }) => data.tweet),
				facebook: facebookResponse.data.map((data: { status: any; }) => data.status),
				instagram: instagramResponse.data.map((data: { picture: any; }) => data.picture)
			});
		} catch (e) {
			console.log(e);
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
