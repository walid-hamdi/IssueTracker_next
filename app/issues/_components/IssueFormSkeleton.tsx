import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "../../components/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <Box className="w-1/3 p-4 ">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
