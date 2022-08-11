// const {app, BrowserWindow} = require('electron')


var autocomplete = require('autocompleter');

var countries = [
  { label: 'Tennis Ball' },
  { label: 'Golf Ball' },
  { label: 'Kiwi Crossing Sign' },
  { label: 'Wedding Mario' },
  { label: 'Bracelett' },
  { label: 'Coiney' },
  { label: 'Nickle' },
  { label: 'Magnet' },
  { label: 'Square Magnet' },
  { label: 'Triangle Magnet' },
  { label: 'Blue Ball' }
]

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
  //replaceText(`app-name`, app.getName())
  // replaceText(`app-name`, process.name)
  replaceText(`app-name`, "Eliminator!")

  let electronSpan = document.getElementById("electron-app")
  electronSpan.removeAttribute("hidden")


  for( const inEl of ['ci0', 'ci1', 'ci2', 'ci3'] ) {
    const input = document.getElementById(inEl);
    autocomplete({
      input: input,
      fetch: function(text, update) {
        text = text.toLowerCase();
        // you can also use AJAX requests instead of preloaded data
        var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
        update(suggestions);
      },
      onSelect: function(item) {
        input.value = item.label;
      }
    })
  }

})
