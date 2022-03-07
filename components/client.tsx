import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { FiAtSign, FiBell, FiBox, FiFolder, FiHardDrive, FiTerminal, FiUser, FiWifi, FiX } from 'react-icons/fi';
import Spinner from 'react-spinners/BarLoader';

import { Client as ClientType } from "../types/client.type";
import { useKickClient } from '../hooks/useKickClient';
import styles from '../styles/Client.module.css';
import { usePingClient } from '../hooks/usePingClient';
import { useShell } from '../hooks/useShell';


export const Client: FC<ClientType> = (client) => {

  const [clientLogs, setClientLogs] = useState<string[]>([]);

  const [kickClient, kickLoading] = useKickClient(client.Id, setClientLogs);
  const [pingClient, pingLoading] = usePingClient(client.Id, setClientLogs);
  const [execute, initShell, shellLoading] = useShell(client.Id, setClientLogs);

  const [shellInitialized, setShellInitialized] = useState<boolean>(false);
  const [shellInput, setShellInput] = useState<string>('');

  const handleInitShell = async () => {
    const success = await initShell();
    setShellInitialized(success);
  };
  
  const handleShellInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShellInput(event.target.value);
  }

  const handleShellSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    setShellInput('');

    if (shellInput.trim() == '') {
      return setClientLogs((logs) => [...logs, '$ ']);
    }
    
    execute(shellInput);
  }

  return (
    <div className={styles.client}>
      <div className={styles.infoAndOptions}>
        <FiBox
          className={styles.boxIcon}
          size={45}
        />
        <div className={styles.info}>
          <div className={styles.oneInfo} title='IP Address'>
            <FiWifi
              className={styles.icon}
              size={20}
            />
            <span>{client.Info.LocalAddress}</span>
          </div>
          <div className={styles.oneInfo} title='Username'>
            <FiUser
              className={styles.icon}
              size={20}
            />
            <span>{client.Info.Username}</span>
          </div>
          <div className={styles.oneInfo} title='Name'>
            <FiAtSign
              className={styles.icon}
              size={20}
            />
            <span>{client.Info.Name}</span>
          </div>
          <div className={styles.oneInfo} title='Operating System'>
            <FiHardDrive
              className={styles.icon}
              size={20}
            />
            <span>{client.Info.Os}</span>
          </div>
          <div className={styles.oneInfo} title='Home Directory'>
            <FiFolder
              className={styles.icon}
              size={20}
            />
            <span>{client.Info.HomeDir}</span>
          </div>
        </div>
        <div className={styles.options}>
          {!pingLoading
          ? <FiBell
              className={styles.optionIcon}
              size={30}
              onClick={pingClient}
              title='Ping this client.'
            />
          : <Spinner
              width={30}
              color='#e9967a'
            />
          }
          {!shellLoading
          ? <FiTerminal
              className={styles.optionIcon}
              size={30}
              onClick={handleInitShell}
              title='Initialize a shell.'
            />
          : <Spinner
              width={30}
              color='#e9967a'
            />
          }
          {!kickLoading
          ? <FiX
              className={styles.optionIcon}
              size={30}
              onClick={kickClient}
              title='Kick this client.'
            />
          : <Spinner
              width={30}
              color='#e9967a'
            />
          }
        </div>
      </div>
      <div className={styles.clientLog} style={{ display: clientLogs.length == 0 ? 'none': 'flex' }}>
        {clientLogs.map((log, i) => {
          return (
            <span key={i}>{log}</span>
          );
        })}
        <form
          onSubmit={handleShellSubmit}
          style={{ display: shellInitialized ? 'unset': 'none' }}
        >
          <label>
            $ 
            <input
              className={styles.shellInput}
              value={shellInput}
              onChange={handleShellInputChange}
              style={{ display: shellInitialized ? 'unset': 'none' }}
            />
          </label>
        </form>
      </div>
      
    </div>
  )
}