import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row>
                <Table.Cell key={issue.id}>
                  <Flex justify="between">
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${issue.id}`}> {issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image!}
                        alt={issue.title}
                        size="2"
                        radius="full"
                        // className="cursor-pointer"
                        fallback="?"
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
