import { Response } from '@angular/http'
import { Injectable } from '@angular/core';

@Injectable()
export class PagingService {

    public static PageNumber: number;
    public static PageSize: number = 5;

    constructor() {

    }

    initPagingService(response: Response) {
        let response_json = response.json();
        let elementsCount = response_json["odata.count"];

        PagingService.PageNumber = Math.ceil(elementsCount/PagingService.PageSize);    
    }
}