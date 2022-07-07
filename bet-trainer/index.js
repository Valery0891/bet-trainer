const money = document.getElementById('money');
const takeMoney = document.getElementById('take-money');
const wooosh = document.getElementById('wooosh');
const redBid = document.getElementById('red-bid');
const blackBid = document.getElementById('black-bid');
const zeroBid = document.getElementById('zero-bid');
const redC = document.getElementById('red_count');
const blackC = document.getElementById('black_count');
const zeroC = document.getElementById('zero_count');
const wonBid = document.getElementById('won-bid');
const moves = document.getElementById('moves');

const bidInp = document.querySelectorAll('.bid-inp');
const secondBlock = document.querySelector('.second-block');
const thirdBlock = document.querySelector('.third-block');
const fourthBlock = document.querySelector('.fourth-block');
const spinRoulette = document.querySelector('.roulette-img');

let mov = 0, redCount = 0, blackCount = 0, zeroCount = 0, amount;

money.addEventListener('blur', () => {
    if (money.value) {
        money.setAttribute('readonly', 'readonly');
        amount = +money.value;
        takeMoney.style.display = 'inline';
        secondBlock.style.display = 'block';
        thirdBlock.style.display = 'block';
        fourthBlock.style.display = 'block';
    }
});
takeMoney.addEventListener('click', () => {
    if (money.value) {
        if (mov === 0) {
            alert('Why did you come?..');
        } else if (amount > +money.value) {
            alert('Well done! You know when to stop!');
        } else {
            alert('Congratulations on your win! Come to us again!');
        }
        money.value = '';
        location.reload();
    }
})
redBid.addEventListener('blur', () => placeBid(redBid));
redBid.addEventListener('focus', () => returnBid(redBid));
blackBid.addEventListener('blur', () => placeBid(blackBid));
blackBid.addEventListener('focus', () => returnBid(blackBid));
zeroBid.addEventListener('blur', () => placeBid(zeroBid));
zeroBid.addEventListener('focus', () => returnBid(zeroBid));

wooosh.addEventListener('click', () => {
    let isValue = 0;
    bidInp.forEach(elem => {
        if (elem.value) isValue++;
    })
    if (!isValue) {
        alert('Place your bid please.');
    } else if (isValue<3) {
        generator();
    } else if (isValue===3) {
        alert('Do you understand the essence of the game?');
        generator();
    }
});

function placeBid(bid) {
    if (bid.value) {
        if (+money.value < +bid.value) {
            bid.value = '';
        } else {
            money.value = +money.value - +bid.value;
        }
    }
}

function returnBid(bid) {
    if (bid.value) money.value = +money.value + +bid.value;
    bid.value = '';
}

function generator() {
    wonBid.innerHTML = '____';
    wonBid.style.color = 'black';
    spinRoulette.classList.add('roulette-spin');

    const randomDig = Math.floor(Math.random() * 37);

    if (randomDig > 0 && randomDig < 19) {
        setTimeout(function() {
            spinRoulette.classList.remove('roulette-spin');
            wonBid.innerHTML = 'Played Red';
            wonBid.style.color = 'red';
        }, 1600);
        redCount++;
        redC.innerHTML = `${redCount}`;
        if (redBid.value) {
            money.value = +redBid.value * 2 + +money.value;
        }
    } else if (randomDig > 18) {
        setTimeout(function() {
            spinRoulette.classList.remove('roulette-spin');
            wonBid.innerHTML = 'Played Black';
            wonBid.style.color = 'black';
        }, 1600);
        blackCount++;
        blackC.innerHTML = `${blackCount}`;
        if (blackBid.value) {
            money.value = +blackBid.value * 2 + +money.value;
        }
    } else {
        setTimeout(function() {
            spinRoulette.classList.remove('roulette-spin');
            wonBid.innerHTML = 'Played Zero';
            wonBid.style.color = '#24e641';
        }, 1600);
        zeroCount++;
        zeroC.innerHTML = `${zeroCount}`;
        if (zeroBid.value) {
            money.value = +zeroBid.value * 35 + +money.value;
        }
    }
    redBid.value = '';
    blackBid.value = '';
    zeroBid.value = '';
    mov++;
    moves.innerHTML = `${mov}`;
    if (money.value === '0') {
        alert('Go home for money, loser, and come back!');
        location.reload();
    }
}

//   ||