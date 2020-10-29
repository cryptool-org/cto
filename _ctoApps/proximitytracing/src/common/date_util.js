function startOfDay(date) {
    //Calculate start of day in UTC:
    const denominator = 1000 * 60 * 60 * 24;
    return new Date(((date.getTime() / denominator) | 0) * denominator);
}

function isSameDay(date1, date2) {
    return startOfDay(date1).valueOf() === startOfDay(date2).valueOf();
}

function getNumberOfDays(startDay) {
    const maxDay = getDayForIndex(getMaxDayIndex());
    return Math.floor((maxDay - startDay) / 1000 / 60 / 60 / 24) + 1;
}

function convertToUTC(date) {
    //Simply convert by adding timezone offset. 
    //Resulting object may still have the "wrong" timezone set, but object can be used for displaying purposes.
    const offset = date.getTimezoneOffset();
    const utcDate = new Date(date);
    utcDate.setMinutes(utcDate.getMinutes() + offset);
    return utcDate;
}

Date.prototype.toUTCDateString = function() {
    if ("${{ base.DATE_LOCALE }}$" === "ISO") {
        return this.toISOString().slice(0,10);
    }
    return convertToUTC(this).toLocaleDateString("${{ base.DATE_LOCALE }}$");
}

Date.prototype.toUTCTimeString = function() {
    if ("${{ base.DATE_LOCALE }}$" === "ISO") {
        return this.toISOString().slice(11,19);
    }
    return convertToUTC(this).toLocaleTimeString("${{ base.DATE_LOCALE }}$");
}

let observationStartTime = new Date();
observationStartTime.setDate(observationStartTime.getDate() - OBSERVATION_DAYS);
observationStartTime = startOfDay(observationStartTime);

function getDayForIndex(dayIndex) {
    const day = new Date(observationStartTime);
    day.setDate(day.getDate() + dayIndex);
    return day;
}

function getMaxDayIndex() {
    return OBSERVATION_DAYS - 1;  //(indices 0..OBSERVATION_DAYS-1)
}