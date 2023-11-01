import { Table } from "@radix-ui/themes";
import React from "react";
import IssueAction from "./IssueAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssue = () => {
  const issues = [1, 2, 3, 4, 5, 6];
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
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssue;
