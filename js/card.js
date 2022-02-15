'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(cardElement);
  var popup = cardFragment.querySelector('.popup');

  var popupCloseButton = cardFragment.querySelector('.popup__close');
  popup.classList.add('hidden');
  var renderCard = function (element) {
    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
    switch (element.offer.type) {
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;
    }
    cardElement.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ' , выезд до ' + element.offer.checkout;
    var featureListFragment = document.createDocumentFragment();
    var featureList = cardElement.querySelector('.popup__features').cloneNode();
    for (var i = 0; i < element.offer.features.length; i++) {
      var featureListElement = cardElement.querySelector('.popup__feature').cloneNode(true);
      featureListElement.className = 'popup__feature';
      featureListElement.classList.add('popup__feature--' + element.offer.features[i]);
      featureList.appendChild(featureListElement);
    }
    featureListFragment.appendChild(featureList);
    cardElement.querySelector('.popup__features').replaceWith(featureListFragment);
    cardElement.querySelector('.popup__description').textContent = element.offer.description;

    var photoFragment = document.createDocumentFragment();
    var photoContainer = cardElement.querySelector('.popup__photos').cloneNode(true);
    while (photoContainer.firstChild) {
      photoContainer.removeChild(photoContainer.firstChild);
    }
    for (var j = 0; j < element.offer.photos.length; j++) {
      var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);

      photoContainer.appendChild(photoElement);
      photoContainer.children[j].src = element.offer.photos[j];
    }
    photoFragment.appendChild(photoContainer);
    cardElement.querySelector('.popup__photos').replaceWith(photoFragment);
    cardElement.querySelector('.popup__avatar').src = element.author.avatar;
    cardElement.classList.add('hidden');
    return cardElement;
  };

  window.card = {
    popupCloseButton: popupCloseButton,
    renderCard: renderCard,
    popup: popup,
    cardFragment: cardFragment,
  };
})();
