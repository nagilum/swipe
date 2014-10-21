# Swipe

Simple library to enable swipe on webpages without the use of additional
libraries like jQuery. It can track multiple elements and multiple finger
touches.

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
 * @param string direction
 *   The direction of the swipe, ie 'left', 'right', 'up', or 'down'.
 * @param int fingerCount
 *   The number of fingers used for the swipe.
 */
function swipeCompleted(id, direction, fingerCount) {
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
