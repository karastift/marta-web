import { Dispatch, SetStateAction, useState } from "react";
import { fetcher } from "../helpers/fetcher";
import { PingResponse } from "../types/apiResponses.type";

type usePingClientType = (clientId: string, setLog: Dispatch<SetStateAction<string[]>>) => [() => void, boolean, boolean];

export const usePingClient: usePingClientType = (clientId, setLog) => {

  const [responded, setResponded] = useState(false);
  const [loading, setLoading] = useState(false);

  const pingClient = () => {

    setLoading(true);

    fetcher<PingResponse>('http://127.0.0.1:8080/ping', {
      method: 'POST',
      body: JSON.stringify({
        clientId,
      }),
    }).then((j) => {

      setResponded(j.data);

      const time = new Date().toLocaleString();

      if (j.data) {
        setLog(currLogs => {
          return [...currLogs, time + ' Client did respond.'];
        });
      } else {
        setLog(currLogs => {
          return [...currLogs, time + ' Client did not respond.'];
        });
      }

      setLoading(false);
    });
  };
  
  return [pingClient, loading, responded];
};