import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Close", color: "green" },
};

const IssueStatusBadge = ({ issue }: { issue: Status }) => {
  const { color, label } = statusMap[issue];
  return <Badge color={color}>{label}</Badge>;
};

export default IssueStatusBadge;
