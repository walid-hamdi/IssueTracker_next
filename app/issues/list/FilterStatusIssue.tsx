"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const FilterStatusIssue = () => {
  const router = useRouter();
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

  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || " "}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status != " ") params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push(`/issues/list${query}`);
      }}
    >
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
