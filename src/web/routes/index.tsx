import { Flex, Select, Text } from "@radix-ui/themes";
import t from "@src/shared/config";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: mediaDevices } = t.media.getCaptureDevices.useQuery();

  return (
    <Flex grow="1" direction="column" className="h-screen w-full bg-none">
      <Flex
        align="center"
        justify="center"
        width="100%"
        className="bg-dark-9 h-4/6"
      >
        <Text size="9" weight="bold">
          Preview Window
        </Text>
      </Flex>
      <Flex direction="column" className="h-2/6" width="100%">
        <Flex
          width="100%"
          align="center"
          justify="end"
          gap="4"
          className="px-1 py-1"
        >
          <Select.Root size="1">
            <Select.Trigger color="gray">
              <Flex align="center" gap="1">
                <Text size="1">Select Source</Text>
                <ChevronDown size={11} />
              </Flex>
            </Select.Trigger>
            <Select.Content variant="soft" color="gray">
              {mediaDevices?.devices.map((v) => (
                <Select.Item className="cursor-pointer" value={v.id} key={v.id}>
                  <Text>{v.name}</Text>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
        <Flex width="100%" direction="column" grow="1">
          content
        </Flex>
      </Flex>
    </Flex>
  );
}
