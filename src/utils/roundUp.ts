// roundUpFee(1.2345) => 1.24
export const roundUp = (number: number): number => {
  return Math.ceil(number * 100) / 100;
};
