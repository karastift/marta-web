import { FC } from "react"
import { FiBox, FiWifi, FiUser, FiAtSign, FiHardDrive, FiFolder } from 'react-icons/fi'

import { Client as ClientType } from "../types/client.type"
import styles from '../styles/Client.module.css'

export const Client: FC<ClientType> = (client) => {

  return (
    <div className={styles.client}>
      <FiBox
        className={styles.boxIcon}
        size={45}
      />
      <div className={styles.info}>
        <div className={styles.oneInfo}>
          <FiWifi
            className={styles.icon}
            size={20}
          />
          <span>{client.Info.LocalAddress}</span>
        </div>
        <div className={styles.oneInfo}>
          <FiUser
            className={styles.icon}
            size={20}
          />
          <span>{client.Info.Username}</span>
        </div>
        <div className={styles.oneInfo}>
          <FiAtSign
            className={styles.icon}
            size={20}
          />
          <span>{client.Info.Name}</span>
        </div>
        <div className={styles.oneInfo}>
          <FiHardDrive
            className={styles.icon}
            size={20}
          />
          <span>{client.Info.Os}</span>
        </div>
        <div className={styles.oneInfo}>
          <FiFolder
            className={styles.icon}
            size={20}
          />
          <span>{client.Info.HomeDir}</span>
        </div>
      </div>
    </div>
  )
}