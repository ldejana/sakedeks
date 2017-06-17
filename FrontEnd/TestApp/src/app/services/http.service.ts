import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService{

    constructor (private http: Http){

    }

    click(): Observable<any> {
        const headers: Headers = new Headers();
        headers.append("Accept", "text/plain")
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.post("http://localhost:54042/api/WSClick", "", opts);
    }

    notifyAdmin(): Observable<any> {
        const headers: Headers = new Headers();
        headers.append("Accept", "text/plain")
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.post("http://localhost:54042/api/NotifyAdmin", "", opts);
    }

    approveAccommodation(id: number) {
        const headers: Headers = new Headers();
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        
        return this.http.put(`http://localhost:54042/api/NotifyManager/${id}`, "", opts);
    }
}