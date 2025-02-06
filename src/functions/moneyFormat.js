export const formatMoney = (money,myCurrency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: myCurrency }).format(money);
  };
