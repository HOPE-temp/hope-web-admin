import { ActivitiesEditDialog } from "./ActivitiesEditDialog"
import { ActivitiesDeleteDialog } from "./ActivitiesDeleteDialog"
import type { Activity } from "./ActivitiesTable"
import type { UpdateActivityInput } from "./ActivitiesEditDialog"

interface Props {
  activity: Activity
  updateActivity: (id: number, input: UpdateActivityInput) => Promise<any>
  deleteActivity: (id: number) => Promise<any>
  updaloadImageActivity: (id: number, file: File) => Promise<any>
}

export const ActivitiesActions = ({ activity, updateActivity, deleteActivity, updaloadImageActivity }: Props) => (
  <div className="flex items-center gap-1">
    <ActivitiesEditDialog activity={activity} updateActivity={updateActivity} updaloadImageActivity={updaloadImageActivity}/>
    <ActivitiesDeleteDialog activity={activity} deleteActivity={deleteActivity} />
  </div>
)
