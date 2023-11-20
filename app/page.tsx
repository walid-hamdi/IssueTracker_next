import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Status } from "@prisma/client";

export default async function Home() {
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
}
