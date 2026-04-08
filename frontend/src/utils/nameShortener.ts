export const nameShortener = (name: string) => {
  const splitName = name.split(' ');
  let result: string;
  if (splitName.length > 3) {
    if (splitName[2].length > 4) {
      result = splitName.slice(0, 3).join(' ') + '...';
    } else {
      result = splitName.slice(0, 2).join(' ') + '...';
    }
  } else {
    result = name;
  }

  return result;
};
