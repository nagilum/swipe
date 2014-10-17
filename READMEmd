# Swipe with Pure Javascript

Here is a simple library to enable swipe on a mobile webpage.
It can track multiple elements and multiple finger touches.

## Usage

In the HTML header:

    <script src="swipe.js"></script>
    <script>
        function swipeCompleted(id, direction, fingerCount) {
            alert('Element with ID: ' + id + ' was just swiped ' + direction + ' with ' + fingerCount + ' finger(s).');
        }
    </script>

In the HTML footer:

    <script>
        // attachSwipe('id-of-element', number-of-fingers, callback-function);
        // The callback function is a function you create which will be called when the swipe is completed.

        // Example:
        attachSwipe('divBoxForSwipe', 1, swipeCompleted);

        // If you don't want to limit the number of fingers to track, aka can use any number of fingers to swipe, use this:
        attachSwipe('divBoxForSwipe', null, swipeCompleted);
    </script>
