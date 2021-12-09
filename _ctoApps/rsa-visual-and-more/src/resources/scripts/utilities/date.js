/**
 * @returns 
 */
const get_curent_date_and_time = () => {
    const cur_date = new Date()
    const year = cur_date.getFullYear()
    const month = cur_date.getMonth() + 1 // getMonth() is zero indexed
    const day = cur_date.getDate()        // getDay() returns daynumber in week      
    const hour = cur_date.getHours()
    const minutes = (cur_date.getMinutes() < 10 ? '0' : '') + cur_date.getMinutes() // to get minutes with leading '0'
    return `${day}.${month}.${year} ${hour}:${minutes}`
}
/**
 * 
 * @returns 
 */
const get_curent_time = () => {
    const cur_date = new Date()
    const hour = cur_date.getHours()
    const minutes = (cur_date.getMinutes() < 10 ? '0' : '') + cur_date.getMinutes() // to get minutes with leading '0'
    return `${hour}:${minutes}`
}
/**
 * 
 * @returns 
 */
const get_curent_date = () => {
    const cur_date = new Date()
    const year = cur_date.getFullYear()
    const month = cur_date.getMonth() + 1 // getMonth() is zero indexed
    const day = cur_date.getDate()
    return `${day}.${month}.${year}`
}

export default { get_curent_date_and_time, get_curent_time, get_curent_date }
export { get_curent_date_and_time }
export { get_curent_time }
export { get_curent_date }