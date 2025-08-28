export class ErrorHandler extends Error {
  constructor(
    msg: string,
    public status: number | 201 | 200 | 400,
  ) {
    super(msg);
    this.status = status;
  }
}
