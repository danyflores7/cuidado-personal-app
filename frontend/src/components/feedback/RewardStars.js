// src/components/feedback/RewardStars.js
import React from 'react';
import styles from '../../styles/utils/RewardStars.module.scss';
import estrella from '../../assets/estrella.png';
import starFx from '../../assets/audio/ui/star.mp3';


export default function RewardStars() {
  return (
    <img
      src={estrella}
      alt="star"
      className={styles.star}
      
    />
  );
}
