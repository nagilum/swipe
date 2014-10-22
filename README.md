# Swipe

Simple Javascript library to enable swipe on webpages without the use of
additional libraries like jQuery. It can track multiple elements and multiple
finger touches.

## Usage

Firstly you just need to include the library as such:

```html
<script src="swipe.js"></script>
```

Then you'll need a callback function for when a swipe is completed:

```js
/**
 * This is the callback function the swipe library will init when the swipe
 * event is completed.
 *
 * @param string id
 *   The ID of the element that was swiped.
 * @param int angle
 *   The overall angle of the swipe.
 * @param int length
 *   The overall length of the swipe.
 * @param string direction4axis
 *   The direction of the swipe, ie 'w', 'e', 'n', or 's'.
 * @param string direction8axis
 *   A more detailed direction, ie: 'w', 'sw', 's', 'se', 'e', 'ne', 'n', or 'nw'.
 * @param int fingerCount
 *   The number of fingers used for the swipe.
 * @param element element
 *   The element where the swipe originated.
 */
function swipeCompleted(id, angle, length, direction4axis, direction8axis, fingerCount, element) {
  alert('Element with ID: ' + id + ' was just swiped ' + direction + ' with ' + fingerCount + ' finger(s).');
}
```

And finally you just call forth and attach the swipe to an element, as such:

```js
// attachSwipe(
//   'id-of-element',
//   number-of-fingers,
//   callback-function,
//   prevent-default-click/touch-events);
//
// The callback function is a function you create which will be called when
// the swipe is completed The last argument isn't required and defaults to
// false if not set.

// Example:
attachSwipe('divBoxForSwipe', 1, swipeCompleted);

// If you don't want to limit the number of fingers to track, aka can use any number of fingers to swipe, use this:
attachSwipe('divBoxForSwipe', null, swipeCompleted);
```

You can also supress default behaviour of the underlying controls by adding a fourth argument.

```js
// Now other click/touch events on the element won't trigger.
attachSwipe('mySwipeBox', 2, swipeCompleted, true);
```
