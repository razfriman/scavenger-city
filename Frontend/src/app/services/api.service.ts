import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private API_BASE = 'http://api.razfriman.com';

  constructor(private httpClient: HttpClient) {
  }

  public login(email: string, password: string) {
    return this.httpClient.post(`${this.API_BASE}/account/login`, {
      email: email,
      password: password
    });
  }

  public getHunts() {
    return this.httpClient.get(`${this.API_BASE}/hunts`);
  }

  public getHunt(id: number) {
    return this.httpClient.get(`${this.API_BASE}/hunts/${id}`);
  }

  public getInstances() {
    return this.httpClient.get(`${this.API_BASE}/hunt-instances/`);
  }

  public getInstance(id: number) {
    return this.httpClient.get(`${this.API_BASE}/hunt-instances/${id}`);
  }

  public skip(id: number) {
    return this.httpClient.post(`${this.API_BASE}/hunt-instances/${id}/skip`, {});
  }

  public hint(id: number) {
    return this.httpClient.post(`${this.API_BASE}/hunt-instances/${id}/hint`, {});
  }

  public submitAnswer(id: number, value: string) {
    return this.httpClient.post(`${this.API_BASE}/hunt-instances/${id}/answer`, {value: value});
  }

  public start(id: number) {
    return this.httpClient.post(`${this.API_BASE}/hunt-instances/${id}/start`, {});
  }

  public purchase(id: number) {
    return this.httpClient.post(`${this.API_BASE}/hunt-instances/purchase/hunts/${id}`, {});
  }
}
