import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivitiyDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/forms/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
function App() {
  const loacation = useLocation();
  return (
    <>
      <Route exact path={'/'} component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path={'/activities'} component={ActivityDashboard} ></Route>
            <Route path={'/activities/:id'} component={ActivityDetails} ></Route>
            <Route key={loacation.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} ></Route>
          </Container>
        </>
      )} />

    </>
  );
}

export default observer(App);

