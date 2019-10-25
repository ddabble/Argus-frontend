import React from 'react';
import AlertView from './views/alertView/AlertView';
import LoginView from './views/loginView/LoginView';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './protected.route';
import './variables.css';
import './colorscheme.css';
import NotificationProfileView from './views/notificationProfileView/NotificationProfileView';
import ActiveProfile from './components/active-profiles/ActiveProfile';
import TestView from './views/testView/TestView.js';
const App: React.SFC = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path='/' component={AlertView} />
        <ProtectedRoute
          path='/notification-profile'
          component={NotificationProfileView}
        />
        <Route path='/login' component={LoginView} />
        <Route path='/profile' component={ActiveProfile} />
        <Route path='/testview' component={TestView} />
        <Route path='*' component={() => <h1>404 not found</h1>} />
      </Switch>
    </div>
  );
};

export default App;
