import indexController from "./index.controller";
import axios from "axios";
jest.mock('axios', () => jest.fn());

describe('indexController', () => {
    describe('getSocialInfo method', () => {
        it('should call 3 social endpoints through axios', async () => {
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await indexController.getSocialInfo(req, res);
            expect(axios).toHaveBeenCalledTimes(3);
        });
        it('should return response status 200 if every socialEndpoint respond', async () => {
            const twitterResp = new Promise(resolve => {
                resolve({data: [{tweet: "tweet"}]})
            });
            const facebookResp = new Promise(resolve => {
                resolve({data: [{status: "status"}]})
            });
            const instagramResp = new Promise((resolve, reject) => {
                resolve({data: [{picture: "picture"}]})
            });
            (axios as unknown as jest.Mock).mockResolvedValueOnce(twitterResp);
            (axios as unknown as jest.Mock).mockResolvedValueOnce(facebookResp);
            (axios as unknown as jest.Mock).mockResolvedValueOnce(instagramResp);
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await indexController.getSocialInfo(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });
        it('should return error if some social endpoint fails', async () => {
            const twitterResp = new Promise(resolve => {
                resolve({data: [{tweet: "tweet"}]})
            });
            const facebookResp = new Promise(resolve => {
                resolve({data: [{status: "status"}]})
            });
            const instagramResp = new Promise((resolve, reject) => {
                reject({message: "error"})
            });
            (axios as unknown as jest.Mock).mockResolvedValueOnce(twitterResp);
            (axios as unknown as jest.Mock).mockResolvedValueOnce(facebookResp);
            (axios as unknown as jest.Mock).mockResolvedValueOnce(instagramResp);
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await indexController.getSocialInfo(req, res);
            expect(res.json).toHaveBeenCalledWith({"error": {"message": "error", "status": 500}});
        });

    });

});
