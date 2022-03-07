import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";
import { UseClientListResponse } from "../types/apiResponses.type";

export const useClientList: () => [UseClientListResponse, boolean] = () => {

  const { data, error } = useSWR<UseClientListResponse>('http://127.0.0.1:8080/list', fetcher, { refreshInterval: 5 });

  return [data ?? { data: [], error: undefined }, data == undefined || error != undefined];
};