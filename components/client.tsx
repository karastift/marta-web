import { FC, useState } from 'react';
import { FiAtSign, FiBell, FiBox, FiFolder, FiHardDrive, FiTerminal, FiUser, FiWifi, FiX } from 'react-icons/fi';

import styles from '../styles/Client.module.css';
import { Client as ClientType } from "../types/client.type";


export const Client: FC<ClientType> = (client) => {
  return (
    <div className={styles.client}>
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
        <FiBell
          className={styles.optionIcon}
          size={30}
          onClick={() => console.log('ping')}
          title='Ping this client.'
        />
        <FiTerminal
          className={styles.optionIcon}
          size={30}
          onClick={() => console.log('init shell')}
          title='Initialize a shell.'
        />
        <FiX
          className={styles.optionIcon}
          size={30}
          onClick={() => console.log('kick')}
          title='Kick this client.'
        />
      </div>
    </div>
  )
}