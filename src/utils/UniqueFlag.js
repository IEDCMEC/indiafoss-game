const generateUniqueFlag = (userId) => {
  return btoa(userId);
};

export default generateUniqueFlag;

