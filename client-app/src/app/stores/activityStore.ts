import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    formSubmit: boolean = false;
    loadingInitial: boolean = true;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date)
        })
    }

    loadingActivities = async () => {
        //this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity=>{
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            });
        } catch (error) {
            console.log(error);
        }
        this.setLoadingInitial(false);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
      }
    
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        runInAction(()=>{
            this.formSubmit = true;
        })     
        try {
            activity.id = uuid();
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
            })
        } catch (error) {
            console.log(error);
        }
        runInAction(() => {
            this.editMode = false;
            this.formSubmit = false;
        })
    }

    updateActivity = async (activity: Activity) => {
        runInAction(() => {
            this.formSubmit = true
        }) 
        try {
            await agent.Activities.update(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
            })
        } catch (error) {
            console.log(error);
        }
        runInAction(()=>{
            this.editMode = false;
            this.formSubmit = false;
        })
    }

    deleteActivity = async (id: string) => {
        runInAction(()=>{
            this.loading = true; 
        })  
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
            })
        } catch (error) {
            console.log(error);
        }
        runInAction(()=>{
            this.loading = false;
        })     
    }
}

