import uri = require("jsuri");
import * as fetch from "node-fetch";
import {Log, ListOptions, ResendResponse, Event, Error} from "./"

export default class Client
{
    constructor(private accessToken: string)
    {

    }
    
    private buildDefaultHeaders()
    {
        const headers = new fetch.Headers();
        
        headers.append("Accept", "application/json");
        headers.append("Authorization", this.accessToken);
        headers.append("User-Agent", `SWU-Logs (https://github.com/nozzlegear/swu-logs)`);
        
        return headers;
    }
    
    private async createRequest<T>(method: "GET" | "POST" | "PUT" | "DELETE", path: string, payload?: Object)
    {
        method = method.toUpperCase() as any;
        
        const url = new uri(`https://api.sendwithus.com/api/v1/${path}`);
        const options = {
            headers: this.buildDefaultHeaders(),
            method: method,
            body: undefined as string,
        };
        
        if ((method === "GET" || method === "DELETE") && payload)
        {
            for (const prop in payload)
            {
                const value = payload[prop];
                
                //qs array values should be joined by a comma, e.g. fields=field1,field2,field3
                url.addQueryParam(prop, Array.isArray(value) ? value.join(",") : value);
            }
        }
        else if (payload)
        {
            options.body = JSON.stringify(payload);
            
            options.headers.append("Content-Type", "application/json");
        }
        
        //Fetch will only throw an exception when there is a network-related error, not when the service returns a non-200 response.
        const result = await fetch(url.toString(), options);
        let json = await result.text() as any;
        
        try
        {
            json = JSON.parse(json);
        }
        catch (e)
        {
            //Set ok to false to throw an error with the body's text.
            result.ok = false;
        }
        
        if (!result.ok)
        {
            throw new Error(result.statusText, result.status);
        }
        
        return json as T; 
    }

    private async list(options?: {})
    {
        return await this.createRequest<Log[]>("GET", "logs", options);
    }

    private async get(id: string)
    {
        return await this.createRequest<Log>("GET", `logs/${id}`);
    }

    private async getEvents(id: string)
    {
        return await this.createRequest<Event[]>("GET", `logs/${id}/events`);
    }

    private async resend(id: string)
    {
        return await this.createRequest<ResendResponse>("POST", `/resend`, {log_id: id});
    }
}