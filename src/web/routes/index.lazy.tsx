import { Flex } from "@radix-ui/themes";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Flex
      grow="1"
      direction="column"
      className="h-screen w-full overflow-y-scroll pb-14"
      gap="4"
      p="2"
    >
      content
    </Flex>
  );
}
