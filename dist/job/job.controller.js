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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const auth_gaurd_1 = require("../auth/auth.gaurd");
const platform_express_1 = require("@nestjs/platform-express");
const job_service_1 = require("./job.service");
const blob_service_1 = require("../blob/blob.service");
const multerOptions = {
    dest: 'tmp/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
};
let JobController = class JobController {
    constructor(jobService, blobService) {
        this.jobService = jobService;
        this.blobService = blobService;
    }
    async createJob(image, req, headers) {
        console.log("In job api");
        const user = req.user;
        return this.jobService.createJob(image, user, headers);
    }
    async getJob(param) {
        console.log("in get job api");
        return this.jobService.getJob(param);
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGuard),
    (0, common_1.Post)('/'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGuard),
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJob", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.JobService,
        blob_service_1.BlobService])
], JobController);
//# sourceMappingURL=job.controller.js.map