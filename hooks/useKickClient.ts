import { Dispatch, SetStateAction, useState } from "react";

type useKickClientType = (clientId: string, setLog: Dispatch<SetStateAction<string[]>>) => [() => void, boolean, boolean];

export const useKickClient: useKickClientType = (clientId, setLog) => {

  const [kicked, setKicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const kickClient = () => {

    setLoading(true);

    fetch('http://127.0.0.1:8080/kick', {
      method: 'POST',
      body: clientId + '\n',
    }).then((res) => res.json().then(v => {

      if (typeof v === 'boolean') {
        setKicked(v);

        const time = new Date().toLocaleString();

        if (v) {
          setLog(currLogs => {
            return [...currLogs, time + ' Client was kicked. It will be removed from this list in a few seconds.'];
          });
        } else {
          setLog(currLogs => {
            return [...currLogs, time + ' Could not kick this client for some reason.'];
          });
        }
      }

      setLoading(false);
    }));
  };
  
  return [kickClient, loading, kicked];
};