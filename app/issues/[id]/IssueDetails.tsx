import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Card className="w-96">
      <Heading size="5" weight="bold">
        {issue.title}
      </Heading>

      <Text>{issue.description}</Text>
      <IssueStatusBadge status={issue.status} />

      <Flex justify="between" align="center">
        <Text size="1" className="mb-2">
          Created on: {new Date(issue.createdAt).toDateString()}
        </Text>
      </Flex>
    </Card>
  );
};

export default IssueDetails;
