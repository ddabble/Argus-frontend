import React from 'react';
import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import moment from 'moment';
import Modal from './Modal.js';

export default class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUid: 4,
      selectedIntervals: [
        {
          uid: 1,
          start: moment({ h: 10, m: 5 }),
          end: moment({ h: 12, m: 5 }),
          value: 'Booked by Smith'
        },
        {
          uid: 2,
          start: moment({ h: 13, m: 0 }).add(2, 'd'),
          end: moment({ h: 13, m: 45 }).add(2, 'd'),
          value: 'Closed'
        },
        {
          uid: 3,
          start: moment({ h: 11, m: 0 }),
          end: moment({ h: 14, m: 0 }),
          value: 'Reserved by White'
        }
      ]
    };
  }

  handleEventRemove = event => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex(
      interval => interval.uid === event.uid
    );
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({ selectedIntervals });
    }
  };

  handleEventUpdate = event => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex(
      interval => interval.uid === event.uid
    );
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({ selectedIntervals });
    }
  };

  handleSelect = newIntervals => {
    const { lastUid, selectedIntervals } = this.state;
    const intervals = newIntervals.map((interval, index) => {
      return {
        ...interval,
        uid: lastUid + index
      };
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    });
    console.log(selectedIntervals, lastUid);
  };

  render() {
    return (
      <WeekCalendar
        startTime={moment({ h: 0, m: 0 })}
        endTime={moment({ h: 23, m: 59 })}
        cellHeight={25}
        numberOfDays={7}
        dayFormat={'ddd'}
        scaleUnit={60}
        modalComponent={Modal}
        firstDay={moment('2019-10-21')}
        selectedIntervals={this.state.selectedIntervals}
        onIntervalSelect={this.handleSelect}
        onIntervalUpdate={this.handleEventUpdate}
        onIntervalRemove={this.handleEventRemove}
      />
    );
  }
}
