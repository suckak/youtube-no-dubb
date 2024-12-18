chrome.storage.sync.get('dubbing').then((data) => {
  console.log('dd', data);
  if (data.dubbing === undefined) {
    chrome.storage.sync.set({ dubbing: true });
  } else {
    console.log('check', data.dubbing);
    if (data.dubbing) {
      document.getElementById('checkbox').setAttribute('checked', data.dubbing);
    }

    document.getElementById('checkbox').addEventListener('click', () => {
      chrome.storage.sync.get('dubbing').then((data) => {
        chrome.storage.sync.set({ dubbing: !data.dubbing });
      });
    });
  }
});
