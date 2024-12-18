export const formatDate = (date: string): string => {
  return date.split('T')[0];
};

export const formatTime = (time: string): string => {
  return `${time}:00Z`;
};

export const formatCurrency = (amount: number): string => {
  return amount.toFixed(2);
};