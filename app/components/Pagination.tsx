import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

interface Props {
  itemCounts: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCounts, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCounts / pageSize);
  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button disabled={currentPage == 1}>
        <ChevronLeftIcon />
      </Button>
      <Button disabled={currentPage == pageCount}>
        <ChevronRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
