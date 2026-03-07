export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly traceId: string;

  constructor(message: string, traceId="n/a", statusCode = 500) {
    this.message = message;
    this.statusCode = statusCode;
    this.traceId = traceId;
  }
}
