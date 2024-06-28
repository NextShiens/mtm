import SimpleToast from 'react-native-simple-toast';

export const Toast = (text, delay) => {
    if (delay) {
      setTimeout(() => {
        SimpleToast.show(text, 100);
      }, 500);
    } else {
      SimpleToast.show(text, 100);
    }
  };
  