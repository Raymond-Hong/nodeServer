const userRegister = (user) => ajax("POST", window.location.origin + '/user/register',
  "nickName=" + user.nickName +
  "&sex=" + user.sex +
  "&password=" + user.password);