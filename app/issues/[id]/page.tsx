import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
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
        <Link
          href={`issues/${issue.id}/edit`}
          className="bg-indigo-400 rounded-md text-white py-1 px-3 flex items-center justify-center"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <Text className="pl-2">Edit</Text>
        </Link>
      </Flex>
    </Card>
  );
};

export default IssueDetails;
