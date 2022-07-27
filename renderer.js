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

//replaceText("status", `Voting In Progress`)
replaceText("status", `Ready To Vote`)
// document.getElementById('status').style.color = "red"

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

// doVoting()




window.addEventListener('DOMContentLoaded', () => {

  replaceText('c0', contestants[0])
  replaceText('c1', contestants[1])
  replaceText('c2', contestants[2])
  replaceText('c3', contestants[3])
  document.getElementById('ci0').value = contestants[0]
  document.getElementById('ci1').value = contestants[1]
  document.getElementById('ci2').value = contestants[2]
  document.getElementById('ci3').value = contestants[3]

  replaceText('v0', votes[0])
  replaceText('v1', votes[1])
  replaceText('v2', votes[2])
  replaceText('v3', votes[3])
  replaceText('totalVotes', votesCast   )
  replaceText('uncast', unCast)
})

var x
function simulateVoting() {

  replaceText("status", `Voting In Progress`)
  document.getElementById('status').style.color = "red"

  contestants[0]= document.getElementById('ci0').value
  contestants[1]= document.getElementById('ci1').value
  contestants[2]= document.getElementById('ci2').value
  contestants[3]= document.getElementById('ci3').value
  console.log(contestants)
  replaceText('c0', contestants[0])
  replaceText('c1', contestants[1])
  replaceText('c2', contestants[2])
  replaceText('c3', contestants[3])

  replaceText('totalVotes', 0   )
  replaceText('uncast', 0)
  // Update the count down every 1 second
  var maxCount = Math.min(unCast, 2000)
  var yy = maxCount
  x = setInterval(function() {
    //replaceText('counter', yy)
    let percentToReport
    if( unCast == 0 ) {
      percentToReport = 1
    } else {
      percentToReport = 1 -  yy/maxCount
    }

    //
    // Dont update the cound for each contestant
    // on every tick. Try to make the result presentation more dramatic
    //
    if (Math.random() > 0.85)
      replaceText('v0',Math.round(votes[0] * percentToReport))
    if (Math.random() > 0.85)
      replaceText('v1',Math.round(votes[1] * percentToReport))
    if (Math.random() > 0.85)
      replaceText('v2',Math.round(votes[2] * percentToReport))
    if (Math.random() > 0.85)
      replaceText('v3',Math.round(votes[3] * percentToReport))

    yy -= 1
    if (yy<0) stopTimerInterval()
  }, 5)
}

function stopTimerInterval() {
  clearInterval(x)
  replaceText("status", `Voting Complete`)
  document.getElementById('status').style.color = "green"

  replaceText('v0',votes[0] )
  replaceText('v1',votes[1] )
  replaceText('v2',votes[2] )
  replaceText('v3',votes[3] )

  let maxVotes = 0
  var idxMax = 0
  for (vote in votes) {
    if ( votes[vote] > maxVotes ) {
      maxVotes = votes[vote]
      idxMax = vote
    }
    console.log(`${idxMax} -> ${maxVotes}`)
  }

  for (let vote = 0; vote < 4; vote++){
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

document.getElementById('btnVt').onclick = function(){ doVoting() }
