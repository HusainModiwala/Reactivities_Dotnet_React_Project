import React, { ChangeEvent, useEffect, useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik } from "formik";
import { values } from "mobx";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    formSubmit,
    loadingActivity,
    loadingInitial,
  } = activityStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id)
      loadingActivity(id).then((activity) => {
        activity!.date = activity!.date.split("T")[0];
        setActivity(activity!);
      });
  }, [id, loadingActivity]);

  // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
  //   const {name, value} = event.target;
  //   setActivity({...activity, [name]: value});
  // }

  // async function handleSubmit() {
  //   if(!activity.id){
  //     activity.id = uuid();
  //     await createActivity(activity)
  //   } else{
  //     await updateActivity(activity)
  //   }
  //   navigate(`/activities/${activity.id}`)
  // }

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;
  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ values: activity, handleChange, handleSubmit }) => (
          <Form onSubmit={() => handleSubmit()}>
            <Form.Input
              placeholder="Title"
              name="title"
              value={activity.title}
              onChange={handleChange}
            />
            <Form.TextArea
              placeholder="Description"
              name="description"
              value={activity.description}
              onChange={handleChange}
            />
            <Form.Input
              placeholder="Category"
              name="category"
              value={activity.category}
              onChange={handleChange}
            />
            <Form.Input
              type="date"
              placeholder="Date"
              name="date"
              value={activity.date}
              onChange={handleChange}
            />
            <Form.Input
              placeholder="City"
              name="city"
              value={activity.city}
              onChange={handleChange}
            />
            <Form.Input
              placeholder="Venue"
              name="venue"
              value={activity.venue}
              onChange={handleChange}
            />
            <Button
              loading={formSubmit}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
