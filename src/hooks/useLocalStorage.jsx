// useState stores the value in React.
// useEffect saves the value in localStorage.
import {
  useState,
  useEffect
} from 'react';


function useLocalStorage(key, initialValue) {

  // ==================================================
  // 1. READ VALUE FROM LOCAL STORAGE
  // ==================================================

  const [value, setValue] = useState(() => {

    try {

      // Try to find an already saved value.
      const savedValue =
        localStorage.getItem(key);


      // If something was already saved,
      // convert it from JSON back to JavaScript.
      if (savedValue !== null) {

        return JSON.parse(savedValue);

      }


      // Nothing was saved yet.
      // Use the default value.
      return initialValue;

    } catch (error) {

      console.log(
        'Error reading localStorage:',
        error
      );


      return initialValue;
    }

  });


  // ==================================================
  // 2. SAVE VALUE TO LOCAL STORAGE
  // ==================================================

  useEffect(() => {

    try {

      // localStorage can only store strings.
      // JSON.stringify converts our value to a string.
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );

    } catch (error) {

      console.log(
        'Error saving localStorage:',
        error
      );

    }

  }, [key, value]);


  // ==================================================
  // 3. RETURN LIKE useState
  // ==================================================

  return [
    value,
    setValue
  ];
}


export default useLocalStorage;