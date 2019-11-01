import React, { useState, useEffect } from 'react';
import WeekCalendar from 'react-week-calendar';
import './CalendarView.css';
import moment from 'moment';
import Modal from './Modal.js';
import Event from './Event';
import axios from 'axios';

const CalendarView = props => {
  const [lastUid, setLastUid] = useState(0);
  const [selectedIntervals, setSelectedIntervals] = useState(
    props.notificationProfiles
  );
  let colorIndex = 0;
  console.log('dette er selected intervals kuk hore fitte:', selectedIntervals);

  const colorPicker = [
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

  console.log('dette er intervallene vi får:', selectedIntervals);

  const handleEventRemove = event => {
    const index = selectedIntervals.findIndex(
      interval => interval.uid === event.uid
    );
    if (index > -1) {
      console.log(event);
      //this.deleteProfile(event);
      selectedIntervals.splice(index, 1);
      setSelectedIntervals(selectedIntervals);
    }
  };

  const handleEventUpdate = event => {
    const index = selectedIntervals.findIndex(
      interval => interval.uid === event.uid
    );
    if (index > -1) {
      selectedIntervals[index] = event;
      console.log('here is the event: ', event);
      setSelectedIntervals(selectedIntervals);
    }
  };

  const deleteProfile = async item => {
    await axios({
      url: 'http://localhost:8000/notificationprofiles/' + item.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token')
      }
    });
  };

  const postNotificationProfile = async (name, start, stop) => {
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
        "interval_stop": "${stop}"  
      }`
    });
  };

  const intervalPoster = intervals => {
    for (let i = 0; i < intervals.length; i++) {
      postNotificationProfile(
        intervals[i].value,
        intervals[i].start.format(),
        intervals[i].end.format()
      );
    }
  };
  const handleSelect = newIntervals => {
    let colorCode = colorPicker[colorIndex];
    colorIndex += 1;
    for (let i = 0; i < selectedIntervals.length; i++) {
      if (selectedIntervals[i].value === newIntervals[0].value) {
        colorCode = selectedIntervals[i].color;
        colorIndex -= 1;
        break;
      }

      const intervals = newIntervals.map((interval, index) => {
        console.log(interval);
        return {
          ...interval,
          uid: lastUid + index,
          color: colorCode,
          id: ''
        };
      });

      intervalPoster(intervals);
    };

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
        firstDay={moment('2019-07-01')}
        selectedIntervals={selectedIntervals}
        onIntervalSelect={handleSelect}
        onIntervalUpdate={handleEventUpdate}
        onIntervalRemove={handleEventRemove}
      />
    );
  };
};

export default CalendarView;
