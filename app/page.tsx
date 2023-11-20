import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

const page = async () => {
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const statues = {
    closed,
    inProgress,
    open,
  };

  return (
    <main>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary {...statues} />
          <IssueChart {...statues} />
        </Flex>
        <LatestIssues />
      </Grid>
    </main>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View issue dashboard",
  keywords:
    "issues, bug tracking, task management, project management, issue dashboard, software development, bug report, issue tracking system, project tracking",
};

export default page;
