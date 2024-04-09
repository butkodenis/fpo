const splitPayment = (amount, part) => {
  let result = [];
  const payment = Math.ceil(amount / part);

  for (let i = 0; i < part; i++) {
    result.push(payment);
  }

  return result;
};

module.exports = splitPayment;
