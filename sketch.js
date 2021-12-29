const canvasSize = 400
let wList = {}
let inp 
let velocity = 1
let wordSize = 15
let startAdding = false
let time = 1000

function setup() {
    createCanvas(canvasSize, canvasSize)
    background('black')
    inp = createInput('')
    inp.parent('#inp')
    inp.input(myInputEvent)
    
    addWords(5)
}

function myInputEvent() {
    let val = this.value().trim()
    console.log(val)
    if(!!wList[val]) {
        delete wList[val]
        if(getWords().length < 1)
          addWords(4)
        document.querySelector("#inp > input[type=text]").value = ''

        if(!startAdding) {
          startAdding = true 
          timerWords()
        }
    }
  }
  
function draw() {
  background('black')
  fill('white')
  textSize(wordSize)
  // text(getWords().map(_ => _.word).join(" "), 15, 15)
  getWords().forEach(_ => displayWord(placeRandomly(_)))
}

const addWords = count => words(count).forEach(_ => !!wList[_] ? "" : (wList[_] = {word: _, x: 0, y: 0}))
const getWords = () => Object.values(wList)
const placeRandomly = (word, wWidth, wHeight = wordSize) => ((word.x > 0 || word.y > 0) ? word : wList[word.word] = {...word, x: Math.round(Math.random() * (canvasSize - (wWidth = textWidth(word.word)))), y: Math.round(Math.random() * (canvasSize - (wHeight))) + wHeight})
const displayWord = (word, x = word.x, y = word.y) => text(word.word, x, y)
const timerWords = (t = time) => window.setTimeout(() => {addWords(Math.round(Math.random()) + 1); timerWords(Math.abs(t - Math.floor(Math.random() * 10)))} , t)