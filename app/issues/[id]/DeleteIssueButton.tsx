"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      router.push("/issues/list");
      await axios.delete(`/api/issues/${issueId}`);
      setDeleting(true);
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            disabled={isDeleting}
            color="red"
            className="rounded-md text-white py-1 px-3 flex items-center justify-center"
          >
            <AiOutlineDelete />
            <Text>Delete </Text> {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Deletion confirmation</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete?
          </AlertDialog.Description>
          <Flex gap="1" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Something went wrong when you try to delete try again.
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button
              color="gray"
              variant="soft"
              mt="2"
              onClick={() => {
                setError(false);
              }}
            >
              Ok
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
