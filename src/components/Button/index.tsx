import React from 'react';
import styles from './index.module.css';

type ButtonProps = {
  onClick: any;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button className={styles.button} onClick={onClick}>{text}</button>
  )
}

export default Button;