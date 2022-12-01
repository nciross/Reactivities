
import { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
import { useStore } from "../../app/stores/store";
interface Props {
    deleteActivity: (id: string) => void,
    submitting: boolean
}


function ActivityList({ deleteActivity, submitting }: Props) {
    const { activityStore } = useStore();
    const [target, setTarget] = useState('');

    function hundleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    return (
        <Segment>
            <Item.Group>
                {activityStore.activities.map((activity) => (
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
                                <Button floated='right' content='View' color='blue' onClick={() => activityStore.selectActivity(activity.id)} />
                                <Button
                                    name={activity.id}
                                    loading={submitting && target === activity.id}
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
}
export default ActivityList;