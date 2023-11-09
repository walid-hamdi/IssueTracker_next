import { Text } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link
      href={`/issues/${issueId}/edit`}
      className="bg-indigo-400 rounded-md text-white py-1 px-3 flex items-center justify-center"
    >
      <AiOutlineEdit />
      <Text className="pl-2">Edit</Text>
    </Link>
  );
};

export default EditIssueButton;
