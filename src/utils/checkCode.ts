export const checkCode = (correct: Array<string>, entered: Array<string>) =>
  correct.every((symbol, index) => symbol === entered[index]);
