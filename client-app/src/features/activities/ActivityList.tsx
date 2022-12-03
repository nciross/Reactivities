
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, loading, activitiesByDate } = activityStore
    const [target, setTarget] = useState('');

    function hundleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group>
                {activitiesByDate.map((activity) => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {activity.title}
                            </Item.Header>
                            <Item.Meta>
                                {activity.date.toString()}
                            </Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue' as={Link} to={`/activities/${activity.id}`} />
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    floated='right'
                                    content='Delete'
                                    color='red' onClick={(e) => hundleActivityDelete(e, activity.id)} />
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
