import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
  selectedActivity: Activity | undefined;
  closeForm: () => void;
}

export default function ActivityForm({selectedActivity, closeForm}: Props) {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title' />
        <Form.TextArea placeholder='Description' />
        <Form.Input placeholder='Category' />
        <Form.Input placeholder='Date' />
        <Form.Input placeholder='City' />
        <Form.Input placeholder='Venue' />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={() => closeForm()} />
      </Form>
    </Segment>
  );
}
