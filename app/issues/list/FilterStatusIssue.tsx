"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const FilterStatusIssue = () => {
  const issueStatus: { label: string; value?: Status }[] = [
    {
      label: "All",
    },

    {
      label: "Open",
      value: "OPEN",
    },
    {
      label: "In Progress",
      value: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: "CLOSED",
    },
  ];

  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by issue..." />
      <Select.Content>
        {issueStatus.map((status) => {
          return (
            <Select.Item key={status.value} value={status.value || " "}>
              {status.label}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};

export default FilterStatusIssue;
