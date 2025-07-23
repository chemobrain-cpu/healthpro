export const FORCEUSERIN = "FORCEUSERIN";

export const LOGIN = 'LOGIN';
export const CHANGE_BLACK = 'CHANGE_BLACK';
export const CHANGE_WHITE = 'CHANGE_WHITE';

export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';

const DB_NAME = 'healthProDB';
const DB_VERSION = 1;
const STORE_NAME = 'keyval';


// Open IndexedDB and create object store if needed
const openDB = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

// Generic helper to perform a transaction and get the store
const withStore = async (mode, callback) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, mode);
  const store = tx.objectStore(STORE_NAME);
  const result = await callback(store);
  return new Promise((res, rej) => {
    tx.oncomplete = () => res(result);
    tx.onerror = () => rej(tx.error);
  });
};

// Get value by key
export const idbGet = async (key) =>
  withStore('readonly', (store) =>
    new Promise((resolve, reject) => {
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    })
);

// Set value by key
export const idbSet = async (key, value) =>
  withStore('readwrite', (store) =>
    new Promise((resolve, reject) => {
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    })
  );

// Remove value by key
export const idbRemove = async (key) =>
  withStore('readwrite', (store) =>
    new Promise((resolve, reject) => {
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    })
  );




// Calculate time remaining for token expiration
const calculateRemainingTime = (expirationTimestamp) => {
  const currentTime = Date.now();
  return Math.max(expirationTimestamp - currentTime, 0);
};

// Retrieve stored token and expiration, clean if expired
const retrievedAdminStoredToken = async () => {
  const token = await idbGet('token');
  const expiry = await idbGet('expiry');

  if (!token || !expiry) return { token: '', expiresIn: '' };

  const timeLeft = calculateRemainingTime(Number(expiry));
  if (timeLeft <= 0) {
    await Promise.all([
      idbRemove('token'),
      idbRemove('expiry'),
      idbRemove('user'),
    ]);
    return { token: '', expiresIn: '' };
  }

  return { token, expiresIn: timeLeft };
};

// Get theme style by color string
const getTheme = (style) => ({
  background: style === 'white' ? 'white' : 'black',
  importantText: style === 'white' ? 'black' : 'white',
  normalText: '#5d616d',
  fadeColor: style === 'white' ? 'rgb(240,240,240)' : 'rgb(30,30,30)',
  blue: 'rgb(37, 99, 235)',
  fadeButtonColor: style === 'white' ? 'rgb(200,200,200)' : 'rgb(30,30,30)',
});

// Main login check action
export const checkIfIsLoggedIn = () => async (dispatch) => {

  const backgroundColorStyle = await idbGet('@backgroundColorStyle');
  dispatch({
    type: backgroundColorStyle === 'white' ? CHANGE_WHITE : CHANGE_BLACK,
    payload: getTheme(backgroundColorStyle || 'black'),
  });

  try {
    const { token, expiresIn } = await retrievedAdminStoredToken();
    if (!token) return {
      bool: false, message: 'no token'
    };

    const userId = await idbGet('userId');
    if (!userId) return { bool: false, message: 'no stored user' };

    const response = await fetch(`http://localhost:9090/userbytoken`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        header: token,
      },
    });

    if (response.status !== 200) {

      const data = await response.json();
      console.log(data)

    }

    if (response.status === 200) {

      const data = await response.json();
      await idbSet('userId', data.response.user._id);

      

      console.log(data.response.admin)

      const res = {
        user: data.response.user,
        admin: data.response.admin,
        transactions: data.response.transactions,
        token,
        expiresIn,
       
      };

      dispatch({ type: FORCEUSERIN, payload: res });
      return { bool: true, message: res };
    }
    const errorData = await response.json();
    return { bool: false, message: errorData.response };
  } catch (err) {
    return { bool: false, message: err.message };
  }
};


//login handler
export const loginFun = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('http://localhost:9090/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 422 || response.status === 500 || response.status === 300) {
        let data = await response.json();
        return { bool: false, message: data.response.message };
      }

      if (response.status === 200) {
        //dispatch user to store
        let res = await response.json();
        dispatch({ type: LOGIN, payload: res.response });
        return { bool: true, url: 'dashboard' };
      }
    } catch (err) {
      return { bool: false, message: err.message };
    }
  };
};


export const signupFun = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch('http://localhost:9090/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 422 || response.status === 500 || response.status === 300) {
       
        let data = await response.json();
        console.log(data)
        return { bool: false, message: data.response.message };
      }

      if (response.status === 200) {
        //dispatch user to store
        let res = await response.json();
        dispatch({ type: LOGIN, payload: res.response });

        return { bool: true, url: 'dashboard',message:res.response.message };
      }
    } catch (err) {
      return { bool: false, message: err.message };
    }
  };
};



export const markFun = (data) => {

  return async (dispatch, getState) => {
    try {
      let response = await fetch('http://localhost:9090/mark', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 422 || response.status === 500 || response.status === 300) {
       
        let data = await response.json();
        console.log(data)
        
        return { bool: false, message: data.response.message };
      }

      if (response.status === 200) {
        //dispatch user to store
        let res = await response.json();
        console.log(res)
        dispatch({ type: LOGIN, payload: res.response });

        return { bool: true,message:res.response.message };
      }
    } catch (err) {
      return { bool: false, message: err.message };
    }
  };
};







export const logout = () => async (dispatch) => {
  try {
    await Promise.all([
      idbRemove('token'),
      idbRemove('userId'),
      idbRemove('expiry'),
      idbRemove('user'),
    ]);

    dispatch({ type: LOGOUT });


  } catch (err) {
    return { bool: false, message: err.message };
  }
};








