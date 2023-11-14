import prisma from "@/prisma/client";
import { Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const id = parseInt(params.id);
  const session = await getServerSession(authOptions);

  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

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
          <AssigneeSelect />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      )}
    </div>
  );
};

export default IssueDetailsPage;
