import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some(
    (id) => currentUser?._id && id === currentUser._id
  );

  const handleCardClick = () => {
    console.log("card clicked");
    onCardClick(item);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__top-row">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            type="button"
            onClick={handleLikeClick}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
