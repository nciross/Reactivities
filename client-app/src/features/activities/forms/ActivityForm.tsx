import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm, loading, createActivity, updateActivity } = activityStore
    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
    }
    const [activity, setActivity] = useState(intialState);
    function hundleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }
    function hundleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
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
                <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>
    )
})