const setDarkMode = (value) => {
  const lastPreferences = getpreferences('preferences');
  const newPreference = window.localStorage.setItem('preferences','[{"darkmode" : ' +value+'}]');
  console.log(lastPreferences,newPreference);
}
const getpreferences = (item) => {
  const itemPreference = window.localStorage.getItem(item);
  return itemPreference;
}
export default {
  setDarkMode,
  getpreferences
};
