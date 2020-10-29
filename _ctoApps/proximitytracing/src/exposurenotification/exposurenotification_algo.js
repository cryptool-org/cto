"use strict";

//Implementation of Privacy-Preserving Contact Tracing protocol "Exposure Notification".
//Specification: https://www.apple.com/covid19/contacttracing/

const ExposureNotification = (() => {
    
    //Length of an epoch (in minutes):
    const EPOCH_LENGTH = 10;

    //Number of epochs per day:
    const NUM_EPOCHS_PER_DAY = Math.floor(24 * 60 / EPOCH_LENGTH);

    //Size of rolling proximity ids:
    const ROLLING_PROXIMITY_ID_SIZE = 16;

    //Size of a Temporary Exposure Key:
    const TEMPORARY_EXPOSURE_KEY_SIZE = 16;

    const EN_RPIK = sjcl.codec.utf8String.toBits("EN-RPIK");
    const EN_RPI = sjcl.codec.utf8String.toBits("EN-RPI");
    const PAD_FILL = sjcl.codec.bytes.toBits(new Array(6).fill(0));

    class ExposureNotification {

        /**
         * Creates a private initial key for a user.
         * 
         * In "Exposure Notification", there are no initial keys.
         */
        createInitialKey() {
            return null;
        }

        /**
         * Returns list of "daysCount" subsequent day keys starting from day "startDay".
         * Those keys are derived from user's private "initialKey".
         * 
         * In "Exposure Notification", day keys are called "Temporary Exposure Key".
         */
        getSecretDayKeys(initialKey, startDay, daysCount) {
            const dayKeys = [];
            for (let dayIndex = 0; dayIndex < daysCount; dayIndex++) {
                const randomWords = sjcl.random.randomWords(TEMPORARY_EXPOSURE_KEY_SIZE / 4);
                const tek = sjcl.codec.bytes.fromBits(randomWords);
                dayKeys.push(tek);
            }
            return dayKeys;
        }

        /**
         * Generates one possible history of all broadcast IDs on one specific day.
         * The "day" and corresponding "dayKey" are needed for deriving those IDs.
         * 
         * In "Exposure Notification", broadcast IDs are called "Rolling Proximity Identifiers".
         */
        generateBroadcastHistoryForDay(day, dayKey) {
            const rollingProxIds = this._getAllRollingProxIdsForDay(day, dayKey);
            return rollingProxIds.map(entry => ({ time: entry.timeSlot, broadcastId: entry.rpi }));
        }

        /**
         * Returns list of all broadcast IDs which can be derived from one day key. 
         * The parameter "startDay" corresponds to the parameter "dayKey".
         * 
         * In "Exposure Notification", Rolling Proximity Identifiers of only one day can be derived from
         * the Daily Tracing Key. 
         */
        getAllBroadcastIdsFromDayKey(startDay, dayKey, maxDaysCount) {
            const rollingProxIds = this._getAllRollingProxIdsForDay(startDay, dayKey);
            return rollingProxIds.map(entry => ({ day: startDay, broadcastId: entry.rpi }));
        }

        /**
         * Returns list of all day keys to report to the public server in case the user
         * with "initialKey" reports himself as infected.
         * 
         * In "Exposure Notification", day keys are not derived from an "initial key".
         * Instead, the "Temporary Exposure Key" are randomly generated keys which are stored
         * in the app of the person.
         */
        getAllDayKeysToReport(_, dayKeyStorage, startDay, startDayIndex, maxDaysCount) {
            const dayKeys = [];
            for (let dayIndex = startDayIndex; dayIndex < startDayIndex + maxDaysCount; dayIndex++) {
                dayKeys.push({ dayIndex, dayKey: dayKeyStorage(dayIndex) });
            }
            return dayKeys;
        }

        _getAllRollingProxIdsForDay(day, dayKey) {
            const dayStart = startOfDay(day);
            const tek = sjcl.codec.bytes.toBits(dayKey);
            const rpik = sjcl.misc.hkdf(tek, ROLLING_PROXIMITY_ID_SIZE * 8, null, EN_RPIK, sjcl.hash.sha256);
            const aes = new sjcl.cipher.aes(rpik);

            const timeSlots = [];
            for (let epoch = 0; epoch < NUM_EPOCHS_PER_DAY; epoch++) {
                const timeSlot = new Date(dayStart);
                timeSlot.setMinutes(timeSlot.getMinutes() + epoch * EPOCH_LENGTH);
                const enIntervalNumber = timeSlot.getTime() / (1000 * 60 * EPOCH_LENGTH) | 0;

                const paddedData = sjcl.bitArray.concat(EN_RPI, PAD_FILL).concat([enIntervalNumber]);
                const rpi = aes.encrypt(paddedData);

                timeSlots.push({ timeSlot, rpi: sjcl.codec.bytes.fromBits(rpi) });
            }

            return timeSlots;
        }
    }

    return ExposureNotification;

})();