export const yearStringValidator = (year: string): boolean => {
  if (!year || year.length !== 4 || isNaN(Number(year)) || Number(year) < 2000) {
    return false;
  }
  return true;
};

export const monthStringValidator = (month: string): boolean => {
  if (
    !month ||
    month.length !== 2 ||
    isNaN(Number(month)) ||
    Number(month) < 1 ||
    Number(month) > 12
  ) {
    return false;
  }
  return true;
};

export const dateStringValidator = (date: string): boolean => {
  if (!date || date.length !== 2 || isNaN(Number(date)) || Number(date) < 1 || Number(date) > 31) {
    return false;
  }
  return true;
};
