/**
 * Dac Services
 * Dac Service REST API
 *
 * OpenAPI spec version: 1.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { DateDoubleModel } from '../model/dateDoubleModel';
import { InstrumentListModel } from '../model/instrumentListModel';
import { InstrumentModel } from '../model/instrumentModel';
import { RecurrentTransactionListModel } from '../model/recurrentTransactionListModel';
import { TransactionListModel } from '../model/transactionListModel';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UtilityResourcesService {

    protected basePath = 'https://localhost/dac/rest';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * List Data
     * 
     * @param envID The Service Environment
     * @param tenant tenant id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getActiveInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe?: 'body', reportProgress?: boolean): Observable<InstrumentListModel>;
    public getActiveInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InstrumentListModel>>;
    public getActiveInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InstrumentListModel>>;
    public getActiveInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getActiveInstrumentForTenantList_envID_tenant.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (tenant !== undefined) {
            queryParameters = queryParameters.set('tenant', <any>tenant);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<InstrumentListModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/activeinstrumentsfortenant`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Data
     * 
     * @param envID The Service Environment
     * @param tenant tenant id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe?: 'body', reportProgress?: boolean): Observable<InstrumentListModel>;
    public getInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InstrumentListModel>>;
    public getInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InstrumentListModel>>;
    public getInstrumentForTenantList_envID_tenant(envID: string, tenant?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getInstrumentForTenantList_envID_tenant.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (tenant !== undefined) {
            queryParameters = queryParameters.set('tenant', <any>tenant);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<InstrumentListModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/instrumentsfortenant`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Data
     * 
     * @param envID The Service Environment
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInstrumentList_envID(envID: string, observe?: 'body', reportProgress?: boolean): Observable<InstrumentListModel>;
    public getInstrumentList_envID(envID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InstrumentListModel>>;
    public getInstrumentList_envID(envID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InstrumentListModel>>;
    public getInstrumentList_envID(envID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getInstrumentList_envID.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<InstrumentListModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/instruments`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Data
     * 
     * @param envID The Service Environment
     * @param tenant tenant id
     * @param instrumenttype instrumenttype
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInstrumentPerTypeList_envID_tenant_instrumenttype(envID: string, tenant?: number, instrumenttype?: string, observe?: 'body', reportProgress?: boolean): Observable<InstrumentListModel>;
    public getInstrumentPerTypeList_envID_tenant_instrumenttype(envID: string, tenant?: number, instrumenttype?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InstrumentListModel>>;
    public getInstrumentPerTypeList_envID_tenant_instrumenttype(envID: string, tenant?: number, instrumenttype?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InstrumentListModel>>;
    public getInstrumentPerTypeList_envID_tenant_instrumenttype(envID: string, tenant?: number, instrumenttype?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getInstrumentPerTypeList_envID_tenant_instrumenttype.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (tenant !== undefined) {
            queryParameters = queryParameters.set('tenant', <any>tenant);
        }
        if (instrumenttype !== undefined) {
            queryParameters = queryParameters.set('instrumenttype', <any>instrumenttype);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<InstrumentListModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/instrumentspertype`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get Data
     * 
     * @param envID The Service Environment
     * @param isin the isin
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInstrument_envID_isin(envID: string, isin?: string, observe?: 'body', reportProgress?: boolean): Observable<InstrumentModel>;
    public getInstrument_envID_isin(envID: string, isin?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InstrumentModel>>;
    public getInstrument_envID_isin(envID: string, isin?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InstrumentModel>>;
    public getInstrument_envID_isin(envID: string, isin?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getInstrument_envID_isin.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (isin !== undefined) {
            queryParameters = queryParameters.set('isin', <any>isin);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<InstrumentModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/getequity`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Data
     * 
     * @param envID The Service Environment
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getRecurrentTransactionList_envID(envID: string, observe?: 'body', reportProgress?: boolean): Observable<RecurrentTransactionListModel>;
    public getRecurrentTransactionList_envID(envID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RecurrentTransactionListModel>>;
    public getRecurrentTransactionList_envID(envID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RecurrentTransactionListModel>>;
    public getRecurrentTransactionList_envID(envID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getRecurrentTransactionList_envID.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<RecurrentTransactionListModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/listRecurrentTransactions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Data
     * 
     * @param envID The Service Environment
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTenantList_envID(envID: string, observe?: 'body', reportProgress?: boolean): Observable<InstrumentListModel>;
    public getTenantList_envID(envID: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InstrumentListModel>>;
    public getTenantList_envID(envID: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InstrumentListModel>>;
    public getTenantList_envID(envID: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getTenantList_envID.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<InstrumentListModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/listTenants`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * List Data
     * 
     * @param envID The Service Environment
     * @param startdate startdate in Format yyyy-mm-dd
     * @param enddate enddate in Format yyyy-mm-dd
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTransactionList_envID_startdate_enddate(envID: string, startdate?: string, enddate?: string, observe?: 'body', reportProgress?: boolean): Observable<TransactionListModel>;
    public getTransactionList_envID_startdate_enddate(envID: string, startdate?: string, enddate?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TransactionListModel>>;
    public getTransactionList_envID_startdate_enddate(envID: string, startdate?: string, enddate?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TransactionListModel>>;
    public getTransactionList_envID_startdate_enddate(envID: string, startdate?: string, enddate?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getTransactionList_envID_startdate_enddate.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startdate !== undefined) {
            queryParameters = queryParameters.set('startdate', <any>startdate);
        }
        if (enddate !== undefined) {
            queryParameters = queryParameters.set('enddate', <any>enddate);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<TransactionListModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/listTransactions`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Map Data
     * 
     * @param instrumentId the instrumentId
     * @param envID The Service Environment
     * @param startdate startdate in Format yyyy-mm-dd
     * @param enddate enddate in Format yyyy-mm-dd
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getValueMap_instrumentId_envID_startdate_enddate(instrumentId: number, envID: string, startdate?: string, enddate?: string, observe?: 'body', reportProgress?: boolean): Observable<DateDoubleModel>;
    public getValueMap_instrumentId_envID_startdate_enddate(instrumentId: number, envID: string, startdate?: string, enddate?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DateDoubleModel>>;
    public getValueMap_instrumentId_envID_startdate_enddate(instrumentId: number, envID: string, startdate?: string, enddate?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DateDoubleModel>>;
    public getValueMap_instrumentId_envID_startdate_enddate(instrumentId: number, envID: string, startdate?: string, enddate?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (instrumentId === null || instrumentId === undefined) {
            throw new Error('Required parameter instrumentId was null or undefined when calling getValueMap_instrumentId_envID_startdate_enddate.');
        }
        if (envID === null || envID === undefined) {
            throw new Error('Required parameter envID was null or undefined when calling getValueMap_instrumentId_envID_startdate_enddate.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (startdate !== undefined) {
            queryParameters = queryParameters.set('startdate', <any>startdate);
        }
        if (enddate !== undefined) {
            queryParameters = queryParameters.set('enddate', <any>enddate);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.get<DateDoubleModel>(`${this.basePath}/myfinance/environments/${encodeURIComponent(String(envID))}/getvaluecurve/${encodeURIComponent(String(instrumentId))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
