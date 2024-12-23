export function createCard({
  data,
  onDelete,
  onLike,
  currentUserId,
  onImageClick,
  template,
}) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  const cardLike = cardElement.querySelector(".card__like-button");
  const imgCard = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const counter = cardElement.querySelector(".card__like-counter");

  imgCard.src = data.link;
  imgCard.alt = data.name;
  cardTitle.textContent = data.name;

  if (data.likes.length) {
    counter.classList.add("card__like-counter_is-active");
    counter.textContent = data.likes.length;
  }

  if (data.likes.find((owner) => owner["_id"] === currentUserId)) {
    cardLike.classList.add("card__like-button_is-active");
  }

  cardLike.addEventListener("click", (evt) => {
    onLike({
      cardId: data["_id"],
      buttonElement: cardLike,
      counterElement: counter,
    });
  });

  imgCard.addEventListener("click", (evt) => {
    const data = { name: evt.target.alt, link: evt.target.src };
    onImageClick(data);
  });

  if (data.owner["_id"] === currentUserId) {
    deleteCardButton.classList.add("card__delete-button_is-active");
    deleteCardButton.addEventListener("click", () => {
      onDelete({
        cardId: data["_id"],
        cardElement: cardElement,
        buttonElement: deleteCardButton,
      });
    });
  }

  return cardElement;
}
