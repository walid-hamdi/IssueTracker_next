import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">Add New Issue</Link>
        </Button>
      </div>
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
