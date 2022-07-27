// const {app, BrowserWindow} = require('electron')

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
})
