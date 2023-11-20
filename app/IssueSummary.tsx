import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  closed: number;
  inProgress: number;
  open: number;
}

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Closed Issues", value: closed, status: "CLOSED" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Open Issues", value: open, status: "OPEN" },
  ];

  return (
    <Flex gap="2">
      {containers.map((container) => {
        return (
          <Card key={container.status}>
            <Link href={`/issues/list?status=${container.status}`}>
              <Flex direction="column" gap="2" align="center">
                <Text className="text-sm font-medium">{container.label}</Text>
                <Text className="font-bold text-lg">{container.value}</Text>
              </Flex>
            </Link>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
