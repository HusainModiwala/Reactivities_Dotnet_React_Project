import React, { useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

export default observer(function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity: activity, cancelSelectedActivity, loadingInitial, loadingActivity} = activityStore;
  const {id} = useParams();
  
  useEffect(() => {
    if(id) loadingActivity(id);
  }, [id, loadingActivity])
  
  if(!activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
            <Button basic color="blue" content='Edit'  />
            <Button basic color="grey" content='Cancel' onClick={() => cancelSelectedActivity()}/>
        </Button.Group>
      </Card.Content>
    </Card>
  );
})