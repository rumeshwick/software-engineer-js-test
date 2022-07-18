var localStorageMock = (function () {
  var store = {
    canvasPrintDescription: {
      'testimage2.jpg': {
        canvas: {
          width: 15,
          height: 10,
          photo: {
            id: 'testimage2.jpg',
            width: 30,
            height: 20,
            x: -100,
            y: 0,
          },
        },
      },
    },
  };
  return {
    getItem: function (key) {
      return JSON.stringify(store[key]);
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
