"use client";

import { Select } from "@radix-ui/themes";
import axios from "axios";
import { User } from "next-auth";
import { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const fetch = async () => {
      const { data: users } = await axios.get<User[]>("/api/users");
      setUsers(users);
      console.log(users);
    };

    fetch();
  }, users);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users &&
            users?.length > 0 &&
            users?.map((user) => {
              return <Select.Item value={user?.id}>{user?.name}</Select.Item>;
            })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
