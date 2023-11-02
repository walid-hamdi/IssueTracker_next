import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetails = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Card className="w-1/3 p-4 ">
      <Heading size="5" weight="bold">
        {issue.title}
      </Heading>

      <Text>{issue.description}</Text>
      <IssueStatusBadge status={issue.status} />

      <Flex justify="between" align="center">
        <Text size="1" className="mb-2">
          Created on: {new Date(issue.createdAt).toDateString()}
        </Text>
        <button className="text-blue-500 hover:underline">Edit</button>
      </Flex>
    </Card>
  );
};

export default IssueDetails;
