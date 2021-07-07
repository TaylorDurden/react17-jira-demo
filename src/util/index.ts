// !!"123"  相当于是   Boolean("123")    //结果为true
// !!{a:1}  相当于是    Boolean({a:1})    //结果为true
export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const CleanObject = (object: any) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
