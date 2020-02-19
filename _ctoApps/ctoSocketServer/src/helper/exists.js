/**
 * @return {boolean}
 */
export default function Exists(data) {

    if (typeof data === 'undefined' || data === null) {
        return false;
    } else {
        return true;
    }

}