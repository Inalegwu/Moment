import { useMount } from "@legendapp/state/react";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { Info, Settings, Sidebar, X } from "lucide-react";
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
      <Flex
        align="start"
        justify="between"
        className="w-[25%]"
        direction="column"
      >
        <Flex width="100%" grow="1" direction="column" align="start">
          <Flex align="center" justify="end" width="100%" className="px-3 py-2">
            <Button
              size="1"
              variant="ghost"
              radius="full"
              color="gray"
              className="cursor-pointer w-3 h-5"
            >
              <Sidebar size={11} />
            </Button>
          </Flex>
        </Flex>
        <Flex className="px-3 py-3" align="center" justify="start" gap="5">
          <Button
            variant="ghost"
            color="gray"
            className="w-3 h-5 rounded-full cursor-pointer"
          >
            <Settings size={11} />
          </Button>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                variant="ghost"
                color="gray"
                className="w-3 h-5 rounded-full cursor-pointer"
              >
                <Info size={11} />
              </Button>
            </Dialog.Trigger>
            <Dialog.Content
              size="2"
              className="bg-transparent backdrop-blur-2xl"
            >
              <Flex width="100%" direction="column" align="center">
                <Flex width="100%" align="center" justify="end">
                  <Dialog.Close>
                    <Button
                      variant="ghost"
                      className="w-2.5 h-4.5 cursor-pointer rounded-full"
                      color="ruby"
                      size="1"
                    >
                      <X />
                    </Button>
                  </Dialog.Close>
                </Flex>
                <Text>
                  Moment is designed and developed by DisgruntledDevs &copy;2024
                </Text>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </Flex>
      <Flex className="w-[75%]">{children}</Flex>
    </Flex>
  );
}
