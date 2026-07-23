export class ErrorServidor extends Error {
  constructor(messagem: string, status: number) {
    super(messagem);
  }
}
