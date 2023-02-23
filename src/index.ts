// (document.querySelector('.check')! as HTMLButtonElement).addEventListener(
//   'click',
//   (e: MouseEvent) => {
//     const guess: number = Number((document.querySelector('.guess')! as HTMLInputElement).value);

//     if (!guess) {
//       return ((document.querySelector('.message')! as HTMLParagraphElement).textContent =
//         'Insira um número');
//     }
//     (document.querySelector('.message')! as HTMLParagraphElement).textContent = 'boa';
//   }
// );

const main = (): void => {
  const HTMLFactory = <T>(selector: string): T => {
    return document.querySelector(selector)! as T;
  };

  const raffleNumber = (): number => Math.trunc(Math.random() * 20) + 1;

  const $secret: HTMLDivElement = HTMLFactory<HTMLDivElement>('.number');
  let secret: number = raffleNumber();

  const $score: HTMLSpanElement = HTMLFactory<HTMLSpanElement>('.score');
  let score: number = 20;
  const $highscore: HTMLSpanElement = HTMLFactory<HTMLSpanElement>('.highscore');
  let highscore: number = 0;

  const $body: HTMLBodyElement = HTMLFactory<HTMLBodyElement>('body');

  const $input: HTMLInputElement = HTMLFactory<HTMLInputElement>('.guess');
  const $message: HTMLParagraphElement = HTMLFactory<HTMLParagraphElement>('.message');

  const $btn: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.check');
  $btn.addEventListener('click', (_e: MouseEvent) => {
    const guess: number = Number($input.value);

    if (!guess) return ($message.textContent = 'Insira um número');

    if (score === 1) return ($message.textContent = 'GAME OVER ');

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

  HTMLFactory<HTMLButtonElement>('.again').addEventListener('click', restart);

  function restart(): void {
    $body.style.backgroundColor = '#222';
    HTMLFactory<HTMLInputElement>('.guess').value = '';
    $message.textContent = 'Comece os palpites...';
    $secret.textContent = '?';
    secret = raffleNumber();
    $secret.style.width = '15rem';
    score = 20;
    $score.textContent = String(score);
  }
};

main();
