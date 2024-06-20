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
const blob_service_1 = require("../blob/blob.service");
const fs = require("fs");
const mongoose_1 = require("@nestjs/mongoose");
const blob_schema_1 = require("../auth/schemas/blob.schema");
const mongoose_2 = require("mongoose");
let JobService = class JobService {
    constructor(blobService, blobModel) {
        this.blobService = blobService;
        this.blobModel = blobModel;
    }
    async createJob(image, user, headers) {
        const buffer = await fs.promises.readFile(image.path);
        const base64Image = buffer.toString("base64");
        const token = headers.authorization.split(' ')[1];
        console.log(token);
        const res = await this.blobService.storeImage(token, base64Image);
        await fs.promises.unlink(image.path);
        return res;
    }
    async getJob(params) {
        const id = params.id;
        const job = await this.blobModel.findOne({ id });
        if (!job) {
            throw new common_1.NotFoundException("Job not found in db");
        }
        console.log(job);
        return {
            id: job.id,
            status: job.status
        };
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(blob_schema_1.Blob.name)),
    __metadata("design:paramtypes", [blob_service_1.BlobService,
        mongoose_2.Model])
], JobService);
//# sourceMappingURL=job.service.js.map