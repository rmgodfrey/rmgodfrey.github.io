const cos = Math.cos,
      sin = Math.sin;

const transformationInfo = new Map([
  ['background', { rotate: 4, translateX: 0 }],
  ['projects', { rotate: -3, translateX: -24 }],
  ['skills', { rotate: 2, translateX: -6 }],
])

const mod = (dividend, divisor) => {
  let remainder = dividend % divisor;
  if (remainder < 0) remainder += divisor;
  return remainder;
}

const radians = degrees => degrees * (Math.PI / 180);

const furthestPointFromCenter = (direction, width, height, rotation) => {
  let x = width / 2,
      y = height / 2,
      θ = radians(rotation);
  if (direction === 'vertical') {
    [x, y] = [y, x];
  }
  if (rotation >= 90) {
    [x, y] = [y, x];
    θ = radians(rotation - 90);
  }
  return x * cos(θ) + y * sin(θ);
}

for (const [sectionName, transformation] of transformationInfo) {
  const section = document.getElementById(`${sectionName}`);
  const backdrop = section.querySelector('.section__backdrop');
  const content = backdrop.querySelector('.section__content');

  transformation.rotate = mod(transformation.rotate, 180);
  const { rotate, translateX } = transformation;

  backdrop.style.transform = `translateX(${translateX}px) rotate(${rotate}deg)`;
  content.style.transform = `rotate(${-rotate}deg)`;

  const width  = backdrop.offsetWidth,
        height = backdrop.offsetHeight;
  let rightmost = furthestPointFromCenter('horizontal', width, height, rotate);
  let topmost = furthestPointFromCenter('vertical', width, height, rotate);
  backdrop.style.paddingBlock = `${topmost - height/2}px`;
  backdrop.style.paddingInline = `${rightmost - width/2}px`;
}

document.querySelector('.section__container').style.gap = '0';
