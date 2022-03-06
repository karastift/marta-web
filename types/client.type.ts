import { Conn } from "./conn.type";
import { Info } from "./info.type";

export interface Client {
  Id: string;
  Conn: Conn;
  TimeoutCount: number;
  Info: Info;
}
