const EventBus = {
	computed: {
        eventBus() {
          let target = this;
          while (target && !target._eventBus) {
            target = target.$parent;
          }
          if (!target) {
            throw new Error('should have event bus on ancestor');
          }
          return target._eventBus;
        }
    }
};
export default EventBus;
