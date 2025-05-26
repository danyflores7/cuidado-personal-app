// src/components/feedback/RewardStars.js
import React from 'react';
import styles from '../../styles/utils/RewardStars.module.scss';
import estrella from '../../assets/estrella.png';

export default function RewardStars() {
  return (
    <img
      src={estrella}
      alt="star"
      className={styles.star}
    />
  );
}
