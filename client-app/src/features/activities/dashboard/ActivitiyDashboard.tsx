import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivitFilters from './ActivityFilters';
import ActivityList from './ActivityList'

export default observer(function ActivityDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;
    useEffect(() => {
        if (activityRegistry.size <= 1) activityStore.loadActivities();
    }, [activityRegistry.size, loadActivities])
    if (activityStore.loadingInitial) return <LoadingComponent inverted={true} content='Load app...' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivitFilters />
            </Grid.Column>
        </Grid >
    )
})