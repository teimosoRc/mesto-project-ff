import "./pages/index.css";

import { createCard } from "./components/card.js";
import { cardData } from "./components/cards.js";
import { openModal, closeModal, handleModalClick } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  createCardApi,
  likeCard,
  unLikeCard,
  getUser,
  editProfileUser,
  deleteCard,
  updateUserAvatar,
} from "./components/api.js";

const cardElement = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
//форма профиля
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const descriptionInput = editProfileForm.elements.description;
const profileFormSubmitButton = editProfileForm.querySelector(".popup__button");

// форма новой карточки
const newPlaceForm = document.forms["new-place"];
const nameInputImage = newPlaceForm.elements["place-name"];
const linkInputImage = newPlaceForm.elements.link;
const cardFormSubmitButton = newPlaceForm.querySelector(".popup__button");

// кнопки
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileImageButton = document.querySelector(".profile__image");
const profileImage = document.querySelector(".profile__image");

// поля профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// форма аватара
const profileImageForm = document.forms["edit-avatar"];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton =
  profileImageForm.querySelector(".popup__button");

// модалки
const popupProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatarProfile = document.querySelector(".popup_type_edit-avatar");

const popupImageCard = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function setUserInfo({ name, about, avatar }) {
  profileName.textContent = name;
  profileDescription.textContent = about;
  profileImageButton.style.backgroundImage = `url(${avatar})`;
}

function handleEditProfile() {
  openModal(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
}

function handleAddCard() {
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupNewCard);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });

  editProfileUser({
    name: nameInput.value,
    about: descriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setUserInfo({
        name,
        about,
        avatar,
      });

      closeModal(popupProfile);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileFormSubmitButton,
        isLoading: false,
      });
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderLoading({
    buttonElement: cardFormSubmitButton,
    isLoading: true,
  });

  createCardApi({
    name: nameInputImage.value,
    link: linkInputImage.value,
  })
    .then((cardData) => {
      cardList.prepend(
        createCard({
          data: cardData,
          onDelete: deleteCardHandler,
          onLike: handleLikeCard,
          onImageClick: handleShowCard,
          currentUserId: cardData.owner["_id"],
          template: cardElement,
        })
      );
      closeModal(popupNewCard);
      newPlaceForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: false,
      });
    });
}

function handleShowCard(data) {
  openModal(popupImage);
  popupImageCard.src = data.link;
  popupImageCard.alt = data.name;
  popupCaption.textContent = data.name;
}

function deleteCardHandler({ cardId, buttonElement }) {
  deleteCard(cardId);
}

function handleLikeCard({ cardId, buttonElement, counterElement }) {
  buttonElement.disabled = true;
  const isActiveLike = buttonElement.classList.contains(
    "card__like-button_is-active"
  );

  if (isActiveLike) {
    unLikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove("card__like-button_is-active");

        if (likes.length) {
          counterElement.classList.add("card__like-counter_is-active");
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove("card__like-counter_is-active");
          counterElement.textContent = "";
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        buttonElement.disabled = false;
      });
  } else {
    likeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add("card__like-button_is-active");

        counterElement.classList.add("card__like-counter_is-active");
        counterElement.textContent = likes.length;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        buttonElement.disabled = false;
      });
  }
}

const handleProfileImageFormSubmit = (event) => {
  event.preventDefault();

  renderLoading({
    buttonElement: profileImageFormSubmitButton,
    isLoading: true,
  });

  updateUserAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setUserInfo({
        name,
        description: about,
        avatar,
      });

      closeModal(popupAvatarProfile);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: false,
      });
    });
};

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};

const handleProfileImageClick = () => {
  profileImageForm.reset();

  clearValidation(profileImageForm, validationConfig);

  openModal(popupAvatarProfile);
};

addCardButton.addEventListener("click", handleAddCard);
editProfileButton.addEventListener("click", handleEditProfile);
profileImage.addEventListener("click", handleProfileImageClick);

popupProfile.addEventListener("click", handleModalClick);
popupNewCard.addEventListener("click", handleModalClick);
popupImage.addEventListener("click", handleModalClick);
popupAvatarProfile.addEventListener("click", handleModalClick);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
newPlaceForm.addEventListener("submit", handleCardFormSubmit);
profileImageForm.addEventListener("submit", handleProfileImageFormSubmit);

enableValidation(validationConfig);

Promise.all([getUser(), getInitialCards()])
  .then(([{ name, about, avatar, ["_id"]: currentUserId }, cardsData]) => {
    setUserInfo({
      name,
      about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardList.append(
        createCard({
          currentUserId,
          data: cardData,
          onDelete: deleteCardHandler,
          onLike: handleLikeCard,
          onImageClick: handleShowCard,
          template: cardElement,
        })
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
