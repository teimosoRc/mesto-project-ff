import "./pages/index.css";

import {
  createCard,
  deleteCardHandler,
  handleLikeCard,
  cardList,
} from "./components/card.js";
import { cardData } from "./components/cards.js";
import { openModal, closeModal, handleModalClick } from "./components/modal.js";

import avatar from "./images/avatar.jpg";

const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

//форма профиля
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const descriptionInput = editProfileForm.elements.description;

// форма новой карточки
const newPlaceForm = document.forms["new-place"];
const nameInputImage = newPlaceForm.elements["place-name"];
const linkInputImage = newPlaceForm.elements.link;

// кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// поля профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// модалки
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupImageCard = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

function displayCard(cardInit) {
  cardInit.forEach((card) => {
    const cardElement = createCard(
      card,
      deleteCardHandler,
      handleLikeCard,
      handleShowCard
    );
    cardList.appendChild(cardElement);
  });
}

function handleEditProfile() {
  openModal(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleAddCard() {
  openModal(popupNewCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closeModal(popupProfile);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const card = { name: nameInputImage.value, link: linkInputImage.value };
  const cardElement = createCard(
    card,
    deleteCardHandler,
    handleLikeCard,
    handleShowCard
  );

  cardList.prepend(cardElement);

  closeModal(popupNewCard);
  newPlaceForm.reset();
}

function handleShowCard(data) {
  openModal(popupImage);
  popupImageCard.src = data.link;
  popupImageCard.alt = data.name;
  popupCaption.textContent = data.name;
}

displayCard(cardData);

addCardButton.addEventListener("click", handleAddCard);
editProfileButton.addEventListener("click", handleEditProfile);

popupProfile.addEventListener("click", handleModalClick);
popupNewCard.addEventListener("click", handleModalClick);
popupImage.addEventListener("click", handleModalClick);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleCardFormSubmit);
