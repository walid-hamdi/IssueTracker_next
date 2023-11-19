"use client";

import Skeleton from "@/app/components/Skeleton";
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "next-auth";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const onChangeValue = (userId: string) =>
    axios
      .patch(`/api/issues/${issue?.id}`, {
        assignedToUserId: userId !== "unassigned" ? userId : null,
      })
      .catch(() => {
        toast("Changed couldn't be saved.");
      });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <>
      <Select.Root
        defaultValue={
          issue.assignedToUserId ? issue.assignedToUserId : "unassigned"
        }
        onValueChange={onChangeValue}
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

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      await axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 1000 * 60,
    retry: 3,
  });
};

export default AssigneeSelect;
