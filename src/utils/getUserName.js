const getUserName = () => {
  const userP = JSON.parse(localStorage.getItem('userProfile'));
  if (userP) return userP.userName;
  return null;
};

export default getUserName;
