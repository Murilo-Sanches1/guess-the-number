"use strict";
const main = () => {
    const HTMLFactory = (selector) => {
        return document.querySelector(selector);
    };
    const raffleNumber = () => Math.trunc(Math.random() * 20) + 1;
    const $secret = HTMLFactory('.number');
    let secret = raffleNumber();
    const $score = HTMLFactory('.score');
    let score = 20;
    const $highscore = HTMLFactory('.highscore');
    let highscore = 0;
    const $body = HTMLFactory('body');
    const $input = HTMLFactory('.guess');
    const $message = HTMLFactory('.message');
    const $btn = HTMLFactory('.check');
    $btn.addEventListener('click', (_e) => {
        const guess = Number($input.value);
        if (!guess)
            return ($message.textContent = 'Insira um número');
        if (score === 1)
            return ($message.textContent = 'GAME OVER ');
        if (guess === secret) {
            $secret.textContent = String(secret);
            $secret.style.width = '30rem';
            $body.style.backgroundColor = '#60b347';
            if (score > highscore) {
                highscore = score;
                $highscore.textContent = String(score);
            }
            return ($message.textContent = 'Acertou!');
        }
        if (guess > secret) {
            score--;
            $score.textContent = String(score);
            return ($message.textContent = 'Muito alto');
        }
        if (guess < secret) {
            score--;
            $score.textContent = String(score);
            return ($message.textContent = 'Muito baixo');
        }
    });
    HTMLFactory('.again').addEventListener('click', restart);
    function restart() {
        $body.style.backgroundColor = '#222';
        HTMLFactory('.guess').value = '';
        $message.textContent = 'Comece os palpites...';
        $secret.textContent = '?';
        secret = raffleNumber();
        $secret.style.width = '15rem';
        score = 20;
        $score.textContent = String(score);
    }
};
main();
