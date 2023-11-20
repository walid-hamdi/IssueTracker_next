import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueAction from "./IssueAction";
import IssueTable, { IssueQuery, columnsName } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const Issues = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnsName.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const where = { status };
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4">
      <IssueAction />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - List",
  description: "View all issues",
  keywords:
    "issues, bug tracking, task management, project management, issue list, bug list, issue tracking system, project tracking",
};

export default Issues;
