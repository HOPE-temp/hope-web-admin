import React from "react";
import { UserEditDialog } from "./UserEditDialog";
import { UserDeleteDialog } from "./UserDeleteDialog";
import { UserTableRow, UpdateUserInput } from "@/hooks/useUser";

interface Props {
  user: UserTableRow;
  updateUser: (id: number, input: UpdateUserInput) => Promise<any>;
  deleteUser: (id: number) => Promise<any>;
}

export const UserActions = ({ user, updateUser, deleteUser }: Props) => (
  <div className="flex gap-2">
    <UserEditDialog user={user} updateUser={updateUser} />
    <UserDeleteDialog user={user} deleteUser={deleteUser} />
  </div>
);
