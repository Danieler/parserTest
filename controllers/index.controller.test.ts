import indexController from "./index.controller";
import axios from "axios";
import { Request, Response } from "express";
import {mockRequest, mockResponse} from "mock-req-res";

jest.mock("axios");


describe('indexController', () => {


    describe('getSocialInfo method', () => {

        it('should call 3 social endpoints through axios', async () => {
            (axios as unknown as jest.Mock).mockResolvedValueOnce([]);
            const req = mockRequest()
            const res = mockResponse()
            await indexController.getSocialInfo(req as Request, res as Response);
            expect(axios).toHaveBeenCalledTimes(3);
        });

    });

});
