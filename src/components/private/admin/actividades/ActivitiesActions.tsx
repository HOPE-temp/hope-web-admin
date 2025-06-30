import React from "react";
import { ActivitiesEditDialog } from "./ActivitiesEditDialog";
import { ActivitiesDeleteDialog } from "./ActivitiesDeleteDialog";
import { Activity, UpdateActivityInput } from "@/hooks/useActivities";

interface Props {
  activity: Activity;
  updateActivity: (id: number, input: UpdateActivityInput) => Promise<any>;
  deleteActivity: (id: number) => Promise<any>;
}

export const ActivitiesActions = ({ activity, updateActivity, deleteActivity }: Props) => (
  <div className="flex gap-2">
    <ActivitiesEditDialog activity={activity} updateActivity={updateActivity} />
    <ActivitiesDeleteDialog activity={activity} deleteActivity={deleteActivity} />
  </div>
);