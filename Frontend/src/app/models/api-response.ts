export class ApiResponse<T = any> {
  statusCode: number;
  data: T;
}
