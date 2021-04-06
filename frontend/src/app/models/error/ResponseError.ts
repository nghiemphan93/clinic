export class ResponseError {
  timestamp: Date;
  status: string;
  message: string;
  debugMessage: string;

  constructor(
    timestamp: Date,
    status: string,
    message: string,
    debugMessage: string
  ) {
    this.timestamp = timestamp;
    this.status = status;
    this.message = message;
    this.debugMessage = debugMessage;
  }
}
