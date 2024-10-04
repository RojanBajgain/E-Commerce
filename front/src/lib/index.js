export const setInForm = (event, state, callback) => {
  const { name, value } = event.target;

    callback({
        ...state,
        [name]: value,
    })
}

export const inStorage = (key, value, remember = true) => 
  remember ? 
    localStorage.setItem(key, value) :
    sessionStorage.setItem(key, value)


export const fromStorage = key => 
  localStorage.getItem(key) || sessionStorage.getItem(key)

export const removeStorage = key => {
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
}

export const imgURL = filename => `${import.meta.env.VITE_API_URL}/image/${filename}`