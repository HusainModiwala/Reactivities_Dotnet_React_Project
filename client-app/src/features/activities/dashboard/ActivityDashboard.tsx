import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean
    openForm: (id?: string) => void;
    closeForm: () => void;
    createOrEditActivity: (activity: Activity) => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, 
  cancelSelectActivity, editMode, openForm, closeForm, createOrEditActivity, deleteActivity} : Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities}
        selectActivity = {selectActivity}
        deleteActivity = {deleteActivity}/>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode &&
        <ActivityDetails activity={selectedActivity} 
        cancelSelectActivity = {cancelSelectActivity}
        openForm = {openForm}/>}
        {editMode && <ActivityForm selectedActivity = {selectedActivity} closeForm = {closeForm} createOrEditActivity = {createOrEditActivity}/>}
      </Grid.Column>
    </Grid>
  );
}
