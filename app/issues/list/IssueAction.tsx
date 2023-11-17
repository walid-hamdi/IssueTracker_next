import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FilterStatusIssue from "./FilterStatusIssue";

const IssueAction = () => {
  return (
    <Flex className="mb-5" justify="between" align="center">
      <FilterStatusIssue />
      <Button>
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
