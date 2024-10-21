export const setInForm = (ev, state, cb) => {
  const { name, value } = ev.target;
  cb({
    ...state,
    [name]: value,
  });
};

export const inStorage = (key, value, remember = false) => {
  remember
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);
};

export const fromStorage = key =>
  localStorage.getItem(key) || sessionStorage.getItem(key);

export const removeStorage = key => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};

export const imgUrl = filename =>
  `${import.meta.env.VITE_API_URL}/image/${filename}`;
