import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuidv4 } from 'uuid';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { loading, loadingInitial, createActivity, updateActivity, loadActivity } = activityStore
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    });
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity])
    function hundleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity, id: uuidv4()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }
    function hundleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
    if (loadingInitial) return <LoadingComponent />;
    return (
        <Segment clearing>
            <Form onSubmit={hundleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={hundleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={hundleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={hundleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={hundleInputChange} type='date' />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={hundleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={hundleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' as={Link} to={'/activities'} />
            </Form>
        </Segment>
    )
})