"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const microservices_1 = require("@nestjs/microservices");
const axios_1 = require("@nestjs/axios");
let JobService = class JobService {
    constructor(blobServiceClient, httpService) {
        this.blobServiceClient = blobServiceClient;
        this.httpService = httpService;
    }
    async createJob(image, headers) {
        const buffer = await fs.promises.readFile(image.path);
        const base64 = buffer.toString("base64");
        const token = headers.authorization.split(' ')[1];
        console.log(token);
        const config = {
            url: "http://localhost:3002/api/v1/blob",
            method: "post",
            data: { base64, token },
        };
        try {
            const res = await this.httpService.axiosRef.request(config);
            console.log(res.data);
            return res.data;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getJobStatus(id, res) {
        console.log(id);
        const config = {
            url: "http://localhost:3002/api/v1/blob/" + id,
            method: "get",
        };
        try {
            const resp = await this.httpService.axiosRef.request(config);
            console.log(resp.data);
            return res.json({
                "JobId": id,
                "status": resp.data.status
            });
        }
        catch (error) {
            console.log(res);
            return res.json({
                "Msg": "Job not found",
                "error": error
            });
        }
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("BLOB_SERVICE")),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        axios_1.HttpService])
], JobService);
//# sourceMappingURL=job.service.js.map