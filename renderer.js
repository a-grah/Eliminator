// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//





const replaceText = (selector, text) => {
  const element = document.getElementById(selector)
  if (element) element.innerText = text
}

replaceText("status", `Ready To Vote`)

var numberVoters       // The number of voters
const minimumEliminatorVotes = 20000   // to be eligible for elimination the contestent must have at least this many votes
const numContestents = 4               // Total number of contestants being voted for
const numToBeEliminateds = 2           // Of the contestents this many will be eliminated


const contestants = ["Kiwi Crossing Sign", "Wedding Mario", "Bracelett", "Blue Ball"]
var   votes = [0,0,0,0]
var unCast = 0
var votesCast =   0
console.log("The Renderer is here.")
console.log(contestants)
console.log(votes)

const cIDs = ['c0', 'c1', 'c2', 'c3']       // Contestants names table fields
const ciIDs = ['ci0', 'ci1', 'ci2', 'ci3']  // Contestant name input fields
const vIDs = ['v0', 'v1', 'v2', 'v3']       // Vote count table fields

window.addEventListener('DOMContentLoaded', () => {
  for( let idx=0;idx<numContestents;idx++ ) {
    replaceText(cIDs[idx], contestants[idx])
    document.getElementById(ciIDs[idx]).value = contestants[idx]
    replaceText(vIDs[idx], votes[idx])

  }
  replaceText('totalVotes', votesCast   )
  replaceText('uncast', unCast)
})

var intervalTimer
function simulateVoting() {

  replaceText("status", `Voting In Progress`)
  document.getElementById('status').style.color = "red"

  var audio = new Audio('drum-roll-sound-effect/drum-roll-sound-effect.mp3');
  audio.play();

  for( let idx=0;idx<numContestents;idx++ ) {
    contestants[idx]= document.getElementById(ciIDs[idx]).value
    replaceText(cIDs[idx], contestants[idx])

  }
  console.log(contestants)

  replaceText('totalVotes', 0   )
  replaceText('uncast', 0)
  var totalTime = 6  // run simulated counting for 6 seconds
  var tick = 50     // tick every xx ms
  var ticksNeeded = totalTime*1000/tick
  var yy = 0
  intervalTimer = setInterval( () => {
    //replaceText('counter', yy)
    let percentToReport = yy / ticksNeeded

    //
    // Dont update the cound for each contestant
    // on every tick. Try to make the result presentation more dramatic
    //
    for( let idx=0;idx<numContestents;idx++ ) {
      if (Math.random() > 0.85)
        replaceText(vIDs[idx],Math.round(votes[idx] * percentToReport))
    }

    yy += 1
    if (yy> ticksNeeded ) stopTimerInterval()
  }, tick)
}

function stopTimerInterval() {
  clearInterval(intervalTimer)
  replaceText("status", `Voting Complete`)
  document.getElementById('status').style.color = "green"

  for( let idx=0;idx<numContestents;idx++ ) {
    replaceText(vIDs[idx],votes[idx] )
  }

  let maxVotes = 0
  var idxMax = 0
  for (vote in votes) {
    if ( votes[vote] > maxVotes ) {
      maxVotes = votes[vote]
      idxMax = vote
    }
    console.log(`${idxMax} -> ${maxVotes}`)
  }

  for (let vote = 0; vote < numContestents; vote++){
    let targetId = `v${vote}`
    let targetContestantId = `c${vote}`
    if (vote == idxMax) {
      document.getElementById(targetId).style.color = "red"
      document.getElementById(targetContestantId).style.color = "red"
    } else {
      document.getElementById(targetId).style.color = "green"
      document.getElementById(targetContestantId).style.color = "green"
    }
  }

  replaceText('totalVotes', votesCast   )
  replaceText('uncast', unCast)

}

const prUncast =  Math.random()
function selectCandidate(bias, biasWin, runnerUp) {
  let selectedCandidate = Math.floor(Math.random() * (4 + prUncast))
  if( Math.random() < 0.25 ) {
    return bias
  }
  if( selectedCandidate == runnerUp ) {
    if( Math.random() < 0.25 ) {
      return selectCandidate()
    }
  }
  if( selectedCandidate == biasWin) {
    if ( Math.random() < 0.5 ) {
      return selectCandidate(bias,biasWin)
    }
  }

  return selectedCandidate
}

function doVoting() {
  let select = document.getElementById('voterCfg');
  let value = select.options[select.selectedIndex].value;
  console.log(value); // en
  numberVoters = value

  votes = [0,0,0,0]
  let idx = 0
  let designatedLooser = Math.floor(Math.random() * 5)
  let designatedWinner = Math.floor(Math.random() * 5)
  let designatedRunnerUp = Math.floor(Math.random() * 5)
  while( idx < numberVoters ) {
    votes[selectCandidate(designatedLooser, designatedWinner, designatedRunnerUp)] += 1
    idx += 1
  }
  votesCast = votes[0]+votes[1]+votes[2]+votes[3]
  unCast = numberVoters - votesCast

  console.log("----------")
  console.log(contestants)
  console.log(votes)

  for (contestant in contestants) {
    let targetId = `v${contestant}`
    let targetCId = `c${contestant}`
    console.log(`${contestants[contestant]} has ${votes[contestant]}`)
    document.getElementById(targetId).style.color = ""
    document.getElementById(targetCId).style.color = ""
  }

  simulateVoting()
}

document.getElementById('btnVt').onclick = () => { doVoting() }
document.getElementById('infoOverlayButton').onclick = () => {
  document.getElementById('infoOverlay').style.display = "block"
}
document.getElementById('closeOverlayButton').onclick = () => {
  document.getElementById('infoOverlay').style.display = "none"
}
