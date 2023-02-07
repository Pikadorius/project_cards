export const UserNameHandler = (userName: string) => {
  const maxLength = 22;
  const cutIndex =
    userName.indexOf("@") !== -1 ? userName.indexOf("@") : maxLength;
  const newUserName = `${userName
    .split("")
    .map((el, i) => {
      const firstLetter = el.toUpperCase();

      return i === 0
        ? firstLetter
        : i >= cutIndex || i >= maxLength
        ? null
        : el;
    })
    .filter((el) => el !== null)
    .join("")}`;
  return userName.length > maxLength ? `${newUserName}...` : newUserName;
};
