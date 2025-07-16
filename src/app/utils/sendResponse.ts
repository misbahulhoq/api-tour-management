import { Response } from "express";

interface IMeta {
  total: number;
}
interface IResponse<Data> {
  statusCode: number;
  success: boolean;
  message: string;
  data: Data;
  meta?: IMeta;
}

export function sendResponse<Data>(res: Response, data: IResponse<Data>) {
  return res.status(data.statusCode).send(data);
}
export default sendResponse;
