/* eslint-disable no-undef-expression */
const moment = require('moment');

const DATE_FORMAT = 'YYYYMMDD HH:mm:ss';

// HeartBeat generates a stream of updates to `timeRef`, with either
// simulated time updates, or real time updates, depending on the
// truthyness of `simulatedTime`
exports.HeartBeat = class {
  constructor(timeRef, simulatedTime) {
    this.simulationTime = moment.utc('2016-05-18 06:00', DATE_FORMAT);
    this.endOfSimulation = moment.utc('2016-05-20 18:00', DATE_FORMAT);
    this.timeRef = timeRef;
    this.simulated = simulatedTime;

    // Update the time once a second
    this.timeTimerId = setInterval(() => {
      this.timeAdvance();
    }, 1000);
  }

  timeAdvance() {
    if (this.simulated) {
      this.timeRef.set({
        display: this.simulationTime.format('h:mm A, MMM Do'),
        moment: this.simulationTime.valueOf()
      });
      this.simulationTime = this.simulationTime.add(30, 'seconds');
      if (this.simulationTime.diff(this.endOfSimulation, 'minutes') > 0) {
        // Reset simulation to start once we run out of bus trips.
        this.simulationTime = moment.utc('2016-05-18 06:00', DATE_FORMAT);
      }
    } else {
      const now = moment();
      this.timeRef.set({
        display: now.format('h:mm A, MMM Do'),
        moment: now.valueOf()
      });
    }
  }
};