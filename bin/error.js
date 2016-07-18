"use strict";
class SendWithUsError extends Error {
    constructor(message, httpStatusCode) {
        super(message);
        this.httpStatusCode = httpStatusCode;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendWithUsError;
