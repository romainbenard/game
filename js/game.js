// Link
const playBtn = document.querySelector('#playBtn')
const gameIntro = document.querySelector('#intro-wrapper')
const gameZone = document.querySelector('#game-zone')
const gameWrapper = document.querySelector('#game-wrapper')

const leftCircle = document.querySelector('.circle-left-container')
const leftBallOne = document.getElementById('left-1');
const leftBallTwo = document.getElementById('left-2');

const rightCircle = document.querySelector('.circle-right-container')
const rightBallOne = document.getElementById('right-1');
const rightBallTwo = document.getElementById('right-2');

const lines = document.querySelectorAll('.line')

const points = document.querySelector('.points');
const timer = document.querySelector('.time');


// Method for coordinates
// console.log(leftBallOne.getBoundingClientRect())

// create a array to stock each ball created
let currentBalls = [];
let score = 0;
let time = 60;


// Functions
function newBalls() {
    setInterval(() => {
        let randomIndex = Math.floor(Math.random()*lines.length);
        const balls = document.createElement('div');
        balls.classList.add('line-ball');
        lines[randomIndex].appendChild(balls)
        
        // setInterval(() => {
        //     console.log(Number(leftCircle.getBoundingClientRect().x.toFixed(0)) + "-" + Number(leftCircle.getBoundingClientRect().y.toFixed(0)))
        //     console.log(Number(balls.getBoundingClientRect().x.toFixed(0)) + "-" + Number(balls.getBoundingClientRect().y.toFixed(0)))
        // }, 1000);

        currentBalls.push(balls)
        
        // Calculate the realtime position of each balls and circleBalls
        setInterval(() => {
            currentBalls.forEach(ball => {
                checkSameCoordinates(leftBallOne, ball)
                checkSameCoordinates(leftBallTwo, ball)
                checkSameCoordinates(rightBallOne, ball)
                checkSameCoordinates(rightBallTwo, ball)
            });
        }, 40);
        
        // Remove ball if it reaches the end of the line /!\/!\/!\ Adjust the duration depending on the animation.
        setTimeout(() => {
        lines[randomIndex].removeChild(lines[randomIndex].firstChild) }, 6000) 

    }, 1500);
}

function checkSameCoordinates(circleBall, lineBall) {
    let circleBallX = Number(circleBall.getBoundingClientRect().x.toFixed(0)) + 7 ; // to trigger the center add the radius
    let circleBallY = Number(circleBall.getBoundingClientRect().y.toFixed(0)) + 7;

    let lineBallX = Number(lineBall.getBoundingClientRect().x.toFixed(0)) + 5;  // to trigger the center add the radius
    let lineBallY = Number(lineBall.getBoundingClientRect().y.toFixed(0)) + 5;
    
    // console.log("circleBall= " + circleBallX + " --- " + circleBallY + "lineBall= " + lineBallX + ";" +lineBallY)        

    if ((circleBallX - 6 <= lineBallX && circleBallX + 6 >= lineBallX) && (circleBallY <= lineBallY + 6 && circleBallY >= lineBallY - 6)) {
        console.log("it works------");
        console.log("circleBallX= " + circleBallX + " : " + circleBallY + " ---- lineBallX= " + lineBallX + " : " +lineBallY)        

        lineBall.remove()
        score++
        points.textContent = score;
    }
}

function startTimer() {
    setInterval(() => {
        time--;
        timer.textContent = time;
        if (time === 0) {
            timer.textContent = 0;
            alert("GAME OVER");
            gameZone.remove();
        }    
    }, 1000)
}

function startTheGame(){
    newBalls();
    startTimer();
}

//Event listeners

document.addEventListener('click', function() {
    setTimeout(startTheGame, 3000);

    gameIntro.style.display = "none"
    gameWrapper.style.display = "flex"
    gameWrapper.classList.add('fadein')

})

document.addEventListener('keydown', function (event) {
    if (event.key === 'q') {
        leftCircle.classList.toggle('reverse')
        // setInterval(() => {
        // console.log(+leftBallOne.getBoundingClientRect().left.toFixed(0))
        // }, 4000);
        //DOUBLE THE NUMBER OF REFERENCE…
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'd') {        
        leftCircle.classList.toggle('reverse')
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        rightCircle.classList.toggle('reverse')
    }
})
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {        
        rightCircle.classList.toggle('reverse')
    }
})