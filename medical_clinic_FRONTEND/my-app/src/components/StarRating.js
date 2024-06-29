import React, {useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';

const StarRating = ({onRatingChange, rating: initialRating, editable}) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleRatingChange = (ratingValue) => {
        if (editable) {
            setRating(ratingValue);
            onRatingChange(ratingValue);
        }
    };

    return (<div style={{display: 'flex', justifyContent: 'center'}}>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (<label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => handleRatingChange(ratingValue)}
                            style={{display: 'none'}}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={30}
                            onMouseEnter={() => editable && setHover(ratingValue)}
                            onMouseLeave={() => editable && setHover(null)}
                        />
                    </label>);
            })}
        </div>);
};

export default StarRating;
