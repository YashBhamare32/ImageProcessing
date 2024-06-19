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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const blob_service_1 = require("../blob/blob.service");
const fs = require("fs");
let JobService = class JobService {
    constructor(blobService) {
        this.blobService = blobService;
    }
    async createJob(image, user, headers) {
        const buffer = await fs.promises.readFile(image.path);
        const base64Image = buffer.toString("base64");
        const token = headers.authorization.split(' ')[1];
        console.log(token);
        const res = await this.blobService.storeImage(token, base64Image);
        return res;
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blob_service_1.BlobService])
], JobService);
//# sourceMappingURL=job.service.js.map