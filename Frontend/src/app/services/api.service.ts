import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { Hunt } from '../models/hunt';
import { HuntInstance } from '../models/hunt-instance';
import { AnswerInstance } from '../models/answer-instance';
import { Hint } from '../models/hint';
import { PurchaseRequest } from 'app/models/purchase-request';
import { AnswerSubmission } from 'app/models/answer-submission';
import { LoginRequest } from 'app/models/login-request';

@Injectable()
export class ApiService {

  public static API_BASE = 'https://api.scavenger.city';

  constructor(private httpClient: HttpClient) {
  }

  public login(request: LoginRequest) {
    return this.httpClient.post<ApiResponse>(`${ApiService.API_BASE}/account/login`, request);
  }

  public signUp(request: LoginRequest) {
    return this.httpClient.post<ApiResponse>(`${ApiService.API_BASE}/account/register`, request);
  }

  public getHunts() {
    return this.httpClient.get<ApiResponse<Hunt[]>>(`${ApiService.API_BASE}/hunts`);
  }

  public getHunt(id: number) {
    return this.httpClient.get<ApiResponse<Hunt>>(`${ApiService.API_BASE}/hunts/${id}`);
  }

  public getInstances() {
    return this.httpClient.get<ApiResponse<HuntInstance[]>>(`${ApiService.API_BASE}/hunt-instances/`);
  }

  public getInstance(id: number) {
    return this.httpClient.get<ApiResponse<HuntInstance>>(`${ApiService.API_BASE}/hunt-instances/${id}`);
  }

  public getSharedInstance(id: string) {
    return this.httpClient.get<ApiResponse<HuntInstance>>(`${ApiService.API_BASE}/hunt-instances/shared/${id}`);
  }

  public joinSharedInstance(id: string) {
    return this.httpClient.post<ApiResponse>(`${ApiService.API_BASE}/hunt-instances/shared/${id}/join`, {});
  }

  public skip(id: number) {
    return this.httpClient.post<ApiResponse<AnswerInstance>>(`${ApiService.API_BASE}/hunt-instances/${id}/skip`, {});
  }

  public hint(id: number) {
    return this.httpClient.post<ApiResponse<Hint>>(`${ApiService.API_BASE}/hunt-instances/${id}/hint`, {});
  }

  public submitAnswer(id: number, answerSubmission: AnswerSubmission) {
    return this.httpClient.post<ApiResponse<AnswerInstance>>(`${ApiService.API_BASE}/hunt-instances/${id}/submit`, answerSubmission);
  }

  public start(id: number) {
    return this.httpClient.post<ApiResponse<HuntInstance>>(`${ApiService.API_BASE}/hunt-instances/${id}/start`, {});
  }

  public purchase(id: number, purchaseRequest: PurchaseRequest) {
    return this.httpClient.post<ApiResponse<HuntInstance>>(`${ApiService.API_BASE}/hunts/${id}/purchase`, purchaseRequest);
  }
}
