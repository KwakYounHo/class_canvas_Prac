const c = document.getElementsByTagName("canvas")[0];
c.className = "canvas";
const ctx = c.getContext("2d");

const width = (c.width = 1024);
const height = (c.height = 576);

const gravity = 0.3;

class Player {
  constructor({ position, color, velocity }) {
    this.position = position;
    this.color = color;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    };
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.fillStyle = "green";
    ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
  }
  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height >= height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
}

const MC = new Player({
  position: {
    x: 0,
    y: 0,
  },
  color: "blue",
  velocity: {
    x: 0,
    y: 0,
  },
});

const enemy = new Player({
  position: {
    x: 700,
    y: 0,
  },
  color: "red",
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function animation() {
  requestAnimationFrame(animation);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  MC.update();
  enemy.update();

  MC.velocity.x = 0;
  if (keys.a.pressed && MC.lastKey === "a") {
    MC.velocity.x = -3;
  } else if (keys.d.pressed && MC.lastKey === "d") {
    MC.velocity.x = 3;
  }

  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -3;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 3;
  }
}
animation();

addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      MC.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      MC.lastKey = "a";
      break;
    case "w":
      MC.velocity.y = -15;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -15;
      break;
  }
});
addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
