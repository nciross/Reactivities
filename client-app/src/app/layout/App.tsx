import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiyDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/forms/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
function App() {
  const loacation = useLocation();
  return (

    <>
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/activities'} element={
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <ActivityDashboard />
            </Container>
          </>} />
        <Route path={'/activities/:id'} element={
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <ActivityDetails />
            </Container>
          </>} />
        <Route path={'/createActivity'} element={
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <ActivityForm />
            </Container>
          </>} />
        <Route path={'/manage/:id'} element={
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <ActivityForm />
            </Container>
          </>} />
      </Routes>
    </>

  );
}

export default observer(App);

