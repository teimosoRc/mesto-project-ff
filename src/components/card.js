const templateCard = document.querySelector("#card-template").content;
export const cardList = document.querySelector(".places__list");

export function createCard(
  cardData,
  deleteCallback,
  handleLikeCard,
  handleShowCard
) {
  const cardElement = templateCard
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  const cardLike = cardElement.querySelector(".card__like-button");
  const imgCard = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteCardButton.addEventListener("click", () => deleteCallback(cardElement));

  cardLike.addEventListener("click", handleLikeCard);
  imgCard.addEventListener("click", (evt) => {
    const data = { name: evt.target.alt, link: evt.target.src };
    handleShowCard(data);
  });

  return cardElement;
}

export function deleteCardHandler(cardElement) {
  cardElement.remove();
}

export function handleLikeCard(evt) {
  //так как я понимаю кол-во лайков и кто поставил должно хранится на сервере и при загрузке стр получать их от туда пока решение такое
  evt.target.classList.toggle("card__like-button_is-active");
}
