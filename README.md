# Swipe with Pure Javascript

Here is a simple library to enable swipe on a mobile webpage.
It can track multiple elements and multiple finger touches.

## Usage

In the HTML header:

```html
<script src="swipe.js"></script>
<script>
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
</script>
```

In the HTML footer:

```html
<script>
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
</script>
```
