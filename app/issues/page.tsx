import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssueAction from "./IssueAction";
import Link from "../components/Link";

const Issues = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Cell>Issue</Table.Cell>
          <Table.Cell className="hidden md:table-cell">Status</Table.Cell>
          <Table.Cell className="hidden md:table-cell">Created</Table.Cell>
        </Table.Header>

        <Table.Body>
          {issues.map((issue: Issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Issues;
