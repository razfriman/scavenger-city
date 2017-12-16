export class ApiResponse<T = any> {
  statusCode: number;
  message: number;
  data: T;
}
