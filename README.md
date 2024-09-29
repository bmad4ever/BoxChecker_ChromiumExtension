# BoxChecker_ChromiumExtension
Checks or Unchecks all boxes with a given name on a webpage.

It can be used in any Chromium-based web browser, such as: Chrome, Brave, Microsoft Edge, and Opera.

To install, first, download the source from this repository and then follow the instructions in this [Chrome's Tutorial to Load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=en#load-unpacked).
Installation in other browsers should be fairly similar.

### Details

The checkbox names in the dropdown are ordered from most frequent to less frequent on the webpage. So, if you have lots of items to check, the likeliest scenario is that their name is at the top of the list.

The boxes are checked simulating a mouse event and boxes already set with the target state are not interacted with.

