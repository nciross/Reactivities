import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivitiyDashboard';
import { Activity } from '../models/activity';
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(response => {
      setActivities(response.data)
    })
  }, [])
  function hundleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id == id))
  }
  function hundleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function hundleFormOpen(id?: string) {
    id ? hundleSelectActivity(id) : hundleCancelSelectActivity();
    setEditMode(true);
  }
  function hundleFormClose() { setEditMode(false) }
  function hundleCerateOrEditActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id != activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  function hundleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id != id)])
    setEditMode(false);
    setSelectedActivity(undefined);
  }
  return (
    <>
      <NavBar formOpen={hundleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={hundleSelectActivity}
          cancelSelectActivity={hundleCancelSelectActivity}
          editMode={editMode}
          formOpen={hundleFormOpen}
          formClose={hundleFormClose}
          createOrEdit={hundleCerateOrEditActivity}
          deleteActivity={hundleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
function uuid(): string {
  throw new Error('Function not implemented.');
}

