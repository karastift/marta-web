import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useSWR from "swr"
import { fetcher } from "../helpers/fetcher";
import { InitShellResponse, ShellCommandResponse } from "../types/apiResponses.type";
import { Client } from "../types/client.type";

type useShellType = (clientId: string, setLog: Dispatch<SetStateAction<string[]>>) => [(command: string) => void, () => Promise<boolean>, boolean];

export const useShell: useShellType = (clientId, setLog) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  const initShell = async (): Promise<boolean> => {

    setLoading(true);

    return fetcher<InitShellResponse>('http://127.0.0.1:8080/initShell', {
      method: 'POST',
      body: JSON.stringify({
        clientId,
      }),
    }).then((j) => {

      console.log(j)

      setLoading(false);
      setInitialized(j.data);

      if (j.data) {
        setLog(currLogs => {
          const time = new Date().toLocaleString();
          return [...currLogs, time + ' Shell was initialized.'];
        });
      }

      return j.data;
    });
  };

  const execute = (command: string) => {

    if (!initialized) {
      return setLog(currLogs => {
        const time = new Date().toLocaleString();
        return [...currLogs, time + ' Did not execute command, because shell is not initialized.'];
      });
    };

    setLoading(true);

    fetcher<ShellCommandResponse>('http://127.0.0.1:8080/shellCmd', {
      method: 'POST',
      body: JSON.stringify({
        clientId,
        command,
      }),
    }).then((j) => {

      setLoading(false);

      console.log(j.data)

      setLog(currLogs => {
        return [...currLogs, '$ ' + command, j.data];
      });
    });
  };

  return [execute, initShell, loading]
};