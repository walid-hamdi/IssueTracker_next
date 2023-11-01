import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import IssueAction from "./IssueAction";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);

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
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}{" "}
                <div className="block md:hidden">
                  <IssueStatusBadge issue={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge issue={issue.status} />
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
