export function getFeeling() {
  const myFeelings = [
    "Начала играть благодаря друзьям и теперь тоже пьет пиво...",
    "Больше всего в D&D ценит шутки про члены",
    "Всегда выбирает сексуально озабоченную расу",
    "Самый смелый на поле",
  ];
  const feeling = myFeelings[Math.floor(Math.random() * myFeelings.length)];
  console.log(feeling);
  return feeling;
}
