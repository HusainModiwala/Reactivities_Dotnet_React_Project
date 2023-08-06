import React, { ChangeEvent, useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props{
  selectedActivity: Activity | undefined;
  closeForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
}

export default function ActivityForm({selectedActivity, closeForm, createOrEditActivity}: Props) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = event.target;
    setActivity({...activity, [name]: value});
  }
  
  return (
    <Segment clearing>
      <Form onSubmit = {() => createOrEditActivity(activity)}>
        <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange} />
        <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange} />
        <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
        <Form.Input placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}/>
        <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}/>
        <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}/>
        <Button floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={() => closeForm()} />
      </Form>
    </Segment>
  );
}
