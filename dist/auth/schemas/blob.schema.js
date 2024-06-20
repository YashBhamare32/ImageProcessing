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
exports.blobSchema = exports.Blob = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Blob = class Blob {
};
exports.Blob = Blob;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Blob.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blob.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blob.prototype, "base64Image", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blob.prototype, "status", void 0);
exports.Blob = Blob = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Blob);
;
exports.blobSchema = mongoose_1.SchemaFactory.createForClass(Blob);
//# sourceMappingURL=blob.schema.js.map