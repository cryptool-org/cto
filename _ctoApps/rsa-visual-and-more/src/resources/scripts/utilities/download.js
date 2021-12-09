/**
 * 
 * @param {String} file_content 
 * s@param {String} file_name 
 * @param {Boolean} json 
 *
 */
const dowload = (file_content, file_name, mime_type = "text/plain") => {

    var element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', `data:${mime_type};charset=utf-8,` + encodeURIComponent(file_content));
    element.setAttribute('download', file_name);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export default dowload