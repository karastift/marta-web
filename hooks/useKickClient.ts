import { Dispatch, SetStateAction, useState } from "react";
import { fetcher } from "../helpers/fetcher";
import { KickResponse } from "../types/apiResponses.type";

type useKickClientType = (clientId: string, setLog: Dispatch<SetStateAction<string[]>>) => [() => void, boolean, boolean];

export const useKickClient: useKickClientType = (clientId, setLog) => {

  const [kicked, setKicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const kickClient = () => {

    setLoading(true);

    fetcher<KickResponse>('http://127.0.0.1:8080/kick', {
      method: 'POST',
      body: JSON.stringify({
        clientId,
      }),
    }).then((j) => {

      setKicked(j.data);

      const time = new Date().toLocaleString();

      if (j.data) {
        setLog(currLogs => {
          return [...currLogs, time + ' Client was kicked. It will be removed from this list in a few seconds.'];
        });
      } else {
        setLog(currLogs => {
          return [...currLogs, time + ' Could not kick this client for some reason.'];
        });
      }

      setLoading(false);
    });
  };
  
  return [kickClient, loading, kicked];
};