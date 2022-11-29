
import { Button, Item, Segment } from "semantic-ui-react";
import { Activity } from "../../app/models/activity";
interface Props {
    activities: Activity[],
    selectActivity: (id: string) => void,
    deleteActivity: (id: string) => void,
}


function ActivityList({ activities, selectActivity, deleteActivity }: Props) {


    return (
        <Segment>
            <Item.Group>
                {activities.map((activity) => (
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
                                <Button floated='right' content='View' color='blue' onClick={() => selectActivity(activity.id)} />
                                <Button floated='right' content='Delete' color='red' onClick={() => deleteActivity(activity.id)} />
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}
export default ActivityList;