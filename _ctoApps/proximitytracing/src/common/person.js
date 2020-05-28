class Person {

    constructor(name) {
        this.name = name;
        this.isReported = false;
        this.broadcastHistory = Array(OBSERVATION_DAYS - 1).fill(null);
    }

    getName() {
        return this.name;
    }

    getInitialKey() {
        if (!this.initialKey) {
            this.initialKey = algo.createInitialKey();
        }
        return this.initialKey;
    }

    setIsReported() {
        this.isReported = true;
    }

    getIsReported() {
        return this.isReported;
    }

    getDayKey(dayIndex) {
        return this.getBroadcastHistory(dayIndex).dayKey;
    }

    getBroadcastHistory(dayIndex) {
        if (!this.broadcastHistory[dayIndex]) {
            this.broadcastHistory[dayIndex] = this._generateBroadcastHistory(dayIndex);
        }

        return this.broadcastHistory[dayIndex];
    }

    _generateSecretDayKey() {
        if (!this.secretDayKeys) {
            const startTime = getDayForIndex(0);
            this.secretDayKeys = algo.getSecretDayKeys(this.getInitialKey(), startTime, OBSERVATION_DAYS);
        }
    }

    _generateBroadcastHistory(dayIndex) {
        this._generateSecretDayKey();
        const dayKey = this.secretDayKeys[dayIndex];

        const timeSlots = [];
        const day = getDayForIndex(dayIndex);
        algo.generateBroadcastHistoryForDay(day, dayKey).forEach(slot =>
            timeSlots.push({ time: slot.time, broadcastId: slot.broadcastId, hadContact: false })
        );
        return { day, dayKey, timeSlots };
    }
}