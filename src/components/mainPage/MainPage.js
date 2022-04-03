import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth } from 'utils/auth';
import styles from './MainPage.module.css';
import { Rate } from './Rate';

export const MainPage = ({ products }) => {
  const { productId } = useParams();
  const product = products ? products.find(prod => prod.id === parseInt(productId)) : null;

  const [reviews, setReviews] = useState();
  const [rate, setRate] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    axios.get(`https://smktesting.herokuapp.com/api/reviews/${productId}`).then(response => setReviews(response.data));
  }, [productId]);

  const postReview = () => {
    const token = auth.get().token;
    axios
      .post(
        `https://smktesting.herokuapp.com/api/reviews/${productId}`,
        {
          rate,
          text: reviewText,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        axios.get(`https://smktesting.herokuapp.com/api/reviews/${productId}`).then(response => {
          setReviews(response.data);
          setRate(0);
          setReviewText('')
        });
      });
  };

  return (
    <div>
      <div className={styles.info}>
        {products ? (
          <div className={styles.mainInfo}>
            <p className={styles.name}>{product.title}</p>
            <hr />
            <img src={`http://smktesting.herokuapp.com/static/${product.img}`} alt="product" />
            <p className={styles.name}>Product description</p>
            <hr />
            <p className={styles.description}>{product.text}</p>
          </div>
        ) : null}

        <div className={styles.reviews}>
          <span>
            Rate: <Rate rate={rate} setRate={setRate} />
          </span>
          <br />
          <textarea
            className={styles.reviewInput}
            placeholder="Type your review"
            rows="4"
            cols="40"
            value={reviewText}
            onChange={({ target }) => setReviewText(target.value)}
          />
          <br />
          <button className={styles.submitButton} onClick={postReview}>
            Submit review
          </button>
          <p className={styles.name}>Reviews</p>
          <ul className={styles.reviews}>
            {reviews
              ? reviews.map(review => (
                  <li className={styles.review} key={review.id}>
                    <p className={styles.username}>
                      {review.created_by.username} at {review.created_at}
                    </p>
                    <p className={styles.rate}>Rate: {review.rate}</p>
                    <p className={styles.comment}>Comment: {review.text}</p>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
};
