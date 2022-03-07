import { Dispatch, SetStateAction, useState } from "react";

type usePingClientType = (clientId: string, setLog: Dispatch<SetStateAction<string[]>>) => [() => void, boolean, boolean];

export const usePingClient: usePingClientType = (clientId, setLog) => {

  const [responded, setResponded] = useState(false);
  const [loading, setLoading] = useState(false);

  const pingClient = () => {

    setLoading(true);

    fetch('http://127.0.0.1:8080/ping', {
      method: 'POST',
      body: clientId + '\n',
    }).then((res) => res.json().then(v => {

      if (typeof v === 'boolean') {
        setResponded(v);

        const time = new Date().toLocaleString();

        if (v) {
          setLog(currLogs => {
            return [...currLogs, time + ' Client did respond.'];
          });
        } else {
          setLog(currLogs => {
            return [...currLogs, time + ' Client did not respond.'];
          });
        }

      }

      setLoading(false);
    }));
  };
  
  return [pingClient, loading, responded];
};