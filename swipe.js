/**
 * @file
 * Enable pure swipe functionality attached to elements by ID.
 *
 * @author
 * Stian Hanger (pdnagilum@gmail.com)
 *
 * @usage
 * It's pretty simple to set up and use. You need a callback function which
 * will be called when the swipe is completed and you need an element to attach
 * the swipe too.
 *
 * You attach the swipe using this function:
 * attachSwipe(
 *   'id-of-element',
 *   number-of-fingers-to-track,
 *   callback-function-name,
 *   prevent-default-click/touch-behaviour);
 *
 * So a normal call would look something like this:
 * attachSwipe('mySwipeBox', 1, myCallback, false);
 *
 * Next you'll need the callback function for the swipe completed event. This
 * function takes 6 parameters:
 *   id (string),
 *   angle (int),
 *   length (int),
 *   direction (string),
 *   fingerCount (int), and
 *   element (element).
 *
 * ID is of course the ID of the element that was swiped on.
 * Angle is the overall degree angle of the swipe.
 * Length is the overall length of the swipe.
 * Direction is the direction of the swipe ('left', 'right', 'up', or 'down')
 * which is calculated from the angle.
 * FingerCount is the number of fingers used for the swipe.
 * Element is the element where the swipe originated.
 */

/**
 * @var
 * Array of elements to track swipe events for.
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
 * @param int minimumSwipeLength
 *   The minimum length before a swipe is recognized. Defaults to 72. Lower
 *   this to make detection more precise.
 */
function attachSwipe(id, fingerCount, callback, preventDefault, minimumSwipeLength) {
  var element = document.getElementById(id);

  if (element === null ||
      typeof element === 'undefined')
    throw 'Element with ID "' + id + '" could not be found!';

  if (typeof callback !== 'function')
    throw 'The callback argument must be a function!';

  if (isNaN(minimumSwipeLength))
    minimumSwipeLength = 72;

  swipeData[id] = {
    callback: callback,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    swipeLength: 0,
    minimumSwipeLength: minimumSwipeLength,
    fingerCount: 0,
    trackFingerCount: fingerCount,
    preventDefault: preventDefault,
    attached: false
  };

  element.setAttribute('ontouchstart', 'touchStart(event, id);');
  element.setAttribute('ontouchend',   'touchEnd(event, id);');
  element.setAttribute('ontouchmove',  'touchMove(event, id);');

  swipeData[id].attached = true;
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
      var x              = swipeData[id].startX - swipeData[id].currentX,
          y              = swipeData[id].currentY - swipeData[id].startY,
          r              = Math.atan2(y, x),
          angle          = Math.round(r * 180 / Math.PI),
          direction4axis = '',
          direction8axis = '';

      if (angle < 0)
        angle = 360 - Math.abs(angle);

      if      (                angle < 45 ) { direction4axis = 'w';  }
      else if (angle >= 45  && angle < 135) { direction4axis = 's';  }
      else if (angle >= 135 && angle < 255) { direction4axis = 'e'; }
      else if (angle >= 255 && angle < 315) { direction4axis = 'n';    }
      else if (angle >= 315               ) { direction4axis = 'w';  }

      if      (                angle < 23 ) { direction8axis = 'w';  }
      else if (angle >= 23  && angle < 67 ) { direction8axis = 'sw'; }
      else if (angle >= 67  && angle < 113) { direction8axis = 's';  }
      else if (angle >= 113 && angle < 157) { direction8axis = 'se'; }
      else if (angle >= 157 && angle < 203) { direction8axis = 'e';  }
      else if (angle >= 203 && angle < 247) { direction8axis = 'ne'; }
      else if (angle >= 247 && angle < 293) { direction8axis = 'n';  }
      else if (angle >= 293 && angle < 337) { direction8axis = 'nw'; }
      else if (angle >= 337               ) { direction8axis = 'w';  }

      if (swipeData[id].fingerCount > 0)
        swipeData[id].callback(id, angle, swipeData[id].swipeLength, direction4axis, direction8axis, swipeData[id].fingerCount, event.srcElement);
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
