// const {app, BrowserWindow} = require('electron')


var autocomplete = require('autocompleter');

const countries = [
  { label: 'Tennis Ball' },
  { label: 'Tripod' },
  { label: 'Firetruck' },
  { label: 'Squash Ball' },
  { label: 'Train' },
  { label: 'Alien Crossing Sign' },
  { label: 'Camera' },
  { label: 'BFDI' },
  { label: 'Pokemon' },
  { label: 'Golf Ball' },
  { label: 'Kiwi Crossing Sign' },
  { label: 'Wedding Mario' },
  { label: 'Bracelett' },
  { label: 'Coiney' },
  { label: 'Nickle' },
  { label: 'Magnet' },
  { label: 'Square Magnet' },
  { label: 'Triangle Magnet' },
  { label: 'Pencil' },
  { label: 'Remote' },
  { label: 'Spoungey' },
  { label: 'Dart' },
  { label: 'Satern' },
  { label: 'Tiger' },
  { label: 'Hockey Puck' },
  { label: 'Eggey' },
  { label: 'Baseball' },
  { label: 'Evil Baseball' },
  { label: 'Garbage Truck' },
  { label: 'Question Mark Block' },
  { label: 'Bracelettey' },
  { label: 'Marker' },
  { label: 'Cable' },
  { label: 'Uranus' },
  { label: 'Fidget Spinner' },
  { label: 'Fitbit Watch' },
  { label: 'Notepad' },
  { label: 'Mushroom' },
  { label: 'Minion' },
  { label: 'Ruby' },
  { label: 'Screw' },
  { label: 'Controller' },
  { label: 'Eraser' },
  { label: 'Ping Pong Ball' },
  { label: 'Cowboy' },
  { label: 'Sun' },
  { label: 'Fish' },
  { label: 'Screwdriver' },
  { label: 'Hex Bug' },
  { label: 'Do Not Enter Sign' },
  { label: 'Jupiter' },
  { label: 'Rockey' },
  { label: 'Shake Egg' },
  { label: 'Bus' },
  { label: 'Lion' },
  { label: 'Batman' },
  { label: 'Dog on Skateboard' },
  { label: 'Pizza Truck' },
  { label: 'Sidewalk Sign' },
  { label: 'Flower' },
  { label: 'Side Cone' },
  { label: 'Bowser In A Car' },
  { label: 'BFDIA' },
  { label: 'Kangaroo Crossing Sign' },
  { label: 'Bear Crossing Sign' },
  { label: 'Pig on Hoverboard' },
  { label: 'Monster Truck' },
  { label: 'Sunglasses' },
  { label: 'Yoshi' },
  { label: 'School Bus' },
  { label: 'Elephant'},
  { label: 'Semi Truck' },
  { label: 'Robot' },
  { label: 'Shark' },
  { label: 'Frog' },
  { label: 'Cement Truck' },
  { label: 'Pipe Cleaner' },
  { label: 'Tire'},
  { label: 'Luigi In Car' },
  { label: 'Bubble Wand' },
  { label: 'IDFB' },
  { label: 'Earth' },
  { label: 'Bus' },
  { label: 'Pro Controller' },
  { label: 'Popit' },
  { label: 'Venus' },
  { label: 'Octopus' },
  { label: 'Among Us Comic' },
  { label: 'Xbox Controller' },
  { label: 'Hex Bug Controller' },
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
