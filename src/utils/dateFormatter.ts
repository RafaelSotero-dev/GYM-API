export const subscriptionExpirationDate = (date: Date) => {
  const nextMonth = date.getMonth() + 1;
  date.setMonth(nextMonth);
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};
