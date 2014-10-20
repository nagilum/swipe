/**
 * @file
 * Enable pure swipe functionality attached to elements.
 *
 * @author
 * Stian Hanger (pdnagilum@gmail.com)
 */

var swipeData = {};

/**
 * Attach swipe events to element with given ID.
 *
 * @param string id
 *   The ID of the element to attach too.
 * @param int fingerCount
 *   The number of fingers to track for this particular event. Use null to
 *   disable tracking of count.
 * @param function callback
 *   Callback function when a swipe event takes place on the element. Arguments
 *   for the callback function are: id (string), and direction (string).
 * @param bool preventDefault
 *   Set whether or not the default behaviour of the touch events should pass
 *   through to event handling.
 */
function attachSwipe(id, fingerCount, callback, preventDefault) {
  var element = document.getElementById(id);

  if (element && typeof callback == 'function') {
    swipeData[id] = {
      callback: callback,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      swipeLength: 0,
      minimumSwipeLength: 72,
      fingerCount: 0,
      trackFingerCount: fingerCount,
      preventDefault: preventDefault
    };

    element.setAttribute('ontouchstart', 'touchStart(event, id);');
    element.setAttribute('ontouchend',   'touchEnd(event, id);');
    element.setAttribute('ontouchmove',  'touchMove(event, id);');
  }
}

/**
 * Record the initial touch position.
 *
 * @param event event
 *   The touch even to track.
 * @param string id
 *   The ID of the element to track.
 */
function touchStart(event, id) {
  if (swipeData[id].preventDefault)
    event.preventDefault();

  swipeData[id].fingerCount = event.touches.length;

  var trackEvent = (swipeData[id].trackFingerCount === null ?
    true :
    (swipeData[id].fingerCount === swipeData[id].trackFingerCount));

  if (trackEvent) {
    swipeData[id].startX = event.touches[0].pageX;
    swipeData[id].startY = event.touches[0].pageY;
  }
  else {
    resetTouch(id);
  }
}

/**
 * Calculates the touch direction and calls the callback.
 *
 * @param event event
 *   The touch even to track.
 * @param string id
 *   The ID of the element to track.
 */
function touchEnd(event, id) {
  if (swipeData[id].preventDefault)
    event.preventDefault();

  var trackEvent = (swipeData[id].trackFingerCount === null ?
    true :
    (swipeData[id].fingerCount === swipeData[id].trackFingerCount));

  if (trackEvent &&
      swipeData[id].currentX != 0) {
    swipeData[id].swipeLength = Math.round(Math.sqrt(Math.pow(swipeData[id].currentX - swipeData[id].startX, 2) + Math.pow(swipeData[id].currentY - swipeData[id].startY, 2)));

    if (swipeData[id].swipeLength >= swipeData[id].minimumSwipeLength) {
      var x         = swipeData[id].startX - swipeData[id].currentX,
          y         = swipeData[id].currentY - swipeData[id].startY,
          r         = Math.atan2(y, x),
          angle     = Math.round(r * 180 / Math.PI),
          direction = '';

      if (angle < 0)
        angle = 360 - Math.abs(angle);

      if (angle <= 45 && angle >= 0) { direction = 'left'; }
      else if (angle <= 360 && angle >= 315) { direction = 'left'; }
      else if (angle >= 135 && angle <= 255) { direction = 'right'; }
      else if (angle > 45 && angle < 135) { direction = 'down'; }
      else { direction = 'up'; }

      if (swipeData[id].fingerCount > 0)
        swipeData[id].callback(id, direction, swipeData[id].fingerCount);
    }
  }

  resetTouch(id);
}

/**
 * Updates the current position of the touch.
 *
 * @param event event
 *   The touch even to track.
 * @param string id
 *   The ID of the element to track.
 */
function touchMove(event, id) {
  if (swipeData[id].preventDefault)
    event.preventDefault();

  var trackEvent = (swipeData[id].trackFingerCount === null ?
    true :
    (swipeData[id].fingerCount === swipeData[id].trackFingerCount));

  if (trackEvent) {
    swipeData[id].currentX = event.touches[0].pageX;
    swipeData[id].currentY = event.touches[0].pageY;
  }
  else {
    resetTouch(id);
  }
}

/**
 * Resets all touch variables used, making it ready for a new event.
 *
 * @param string id
 *   The ID of the element to reset.
 */
function resetTouch(id) {
  swipeData[id].startX = 0;
  swipeData[id].startY = 0;
  swipeData[id].currentX = 0;
  swipeData[id].currentY = 0;
  swipeData[id].swipeLength = 0;
  swipeData[id].fingerCount = 0;
}
