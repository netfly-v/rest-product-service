import { reviewsAPI } from 'api/reviews';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { productsSelector } from 'store/state/products/selectors';
import { auth } from 'utils/auth';
import { ROUTES } from 'utils/routes';
import styles from './MainPage.module.css';
import { Rate } from './Rate';

const MainPage = ({ products }) => {
  const { productId } = useParams();
  const product = products.length ? products.find(prod => prod.id === parseInt(productId)) : null;

  const [reviews, setReviews] = useState();
  const [rate, setRate] = useState(0);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    reviewsAPI.getReviews(productId).then(data => setReviews(data));
  }, [productId]);

  const navigate = useNavigate();

  const postReview = () => {
    if (auth.get() && auth.get().token) {
      reviewsAPI
        .postReview(
          productId,
          {
            rate,
            text: reviewText,
          },
          {
            headers: {
              Authorization: `Token ${auth.get().token}`,
            },
          }
        )
        .then(() => {
          reviewsAPI.getReviews(productId).then(data => {
            setReviews(data);
            setRate(0);
            setReviewText('');
          });
        });
    } else {
      navigate(ROUTES.REGISTRATION_PAGE);
    }
  };

  const getParsedDate = date => {
    const parsedDate = new Date(date);
    return parsedDate.toUTCString();
  };

  return (
    <div>
      <div className={styles.info}>
        {products.length ? (
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
                      {review.created_by.username} at {getParsedDate(review.created_at)}
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

const mapStateToProps = state => ({
  products: productsSelector(state),
});

export default connect(mapStateToProps)(MainPage);
