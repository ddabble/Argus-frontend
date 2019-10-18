import React, { useState } from 'react';
import './NotificationProfileView.css';
import Header from '../../components/header/Header';
import '../../components/react-table/table.css';
import { withRouter } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';

type PropType = {
  history: any;
};

const NotificationProfileView: React.FC<PropType> = props => {
  return (
    <div>
      <Header />
      <div className='calendar-container'>
        <Calendar />
      </div>
    </div>
  );
};

export default withRouter(NotificationProfileView);
