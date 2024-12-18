const dubbing = () => {
  const player = document.getElementById('movie_player');

  if (player) {
    player.classList.remove('ytp-autohide');
    document.querySelector('button.ytp-button.ytp-settings-button').click();
    const dubb = document.querySelector('.ytp-audio-menu-item');
    if (dubb) {
      dubb.click();
      const options = document.querySelectorAll('.ytp-menuitem-label');
      for (let index = 0; index < options.length; index++) {
        const element = options[index];
        if (
          element.innerText.includes('original') &&
          (element.parentNode.ariaChecked === false ||
            element.parentNode.ariaChecked === 'false')
        ) {
          element.click();
          index = options.length;
        }
      }
    }
    document.querySelector('button.ytp-button.ytp-settings-button').click();
    document.getElementById('movie_player').classList.add('ytp-autohide');
  }
};

dubbing();

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const debouncedBubbing = debounce(dubbing, 1000);

chrome.storage.sync.get('dubbing').then((data) => {
  if (data.dubbing === undefined) {
    chrome.storage.sync.set({ dubbing: true });
    navigation.addEventListener('navigate', debouncedBubbing);
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.dubbing?.newValue) {
    if (changes.dubbing.newValue) {
      navigation.addEventListener('navigate', debouncedBubbing);
    } else {
      navigation.removeEventListener('navigate', debouncedBubbing);
    }
  }
});
