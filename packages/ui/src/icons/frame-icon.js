/** @jsx h */
import { h } from 'preact'
import styles from './svg.scss'

export const frameIcon = (
  <svg class={styles.svg}>
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M6 2.5H5V5H2.5v1H5v4H2.5v1H5v2.5h1V11h4v2.5h1V11h2.5v-1H11V6h2.5V5H11V2.5h-1V5H6V2.5zM6 6v4h4V6H6z'
    />
  </svg>
)
