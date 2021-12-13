export const getFileAsByteArray = (file) => {
  const fileReader = new FileReader();
  return new Promise(function (resolve, reject) {
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = function (event) {
      const array = new Uint8Array(event.target.result);
      const fileByteArray = [];
      for (let i = 0; i < array.length; i++) {
        fileByteArray.push(array[i]);
      }
      resolve(array);
    };
    fileReader.onerror = reject;
  });
};
