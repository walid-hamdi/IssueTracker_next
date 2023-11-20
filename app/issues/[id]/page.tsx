import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt(params.id);
  const session = await getServerSession(authOptions);

  if (isNaN(id)) notFound();

  const issue = await fetchUser(id);

  if (!issue) {
    notFound();
  }

  return (
    <div className="sm:flex sm:flex-col md:flex-row gap-5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      {session?.user && (
        <Box className="flex h-fit gap-2 flex-col ">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      )}
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Issue Details - " + issue?.id,
  };
}

export default IssueDetailsPage;
