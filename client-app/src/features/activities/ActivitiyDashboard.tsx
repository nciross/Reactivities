import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react'
import { Activity } from '../../app/models/activity';
import { useStore } from '../../app/stores/store';
import ActivityList from './ActivityList'
import ActivityDetails from './details/ActivityDetails';
import ActivityForm from './forms/ActivityForm';

interface Props {
    createOrEdit: (activity: Activity) => void,
    deleteActivity: (id: string) => void,
    submitting: boolean
}
export default observer(function ActivityDashboard({ createOrEdit, deleteActivity, submitting }: Props) {
    const { activityStore } = useStore();
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width={6}>
                {activityStore.selectedActivity && !activityStore.editMode && <ActivityDetails />}
                {activityStore.editMode && <ActivityForm createOrEdit={createOrEdit} submitting={submitting} />}
            </Grid.Column>
        </Grid >
    )
})