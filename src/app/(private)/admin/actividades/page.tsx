"use client";

import * as React from "react";
import { ActivitiesTable } from "@/components/private/admin/actividades/ActivitiesTable";
import { ActivitiesCreateDialog } from "@/components/private/admin/actividades/ActivitiesCreateDialog";
import { createActivitiesColumns } from "@/components/private/admin/actividades/ActivitiesColumns";
import { useActivities } from "@/hooks/useActivities";
import type { ActivityTableRow } from "@/hooks/useActivities";

export default function AdminActividadesPage() {
  const { activities, createActivity, updateActivity, deleteActivity, finishActivity } = useActivities();
  const tableRows: ActivityTableRow[] = activities as ActivityTableRow[];
  const columns = createActivitiesColumns({
    updateActivity,
    deleteActivity,
    finishActivity,
  }) as import("@tanstack/react-table").ColumnDef<ActivityTableRow, any>[];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-lg bg-white shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Actividades</h2>
          <ActivitiesCreateDialog createActivity={createActivity} />
        </div>
        <ActivitiesTable data={tableRows} columns={columns} />
      </div>
    </div>
  );
}
