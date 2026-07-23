import { Response, Request } from "express";

export interface expressDTO {
  res: Response;
  req: Request;
}
