
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

/* START GAME */
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

/* FLASH EFFECT */
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

/* LEVEL UP */
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

/* BUTTON PRESS */
let allBtns = document.querySelectorAll(".btn");

allBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        let userColor = this.id;

        userSeq.push(userColor);
        userFlash(this);

        checkAns(userSeq.length - 1);
    });
});

/* CHECK ANSWER */
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        h2.innerHTML = `Game Over! Score: <b>${level}</b><br>Press any key to restart`;

        document.body.classList.add("game-over");
        setTimeout(() => document.body.classList.remove("game-over"), 200);

        reset();
    }
}

/* RESET */
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}