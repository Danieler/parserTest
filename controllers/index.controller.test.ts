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
        it('should call 3 social endpoints through axios', async () => {
            const mRes = new Promise(resolve => {
                resolve({data: [{tweet: "tweet"}]})
            });
            const mRes2 = new Promise(resolve => {
                resolve({data: [{status: "status"}]})
            });
            const mRes3 = new Promise(resolve => {
                resolve({data: [{picture: "picture"}]})
            });
            (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes);
            (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes2);
            (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes3);
            const req = {}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await indexController.getSocialInfo(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

    });

});
