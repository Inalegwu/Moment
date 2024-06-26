import { useMount } from "@legendapp/state/react";
import { Button, Flex } from "@radix-ui/themes";
import { Sidebar } from "lucide-react";
import type React from "react";
import { globalState$ } from "../state";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  useMount(() => {
    if (globalState$.colorMode.get() === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });

  return (
    <Flex className="w-full h-screen bg-transparent">
      <Flex align="start" className="w-[20%] px-2 py-1" direction="column">
        <Flex align="center" justify="between" width="100%">
          <Button size="1" variant="soft">
            <Sidebar size={10} />
          </Button>
        </Flex>
      </Flex>
      <Flex className="w-[80%] bg-zinc-800">{children}</Flex>
    </Flex>
  );
}
