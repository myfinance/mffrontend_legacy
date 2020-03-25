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

import { BaseMFRunnerParameter } from '../model/baseMFRunnerParameter';
import { JobInformation } from '../model/jobInformation';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class MyFinanceRunnerService {

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
     * list known cops jobs
     * List all JobInformation
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public vERBATIMlist(observe?: 'body', reportProgress?: boolean): Observable<Array<any>>;
    public vERBATIMlist(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<any>>>;
    public vERBATIMlist(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<any>>>;
    public vERBATIMlist(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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
            'application/json'
        ];

        return this.httpClient.get<Array<any>>(`${this.basePath}/Runner/list`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * execute myfinance launcher
     * Execute myfinance Core Launcher
     * @param env The env
     * @param jobtype launching md jobs z.b. de.hf.dac.myfinance.importer.Import
     * @param params Parameter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public vERBATIMstart_env_jobtype_params(env: string, jobtype: string, params?: BaseMFRunnerParameter, observe?: 'body', reportProgress?: boolean): Observable<JobInformation>;
    public vERBATIMstart_env_jobtype_params(env: string, jobtype: string, params?: BaseMFRunnerParameter, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JobInformation>>;
    public vERBATIMstart_env_jobtype_params(env: string, jobtype: string, params?: BaseMFRunnerParameter, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JobInformation>>;
    public vERBATIMstart_env_jobtype_params(env: string, jobtype: string, params?: BaseMFRunnerParameter, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (env === null || env === undefined) {
            throw new Error('Required parameter env was null or undefined when calling vERBATIMstart_env_jobtype_params.');
        }
        if (jobtype === null || jobtype === undefined) {
            throw new Error('Required parameter jobtype was null or undefined when calling vERBATIMstart_env_jobtype_params.');
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
            'application/json'
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<JobInformation>(`${this.basePath}/Runner/${encodeURIComponent(String(jobtype))}/${encodeURIComponent(String(env))}/start`,
            params,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get status of cops jobs
     * JobInformation of actual Job
     * @param uuid uuid of job
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public vERBATIMstatus_uuid(uuid: string, observe?: 'body', reportProgress?: boolean): Observable<JobInformation>;
    public vERBATIMstatus_uuid(uuid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<JobInformation>>;
    public vERBATIMstatus_uuid(uuid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<JobInformation>>;
    public vERBATIMstatus_uuid(uuid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uuid === null || uuid === undefined) {
            throw new Error('Required parameter uuid was null or undefined when calling vERBATIMstatus_uuid.');
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
            'application/json'
        ];

        return this.httpClient.get<JobInformation>(`${this.basePath}/Runner/status/${encodeURIComponent(String(uuid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}