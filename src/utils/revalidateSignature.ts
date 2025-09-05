export const revalidate = (date: Date) => {
  const limitDate = new Date(date);
  limitDate.setMonth(limitDate.getMonth() + 1);
  const tolerance = limitDate.getDate() + 3;
  limitDate.setDate(tolerance);

  const now = new Date();

  const isAfter = now.getTime() > limitDate.getTime();

  console.log(isAfter);
  return isAfter;
};
