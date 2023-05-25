import confetti from "canvas-confetti";

export class ConfettiLauncher {

  /**
   * 
   * @param y Where should animation start. 0 = top of the page, 1 = bottom of the page.
   * @param x Where should animation start. 0 = Left of the page, 1 = right of the page.
   */
    dispararConfetti(y: number = 0.5, x: number = 0.5) {
        let confettiBtn = document.querySelector(".canvas-confetti-btn");
        confettiBtn.classList.add("animate__rubberBand");
        window.setTimeout(() => {
            this.fire(0.25, {
              spread: 26,
              startVelocity: 55,
              origin: { y: y, x: x }
            });
            this.fire(0.2, {
              spread: 60,
              origin: { y: y, x: x }
            });
            this.fire(0.35, {
              spread: 800,
              decay: 0.91,
              scalar: 0.8,
              origin: { y: y, x: x }
            });
            this.fire(0.1, {
              spread: 100,
              startVelocity: 25,
              decay: 0.92,
              scalar: 1.2,
              origin: { y: y, x: x }
            });
            this.fire(0.1, {
              spread: 80,
              startVelocity: 45,
              origin: { y: y, x: x }
            });
            window.setTimeout(() => {
              confettiBtn.classList.remove("animate__rubberBand");
            }, 300);
        })
    }

    fire = (particleRatio, opts) => {
        const defaults = {
            particleCount: 300,
            spread: 80,
            angle: 90,
            scalar: 0.1
          };
        confetti(
          Object.assign({}, defaults, opts, {
            particleCount: Math.floor(defaults.particleCount * particleRatio),
          })
        );
      };
}


