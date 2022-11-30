import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/ActivitiyDashboard';
import { Activity } from '../models/activity';
import axios from 'axios';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    setLoading(true);
    agent.Activities.list().then(response => {
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
      })
      setActivities(response);
      setLoading(false);

    });
  }, [])
  function hundleSelectActivity(id: string) {
    // setSelectedActivity(activities.find(x => x.id == id))
    agent.Activities.details(id).then((response) => {
      response.date = response.date.split('T')[0];
      setSelectedActivity(response);

    });
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id != activity.id), activity])
      });
    } else {
      activity.id = uuidv4();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities.filter(x => x.id != activity.id), activity])
      });
    }
    setEditMode(false);
    setSelectedActivity(activity);
    setSubmitting(false);
  }
  function hundleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id != id)])
      setEditMode(false);
      setSelectedActivity(undefined);
      setSubmitting(false);
    });

  }
  if (loading) return <LoadingComponent inverted={true} content='Load app...' />
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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;

