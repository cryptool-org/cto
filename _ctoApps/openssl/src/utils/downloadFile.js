export const downloadFile = (data, fileName, mimeType) => {
  const url = window.URL.createObjectURL(data);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  a.remove();

  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};
