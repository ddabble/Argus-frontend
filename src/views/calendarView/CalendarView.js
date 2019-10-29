import React from 'react';
import WeekCalendar from 'react-week-calendar';
import './CalendarView.css';
import moment from 'moment';
import Modal from './Modal.js';
import Event from "./Event";
import axios from "axios";

export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUid: 0,
      selectedIntervals: []
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
      console.log('here is the event: ', event);
      this.setState({ selectedIntervals });
    }
  };

  handleSelect = newIntervals => {
    const { lastUid, selectedIntervals } = this.state;
    let colorCode = this.colorPicker[this.colorIndex];
    this.colorIndex+=1;
    for (let i = 0; i < selectedIntervals.length; i++) {
      if (selectedIntervals[i].value === newIntervals[0].value) {
        colorCode = selectedIntervals[i].color;
        this.colorIndex-=1;
        break
      }
    }
    const intervals = newIntervals.map((interval, index) => {
      return {
        ...interval,
        uid: lastUid + index,
        color: colorCode
      };
    });

    console.log(intervals[0]);
    this.postNotificationProfile(intervals[0].value, intervals[0].start.format(), intervals[intervals.length-1].end.format(), intervals[0].color);
    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    });
  };

  postNotificationProfile = async (name, start, stop, color) => {
    await axios({
      url: 'http://localhost:8000/notificationprofiles/',
      method: 'POST',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
        'content-type': 'application/json'
      },
      data: `{
        "name": "${name}",
        "interval_start": "${start}",
        "interval_stop": "${stop}",
        "color": "${color}"
      }`
    }).then((response) => {
      return response.data;
    });
  };

  colorIndex = 0;

  colorPicker = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ecf0f1',
    '#95a5a6',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d'
  ];


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
        eventComponent={Event}
        firstDay={moment('2019-10-21')}
        selectedIntervals={this.state.selectedIntervals}
        onIntervalSelect={this.handleSelect}
        onIntervalUpdate={this.handleEventUpdate}
        onIntervalRemove={this.handleEventRemove}
      />
    );
  }
}
