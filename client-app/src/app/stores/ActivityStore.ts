import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuidv4 } from 'uuid';

export default class ActivityStore {
    activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    constructor() {
        makeAutoObservable(this);
    }
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }
    loadActivities = async () => {
        try {
            this.loading = true;
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            })
            this.loading = false;
            this.setLoadingInitial(false);
        } catch (error) {
            this.setLoadingInitial(false);
            console.log(error);
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setEditMode = (state: boolean) => {
        this.editMode = state;
    }

    setSubmitting = (state: boolean) => {
        this.editMode = state;
    }

    selectActivity = async (id: string) => {
        try {
            const activity = await agent.Activities.details(id);
            activity.date = activity.date.split('T')[0];
            this.selectedActivity = activity;

        } catch (error) {
            console.log(error);
        }
    }
    cancelSelectActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectActivity();
        this.setEditMode(true);
    }
    closeForm = () => {
        this.setEditMode(false);
    }
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuidv4();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })

        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })

        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id)
                    this.cancelSelectActivity();
                this.loading = false;
            })

        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}
