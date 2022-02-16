'use strict';
(function () {
  window.pin.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var endCoords = {
        x: window.pin.mainPin.offsetLeft - shift.x,
        y: window.pin.mainPin.offsetTop - shift.y
      };

      if (endCoords.x < 0 || endCoords.x > (window.pin.mapBox.width - window.pin.pinBox.width) || endCoords.y < 0 || endCoords.y > (window.pin.mapBox.height - window.pin.pinBox.height) - 60) {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      } else {
        window.pin.mainPin.style.top = endCoords.y + 'px';
        window.pin.mainPin.style.left = endCoords.x + 'px';
        window.form.fillAddress();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
