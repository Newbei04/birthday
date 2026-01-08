const photoUrls = [
    '/birthday/images/photo1.jpg',
    '/birthday/images/photo2.jpg',
    '/birthday/images/photo3.jpg',
    '/birthday/images/photo4.jpg',
    '/birthday/images/photo5.jpg',
    '/birthday/images/photo6.jpg',
    '/birthday/images/photo7.jpg',
    '/birthday/images/photo8.jpg',
    '/birthday/images/photo9.jpg',
    '/birthday/images/photo10.jpg'
];

let currentStage = 0;
let balloonsLeft = 6;
let giftsOpened = 0;
let candlesLeft = 5;
let surprisesRevealed = 0;

function nextStage(stage) {
    document.getElementById('stage' + currentStage).classList.remove('active');
    document.getElementById('stage' + stage).classList.add('active');
    currentStage = stage;
}

function popBalloon(balloon) {
    balloon.style.animation = 'none';
    balloon.innerHTML = '💥';
    balloon.style.transform = 'scale(1.5)';
    setTimeout(() => {
        balloon.style.opacity = '0';
    }, 200);
    
    balloonsLeft--;
    document.getElementById('balloon-count').textContent = 'Balloons left: ' + balloonsLeft;
    
    if (balloonsLeft === 0) {
        setTimeout(() => {
            document.getElementById('balloon-count').innerHTML = '🎊 AWESOME! 🎊';
            setTimeout(() => nextStage(2), 1000);
        }, 500);
    }
}

function openGift(gift, message) {
    if (gift.innerHTML === '🎁') {
        gift.innerHTML = '✨';
        gift.style.animation = 'spin 0.5s ease';
        
        const msg = document.createElement('div');
        msg.className = 'memory-card';
        msg.textContent = message;
        document.getElementById('gift-messages').appendChild(msg);
        
        giftsOpened++;
        if (giftsOpened === 3) {
            setTimeout(() => {
                document.getElementById('next-after-gifts').classList.remove('hidden');
            }, 500);
        }
    }
}

function blowCandle(candle) {
    if (candle.innerHTML === '🕯️') {
        candle.innerHTML = '💨';
        candle.style.opacity = '0.3';
        
        candlesLeft--;
        
        if (candlesLeft === 0) {
            document.getElementById('candle-message').innerHTML = '🎉 WISH GRANTED! 🎉';
            makeConfetti();
            setTimeout(() => nextStage(4), 1500);
        }
    }
}

function revealSurprise(box, message) {
    if (box.textContent === '?') {
        box.textContent = message;
        box.style.background = 'linear-gradient(135deg, #ff6b9d, #c06c84)';
        box.style.color = 'white';
        
        surprisesRevealed++;
        if (surprisesRevealed === 4) {
            setTimeout(() => {
                document.getElementById('final-button').classList.remove('hidden');
            }, 500);
        }
    }
}

function makeConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#ffd3e1', '#ffb3d9', '#ffe8f0'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

function celebrate() {
    makePhotosFall();
    setTimeout(makePhotosFall, 1500);
    setTimeout(makePhotosFall, 3000);
}

function makePhotosFall() {
    photoUrls.forEach((url, index) => {
        setTimeout(() => {
            const photo = document.createElement('img');
            photo.className = 'falling-photo';
            photo.src = url;
            photo.style.left = Math.random() * (window.innerWidth - 150) + 'px';
            photo.style.top = '-200px';
            photo.style.animationDelay = (Math.random() * 0.5) + 's';
            photo.style.animationDuration = (3 + Math.random() * 2) + 's';
            document.body.appendChild(photo);
            
            setTimeout(() => photo.remove(), 6000);
        }, index * 200);
    });
}