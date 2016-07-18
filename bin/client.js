"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const uri = require("jsuri");
const fetch = require("node-fetch");
const _1 = require("./");
class Client {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }
    buildDefaultHeaders() {
        const headers = new fetch.Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", this.accessToken);
        headers.append("User-Agent", `SWU-Logs (https://github.com/nozzlegear/swu-logs)`);
        return headers;
    }
    createRequest(method, path, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            method = method.toUpperCase();
            const url = new uri(`https://api.sendwithus.com/api/v1/${path}`);
            const options = {
                headers: this.buildDefaultHeaders(),
                method: method,
                body: undefined,
            };
            if ((method === "GET" || method === "DELETE") && payload) {
                for (const prop in payload) {
                    const value = payload[prop];
                    //qs array values should be joined by a comma, e.g. fields=field1,field2,field3
                    url.addQueryParam(prop, Array.isArray(value) ? value.join(",") : value);
                }
            }
            else if (payload) {
                options.body = JSON.stringify(payload);
                options.headers.append("Content-Type", "application/json");
            }
            //Fetch will only throw an exception when there is a network-related error, not when the service returns a non-200 response.
            const result = yield fetch(url.toString(), options);
            let json = yield result.text();
            try {
                json = JSON.parse(json);
            }
            catch (e) {
                //Set ok to false to throw an error with the body's text.
                result.ok = false;
            }
            if (!result.ok) {
                throw new _1.Error(result.statusText, result.status);
            }
            return json;
        });
    }
    list(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createRequest("GET", "logs", options);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createRequest("GET", `logs/${id}`);
        });
    }
    getEvents(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createRequest("GET", `logs/${id}/events`);
        });
    }
    resend(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.createRequest("POST", `/resend`, { log_id: id });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Client;
