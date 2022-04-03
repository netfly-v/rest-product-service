import { useEffect, useState } from 'react';
import styles from './Rate.module.css';

export const Rate = ({ rate, setRate }) => {
  const [hover, setHover] = useState(rate);
  useEffect(() => {
    setHover(rate);
  }, [rate]);

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rate) ? styles.on : styles.off}
            onClick={() => setRate(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rate)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
