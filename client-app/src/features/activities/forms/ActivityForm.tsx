import React, { ChangeEvent, useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer (function ActivityForm() {
  const{activityStore} = useStore();
  const {selectedActivity, closeForm, createActivity, updateActivity, formSubmit} = activityStore;

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

  function handleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity);
  }
  
  return (
    <Segment clearing>
      <Form onSubmit = {() => handleSubmit()}>
        <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange} />
        <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange} />
        <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
        <Form.Input type="date" placeholder='Date' name='date' value={activity.date} onChange={handleInputChange}/>
        <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}/>
        <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}/>
        <Button loading={formSubmit} floated='right' positive type='submit' content='Submit' />
        <Button floated='right' type='button' content='Cancel' onClick={() => closeForm()} />
      </Form>
    </Segment>
  );
})