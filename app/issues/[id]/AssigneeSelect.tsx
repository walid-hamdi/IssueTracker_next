"use client";

import Skeleton from "@/app/components/Skeleton";
import { issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import toast, { ToastBar, ToastIcon, Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <>
      <Select.Root
        defaultValue={
          issue.assignedToUserId ? issue.assignedToUserId : "unassigned"
        }
        onValueChange={(userId) => {
          axios
            .patch(`/api/issues/${issue?.id}`, {
              assignedToUserId: userId !== "unassigned" ? userId : null,
            })
            .catch(() => {
              toast("Changed couldn't be saved.");
            });
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item key={user.id} value={user?.id}>
                  {user?.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
