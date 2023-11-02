import { Heading, Flex, Box, Text } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingDetails = () => {
  return (
    <Box className="w-1/3 p-4 ">
      <Heading size="5" weight="bold">
        <Skeleton />
      </Heading>

      <Text>
        <Skeleton />
      </Text>
      <Skeleton />

      <Flex justify="between" align="center">
        <Text size="1" className="mb-2">
          <Skeleton />
        </Text>
        <button className="text-blue-500 hover:underline">Edit</button>
      </Flex>
    </Box>
  );
};

export default LoadingDetails;
