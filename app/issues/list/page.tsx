import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import IssueAction from "./IssueAction";
import Link from "../../components/Link";
import { Status, issue } from "@prisma/client";
import NavLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const Issues = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof issue };
}) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  const columns: { label: string; value: keyof issue; className?: string }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },

    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  return (
    <>
      <IssueAction />
      {issues.length > 0 && (
        <Table.Root variant="surface">
          <Table.Header>
            {columns.map((column) => {
              return (
                <Table.Cell key={column.value} className={column.className}>
                  <NavLink
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                      },
                    }}
                  >
                    {column.label}{" "}
                  </NavLink>
                  {searchParams.orderBy === column.value && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Table.Cell>
              );
            })}
          </Table.Header>

          <Table.Body>
            {issues.map((issue: issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
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
      )}
    </>
  );
};

export default Issues;
