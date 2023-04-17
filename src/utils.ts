type MaybeClassName = boolean | string | null | undefined;

type Coordinate = [number, number];

export const cn = (...classes: MaybeClassName[]): string =>
  classes.filter(value =>
    value && typeof value === 'string',
  ).join(' ');

export const findTextCoordinates = (
  text: string,
  searched: string,
): null | Coordinate => {
  const startIndex = text
    .toLowerCase()
    .indexOf(searched.toLowerCase());

  return startIndex !== -1
    ? [startIndex, startIndex + searched.length]
    : null;
};
