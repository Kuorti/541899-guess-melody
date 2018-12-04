const render = (timeLeft) => `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle class="timer__line" cx="390" cy="390" r="370"
                style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"/>
      </svg>

      <div class="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer__mins">${Math.floor(timeLeft / 60)}</span>
        <span class="timer__dots">:</span>
        <span class="timer__secs">${timeLeft % 60}</span>
      </div>`;

export default {render};
