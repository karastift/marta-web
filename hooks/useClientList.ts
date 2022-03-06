import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";
import { Client } from "../types/client.type";

export const useClientList: () => [Client[], boolean] = () => {

  const { data, error } = useSWR('http://127.0.0.1:8080/list', fetcher, { refreshInterval: 5,  });

  return [data ?? [], data == undefined || error != undefined]
};