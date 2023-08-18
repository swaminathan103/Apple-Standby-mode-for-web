const pointsContainer = document.querySelector(".points");
const DEGREE_INCREMENT = 6;

function createPoint(className, rotation) {
  const point = document.createElement("span");
  point.className = `point ${className}`;
  point.style.transform = `rotate(${rotation}deg) translateY(-150px)`;
  return point;
}

function createText(text, rotation) {
  const textElement = document.createElement("span");
  textElement.className = "text";
  textElement.innerHTML = text;
  textElement.style.transform = `rotate(${-rotation}deg) translateY(2px)`;
  return textElement;
}

function updateClockHands() {
  const date = new Date();
  const secondsPoint = document.querySelector(".seconds");
  const minutesPoint = document.querySelector(".minutes");
  const hoursPoint = document.querySelector(".hours");

  const secPosition = date.getSeconds() * DEGREE_INCREMENT;
  const minPosition = date.getMinutes() * DEGREE_INCREMENT;
  const hourPosition = (date.getHours() % 12) * 30 + (minPosition / 12);

  const handElements = [secondsPoint, minutesPoint, hoursPoint];

  handElements.forEach((hand) => {
    if (hand === 0) {
      hand.style.transition = "none";
    } else {
      hand.style.transition = "0.25s";
    }
  });

  secondsPoint.style.transform = `rotate(${secPosition - 180}deg)`;
  minutesPoint.style.transform = `rotate(${minPosition - 180}deg)`;
  hoursPoint.style.transform = `rotate(${hourPosition - 180}deg)`;
}

function initializeClock() {
  let j = 12;

  for (let i = 0; i < 360; i += DEGREE_INCREMENT) {
    const isHourMarker = (i / DEGREE_INCREMENT) % 5 === 0;

    const point = createPoint(isHourMarker ? "big" : "", i);

    // Create each hour markers
    if (isHourMarker) {
      const text = createText(j, i);
      j = (j === 12) ? 1 : j + 1;
      point.appendChild(text);
    }

    pointsContainer.appendChild(point);
  }

  updateClockHands();
  setInterval(updateClockHands, 1000);
}

initializeClock();
