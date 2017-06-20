import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigurationManager } from '../services/configuration-manager.service';

@Injectable()
export class HttpService{

    constructor (private http: Http){

    }

    click(): Observable<any> {
        const headers: Headers = new Headers();
        headers.append("Accept", "text/plain")
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        let host = ConfigurationManager.Host;

        return this.http.post(`http://${host}/api/WSClick`, "", opts);
    }

    notifyAdmin(): Observable<any> {
        let token=localStorage.getItem("token");
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(token).token);
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        let host = ConfigurationManager.Host;
        
        return this.http.post(`http://${host}/api/NotifyAdmin`, "", opts);
    }

    approveAccommodation(id: number) {
        let token=localStorage.getItem("token");
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer '+ JSON.parse(token).token);
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        let host = ConfigurationManager.Host;
        
        return this.http.put(`http://${host}/api/NotifyManager/${id}`, "", opts);
    }
}