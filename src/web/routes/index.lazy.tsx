import { Flex, Text } from "@radix-ui/themes";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Flex grow="1" direction="column" className="h-screen w-full bg-none">
      <Text size="9">Moment</Text>
    </Flex>
  );
}
