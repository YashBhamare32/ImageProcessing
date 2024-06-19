"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobModule = void 0;
const common_1 = require("@nestjs/common");
const blob_controller_1 = require("./blob.controller");
const blob_service_1 = require("./blob.service");
const mongoose_1 = require("@nestjs/mongoose");
const blob_schema_1 = require("../auth/schemas/blob.schema");
let BlobModule = class BlobModule {
};
exports.BlobModule = BlobModule;
exports.BlobModule = BlobModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: "Blob", schema: blob_schema_1.blobSchema }])
        ],
        controllers: [blob_controller_1.BlobController],
        providers: [blob_service_1.BlobService],
        exports: [blob_service_1.BlobService]
    })
], BlobModule);
//# sourceMappingURL=blob.module.js.map