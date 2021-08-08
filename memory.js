const backFaceAll = document.querySelectorAll('.back-face');
const resetButton = document.querySelector('#reset');
const vitalikGif = document.querySelector('.vitalik');
const attempts = document.querySelector('#attempts');

let boardLock = false;
let cardMatchArr = [];
let currentBackFaceImg = [];
let attemptsCounter = 0
let invisibleScore = 0;



const flipsCard = (e) => {
  if (boardLock) return;
 
  e.target.classList.add('hidden');
  cardMatchArr.push(e.target.dataset.framework);
  currentBackFaceImg.push(e.target);

  countsAttempts();
  checksForMatches();
  showsVitalik();
}

const countsAttempts = () => {
  attemptsCounter += 1;
  attempts.textContent = attemptsCounter;
}

const checksForMatches = () => {
  if (cardMatchArr.length === 2 && cardMatchArr[0] === cardMatchArr[1]) {
    invisibleScore += 1;
    clearsMatchAndCurrentBackFace();
  }

  else if (cardMatchArr.length === 2 && cardMatchArr[0] !== cardMatchArr[1]){
    boardLock = true;

    setTimeout(() => {
      unflipsCard();
      clearsMatchAndCurrentBackFace();

      boardLock = false;
    }, 800)
  }
}

const showsVitalik = () => {
  if (invisibleScore === 3) {
    setTimeout(() => {
      vitalikGif.style.display = 'block';
    }, 120)
  }
}

const unflipsCard = () => {
  currentBackFaceImg[0].classList.remove('hidden');
  currentBackFaceImg[1].classList.remove('hidden');
}

const clearsMatchAndCurrentBackFace = () => {
  cardMatchArr = [];
  currentBackFaceImg = [];
}

const resetsBoard = () => {
  boardLock = true;

  vitalikGif.style.display = 'none';
  backFaceAll.forEach(backFace => {
    backFace.classList.remove('hidden');
  })

  invisibleScore = 0;
  attemptsCounter = 0;
  attempts.textContent = attemptsCounter;
  clearsMatchAndCurrentBackFace();

  boardLock = false
}


backFaceAll.forEach(overlays => overlays.addEventListener('click', flipsCard));
resetButton.addEventListener('click', resetsBoard);



