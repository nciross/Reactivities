import { Grid } from 'semantic-ui-react'
import { Activity } from '../../app/models/activity';
import ActivityList from './ActivityList'
import ActivityDetails from './details/ActivityDetails';
import ActivityForm from './forms/ActivityForm';
interface Props {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void,
    editMode: boolean,
    formOpen: (id: string) => void,
    formClose: () => void,
    createOrEdit: (activity: Activity) => void,
    deleteActivity: (id: string) => void,
}
export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, formOpen, formClose, createOrEdit, deleteActivity }: Props) {

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}

                />
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} formOpen={formOpen} />}
                {editMode && <ActivityForm activity={selectedActivity} formClose={formClose} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}