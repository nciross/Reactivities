import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivitiyDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/forms/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
function App() {
  const loacation = useLocation();
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/activities'} element={<ActivityDashboard />} />
        <Route path={'/activities/:id'} element={<ActivityDetails />} />
        <Route key={loacation.key} path={'/createActivity'} element={<ActivityForm />} />
        <Route key={loacation.key} path={'/manage/:id'} element={<ActivityForm />} />
        </Routes>
           </Container>
    </>
  );
}

export default observer(App);

