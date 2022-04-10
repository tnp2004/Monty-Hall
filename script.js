const doorInput = document.querySelector('.door-input')
const submitBtn = document.querySelector('.submit-btn')
const gameBox = document.querySelector('.game')
const warning = document.querySelectorAll('.alert')

const win = document.querySelector('.win')
const lose = document.querySelector('.lose')
const roundCount = document.querySelector('.round')
const winrate = document.querySelector('.winrate')

let idCount = 1
const createDoors = () => {
    const doorBox = document.createElement('div')
    doorBox.classList.add('doors')
    doorBox.id = idCount++

    const doorImg = document.createElement('img')
    doorImg.classList.add('door')
    doorImg.src = "./picture/closedoor.png"

    doorBox.append(doorImg)
    gameBox.append(doorBox)
}

const loopCreateDoor = () => {
    roundCorrWr = 0
    if (doorInput.value >= 3) {
        gameBox.innerHTML = '';
        round = 0
        for (i = 1; i <= doorInput.value; i++) {
            createDoors()
        }
        idCount = 1
        target()
    }else {
        gameBox.innerHTML = ''
        const a1 = document.createElement('div')
        a1.classList.add('alert')
        a1.innerHTML = 'doors must'
        const a2 = document.createElement('div')
        a2.classList.add('alert')
        a2.innerHTML = 'be greater'
        const a3 = document.createElement('div')
        a3.classList.add('alert')
        a3.innerHTML = 'than or'
        const a4 = document.createElement('div')
        a4.classList.add('alert')
        a4.innerHTML = 'equal to <b>3!</b>'

        gameBox.append(a1, a2, a3, a4)
        warning.forEach(message => message.style.display = 'block')
    }
}

const random = () => {
    let rand = Math.floor(Math.random() * doorInput.value)
    return rand
}

let correctNumber = 0;
let correct;
const target = () => {
    correctNumber = random()
    wrongBait = newRandom()
    correct = document.querySelectorAll('.doors')[correctNumber]
    for (i = 0; i <= doorInput.value - 1 ; i++) {
        
        let addClick = document.querySelectorAll('.door')[i]
        addClick.addEventListener('click', doorCondition)
    }
}

let round = 0
let pick
let wrongBait /* random */
let realWrong
const doorCondition = (event) => {
    pick = Number(event.target.parentNode.id) - 1
    if (round < 1) {
        if (correctNumber != pick) {
            for (i = 0; i <= doorInput.value - 1; i++) {
                if (i === correctNumber || i === pick) {
                    round++
                    continue
                }else {
                    document.querySelectorAll('.door')[i].src = "./picture/notdoor.png"
                }
            }
            realWrong = pick
            setTimeout(() => {
                pick2Door()
            }, 100);
        }else if (correctNumber === pick) {
            for (i = 0; i <= doorInput.value - 1; i++) {
                if (i === correctNumber || i === wrongBait) {
                    round++
                    continue
                }else {
                    document.querySelectorAll('.door')[i].src = "./picture/notdoor.png"
                }
            }
            realWrong = wrongBait
            setTimeout(() => {
                pick2Door()
            }, 100);
        }
    }
}

const newRandom = () => {
    let rand2 = random()
    if (rand2 != correctNumber) {
        return rand2
    }
    return newRandom()
}

const pick2Door = () => {
    correct.addEventListener('click', onCorrect)
    let wrong = document.querySelectorAll('.doors')[realWrong]
    wrong.addEventListener('click', onWrong)
    roundPick2++       
}


const statUpdate = () => {
    roundCount.innerHTML ++
    let b = Number(win.innerHTML) / Number(roundCount.innerHTML) * 100
    winrate.innerHTML = b.toFixed(2) + '%'
}

let roundCorrWr = 0
const onCorrect = () => {
    if (roundCorrWr < 1) {
        roundCorrWr ++
        win.innerHTML ++
        document.querySelectorAll('.door')[correctNumber].src = './picture/correct.png'
        statUpdate()
    }else {
        loopCreateDoor()
    }
}

const onWrong = () => {
    if (roundCorrWr < 1) {
        roundCorrWr ++
        lose.innerHTML ++
        document.querySelectorAll('.door')[realWrong].src = './picture/wrong.png'
       statUpdate()
    }else {
        loopCreateDoor()
    }
}

submitBtn.addEventListener('click', loopCreateDoor)
