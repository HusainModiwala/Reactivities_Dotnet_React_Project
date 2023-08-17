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
    loadingInitial: boolean = false;

    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date)
        })
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }


    loadingActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity=>{
                this.setActivity(activity);
            });
        } catch (error) {
            console.log(error);
        }        
        this.setLoadingInitial(false);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    loadingActivity = async(id: string)=>{
        if(this.activityRegistry.has(id)) {
            this.selectedActivity = this.activityRegistry.get(id);
            return this.activityRegistry.get(id);
        } else {
            try {
                this.setLoadingInitial(true);
                const activity = await agent.Activities.details(id);
                runInAction(()=>{
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
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
                if(this.selectedActivity?.id === id) {
                    this.selectedActivity = undefined;
                }
            })
        } catch (error) {
            console.log(error);
        }
        runInAction(()=>{
            this.loading = false;
        })     
    }
}