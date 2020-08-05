export const updateObjectInArrayByType = (array, objectChanges) => {
  return array.map(obj => {
    if (obj.type !== objectChanges.type) {
      return obj;
    }
    return {
      ...obj,
      ...objectChanges,
    };
  });
};
