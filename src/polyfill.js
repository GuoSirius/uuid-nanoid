if (typeof window !== 'undefined' && !window.crypto) {
  window.crypto = {
    getRandomValues: function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
}

if (typeof globalThis !== 'undefined' && !globalThis.crypto) {
  globalThis.crypto = {
    getRandomValues: function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
}

if (typeof self !== 'undefined' && !self.crypto) {
  self.crypto = {
    getRandomValues: function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
}