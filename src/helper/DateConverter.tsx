export const DateConverter = {
  toDateInputFormat: (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },
};

export const DateConverterReverse = (_date: Date | string | undefined) => {
  if (!_date) return "";
  return (
    `${new Date(_date).getFullYear()}` +
    "-" +
    `${new Date(_date).getMonth() + 1}`.padStart(2, "0") +
    "-" +
    `${new Date(_date).getDate()}`.padStart(2, "0")
  );
};

export const DateConverterNew = (_date: Date | string | undefined) => {
  if (!_date) return "";
  return (
    `${new Date(_date).getDate()}`.padStart(2, "0") +
    "-" +
    `${new Date(_date).getMonth() + 1}`.padStart(2, "0") +
    "-" +
    `${new Date(_date).getFullYear()}`
  );
};

export const YearConverter = (_date: Date | string | undefined) => {
  if (!_date) return "";
  return `${new Date(_date).getFullYear()}`;
};

