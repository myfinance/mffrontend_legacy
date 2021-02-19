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
import { Instrument } from './instrument';
import { Transaction } from './transaction';


export interface Cashflow {
    cashflowid: number;
    instrument: Instrument;
    transaction?: Transaction;
    value: number;
    description?: string;
}
