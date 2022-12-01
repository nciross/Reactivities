import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    submitting = false;
    constructor() {
        makeAutoObservable(this);
    }
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            this.loading = true;
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity);
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
                this.activities.push(activity);
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
                this.activities = [...this.activities.filter(x => x.id !== activity.id), activity];
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
        this.submitting = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activities = this.activities.filter(x => x.id !== id);
                this.selectedActivity = undefined;
                this.editMode = false;
                this.loading = false;
                this.submitting = true;

            })

        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
                this.submitting = true;

            })
        }
    }

}
