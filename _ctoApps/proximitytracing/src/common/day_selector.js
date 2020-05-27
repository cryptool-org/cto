
class DaySelector {

    constructor(onDayChanged) {
        this.onDayChanged = onDayChanged;
        this.$previousDayPager = jQueryFind("#previous-day-pager");
        this.$nextDayPager = jQueryFind("#next-day-pager");
        this.currentDayIndex = 0;
        this.maxDayIndex = 0;

        const self = this;
        this.$previousDayPager.on('click', function (event) {
            event.preventDefault();
            if (self.currentDayIndex > 0) {
                self.currentDayIndex--;
                self._update();
            }
        });
        this.$nextDayPager.on('click', function (event) {
            event.preventDefault();
            if (self.currentDayIndex < self.maxDayIndex) {
                self.currentDayIndex++;
                self._update();
            }
        });
    }

    reset(maxDayIndex) {
        this.maxDayIndex = maxDayIndex;
        this.currentDayIndex = 0;
        this._update();
    }

    _update() {
        if (this.currentDayIndex > 0) {
            this.$previousDayPager.removeClass("disabled");
        } else {
            this.$previousDayPager.addClass("disabled");
        }

        if (this.currentDayIndex < this.maxDayIndex) {
            this.$nextDayPager.removeClass("disabled");
        } else {
            this.$nextDayPager.addClass("disabled");
        }

        this.onDayChanged(this.currentDayIndex);
    }
}