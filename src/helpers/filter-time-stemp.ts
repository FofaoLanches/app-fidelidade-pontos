export const dateBiggerThenOneWeek = (data: string): boolean => {
  const pieces = data.split("/");
  const onePiece = pieces[2] + "-" + pieces[1] + "-" + pieces[0];
  const itemDate = new Date(onePiece);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const timestampItem = itemDate.getTime();
  const timestampOneWeekAgo = oneWeekAgo.getTime();

  return timestampItem > timestampOneWeekAgo;
};

export const dateBiggerThenOneMonth = (data: string): boolean => {
  const pieces = data.split("/");
  const onePiece = pieces[2] + "-" + pieces[1] + "-" + pieces[0];
  const itemDate = new Date(onePiece);
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getMonth() - 1);

  const timestampItem = itemDate.getTime();
  const timestampOneMonthAgo = oneMonthAgo.getTime();

  return timestampItem > timestampOneMonthAgo;
};

export const dateBiggerThenSixMonth = (data: string): boolean => {
  const pieces = data.split("/");
  const onePiece = pieces[2] + "-" + pieces[1] + "-" + pieces[0];
  const itemDate = new Date(onePiece);
  const sixMonthAgo = new Date();
  sixMonthAgo.setDate(sixMonthAgo.getMonth() - 6);

  const timestampItem = itemDate.getTime();
  const timestampSixMonthAgo = sixMonthAgo.getTime();

  return timestampItem > timestampSixMonthAgo;
};
