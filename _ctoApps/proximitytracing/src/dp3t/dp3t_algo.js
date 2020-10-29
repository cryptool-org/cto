"use strict";

//Implementation of DP-3T protocol.
//Specification: https://github.com/DP-3T/documents

const Dp3t = (() => {
    
    //Fixed global default broadcast key for ephID generation:
    const BROADCAST_KEY = "broadcast key";

    //Length of an epoch (in minutes):
    const EPOCH_LENGTH = 15;

    //Number of epochs per day:
    const NUM_EPOCHS_PER_DAY = Math.floor(24 * 60 / EPOCH_LENGTH);

    //Size of ephIDs:
    const EPHID_SIZE = 16;

    //Size of a day key:
    const DAY_KEY_SIZE = 32;

    //Library SJCL requires us to call this method in order to use CTR:
    sjcl.beware["CTR mode is dangerous because it doesn't protect message integrity."]();

    class Dp3t {

        constructor() {
            this.iv = sjcl.codec.hex.toBits("00000000000000000000000000000000");
            this.broadcastKey = sjcl.codec.utf8String.toBits(BROADCAST_KEY);
        }

        /**
         * Creates a private initial key for a user.
         */
        createInitialKey() {
            const randomWords = sjcl.random.randomWords(DAY_KEY_SIZE / 4);
            return sjcl.codec.bytes.fromBits(randomWords);
        }

        /**
         * Returns list of "daysCount" subsequent day keys starting from day "startDay".
         * Those keys are derived from user's private "initialKey".
         * 
         * In DP-3T, the actual start day is irrelevant.
         */
        getSecretDayKeys(initialKey, startDay, daysCount) {
            const dayKeys = [];
            let currentKey = initialKey;
            dayKeys.push(currentKey);
            for (let dayIndex = 0; dayIndex < daysCount - 1; dayIndex++) {
                currentKey = this._hash(currentKey);
                dayKeys.push(currentKey);
            }
            return dayKeys;
        }

        /**
         * Generates one possible history of all broadcast IDs on one specific day.
         * The "day" and corresponding "dayKey" are needed for deriving those IDs.
         * 
         * In DP-3T, broadcast IDs are called EphId.
         */
        generateBroadcastHistoryForDay(day, dayKey) {
            const ephIds = this._getAllEphIdsForDay(dayKey);
            this._shuffle(ephIds);

            const timeSlots = [];

            let timeSlotIterator = startOfDay(day);
            const nextDayStart = startOfDay(day);
            nextDayStart.setDate(nextDayStart.getDate() + 1);
            let index = 0;
            while (timeSlotIterator < nextDayStart) {
                timeSlots.push({ time: new Date(timeSlotIterator), broadcastId: ephIds[index++] });
                timeSlotIterator.setMinutes(timeSlotIterator.getMinutes() + EPOCH_LENGTH);
            }

            return timeSlots;
        }

        /**
         * Returns list of all broadcast IDs which can be derived from one day key. 
         * The parameter "startDay" corresponds to the parameter "dayKey".
         * 
         * In DP-3T, EphIDs of all subsequent days after "startDay" can be derived. 
         * Only up to "maxDaysCount" days will be derived.
         */
        getAllBroadcastIdsFromDayKey(startDay, dayKey, maxDaysCount) {
            const ephIdsList = [];
            for (let dayIndex = 0; dayIndex < maxDaysCount; dayIndex++) {
                const ephIds = this._getAllEphIdsForDay(dayKey);
                const day = new Date(startDay);
                day.setDate(day.getDate() + dayIndex);
                ephIds.forEach(ephId => ephIdsList.push({ day, broadcastId: ephId }));
                dayKey = this._hash(dayKey);
            }
            return ephIdsList;
        }

        /**
         * Returns list of all day keys to report to the public server in case the user
         * with "initialKey" reports himself as infected.
         * 
         * In DP-3T, only the day key of the day on which the infection started needs to be reported,
         * because day keys of all subsequent days can be derived automatically from it.
         */
        getAllDayKeysToReport(initialKey, _, startDay, startDayIndex, maxDaysCount) {
            let dayKey = initialKey;
            for (let dayIndex = 0; dayIndex < startDayIndex; dayIndex++) {
                dayKey = this._hash(dayKey);
            }
            return [{ dayIndex: startDayIndex, dayKey }];
        }

        _hash(key) {
            const data = sjcl.codec.bytes.toBits(key);
            const hash = sjcl.hash.sha256.hash(data);
            return sjcl.codec.bytes.fromBits(hash);
        }

        _getAllEphIdsForDay(dayKey) {
            //Compare this to https://github.com/DP-3T/reference_implementation/blob/master/LowCostDP3T.py
            const hmac = new sjcl.misc.hmac(sjcl.codec.bytes.toBits(dayKey), sjcl.hash.sha256);
            const prf = hmac.encrypt(this.broadcastKey);
            const aes = new sjcl.cipher.aes(prf);
            const stream = sjcl.codec.bytes.toBits(new Array(EPHID_SIZE * NUM_EPOCHS_PER_DAY).fill(0));
            const prg = sjcl.mode.ctr.encrypt(aes, stream, this.iv);

            const ephIds = [];
            //Slice the PRG into ephIds of EPHID_SIZE bytes: 
            for (let epoch = 0; epoch < NUM_EPOCHS_PER_DAY; epoch++) {
                const offset = epoch * EPHID_SIZE * 8;
                const ephId = sjcl.bitArray.bitSlice(prg, offset, offset + EPHID_SIZE * 8);
                ephIds.push(sjcl.codec.bytes.fromBits(ephId));
            }

            return ephIds;
        }

        _shuffle(array) {
            //Taken from https://github.com/Daplie/knuth-shuffle/
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
    }

    return Dp3t;

})();