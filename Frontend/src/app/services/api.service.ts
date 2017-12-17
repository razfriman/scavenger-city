import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { Hunt } from '../models/hunt';
import { HuntInstance } from '../models/hunt-instance';
import { AnswerInstance } from '../models/answer-instance';
import { Hint } from '../models/hint';

@Injectable()
export class ApiService {

  private API_BASE = 'http://api.razfriman.com';

  constructor(private httpClient: HttpClient) {
  }

  public login(email: string, password: string) {
    return this.httpClient.post<ApiResponse>(`${this.API_BASE}/account/login`, {
      email: email,
      password: password
    });
  }

  public signUp(email: string, password: string) {
    return this.httpClient.post<ApiResponse>(`${this.API_BASE}/account/register`, {
      email: email,
      password: password
    });
  }

  public getHunts() {
    return this.httpClient.get<ApiResponse<Hunt[]>>(`${this.API_BASE}/hunts`);
  }

  public getHunt(id: number) {
    return this.httpClient.get<ApiResponse<Hunt>>(`${this.API_BASE}/hunts/${id}`);
  }

  public getInstances() {
    return this.httpClient.get<ApiResponse<HuntInstance[]>>(`${this.API_BASE}/huntInstances/`);
  }

  public getInstance(id: number) {
    return this.httpClient.get<ApiResponse<HuntInstance>>(`${this.API_BASE}/huntInstances/${id}`);
  }

  public skip(id: number) {
    return this.httpClient.post<ApiResponse<AnswerInstance>>(`${this.API_BASE}/huntInstances/${id}/skip`, {});
  }

  public hint(id: number) {
    return this.httpClient.post<ApiResponse<Hint>>(`${this.API_BASE}/huntInstances/${id}/hint`, {});
  }

  public submitAnswer(id: number, value: string) {
    return this.httpClient.post<ApiResponse<AnswerInstance>>(`${this.API_BASE}/huntInstances/${id}/answer`, { value: value });
  }

  public start(id: number) {
    return this.httpClient.post<ApiResponse<HuntInstance>>(`${this.API_BASE}/huntInstances/${id}/start`, {});
  }

  public purchase(id: number) {
    return this.httpClient.post<ApiResponse<HuntInstance>>(`${this.API_BASE}/hunts/${id}/purchase`, {});
  }
}
