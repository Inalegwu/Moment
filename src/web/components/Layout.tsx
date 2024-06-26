import { useMount } from "@legendapp/state/react";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { FolderOpen, Info, Plus, Settings, Sidebar, X } from "lucide-react";
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
              color="gray"
              className="cursor-pointer rounded-md bg-transparent p-2 hover:bg-zinc-700/20 w-8 flex items-center justify-center"
            >
              <Sidebar size={12} className="text-teal-500/30" />
            </Button>
          </Flex>
          <Flex
            width="100%"
            className="hover:bg-zinc-700/20 py-3 px-2 cursor-pointer"
            align="center"
            justify="start"
            gap="2"
          >
            <Plus size={12} />
            <Text className="text-[12px]">New Project</Text>
          </Flex>
          <Flex
            width="100%"
            className="hover:bg-zinc-700/20 py-3 px-2 cursor-pointer"
            align="center"
            justify="start"
            gap="2"
          >
            <FolderOpen size={12} />
            <Text className="text-[12px]">Open Project</Text>
          </Flex>
        </Flex>
        <Flex className="px-2 py-2" align="center" justify="start" gap="2">
          <Button
            color="gray"
            className="cursor-pointer rounded-md bg-transparent hover:bg-zinc-700/20 w-8 backdrop-blur-2xl p-2 flex items-center justify-center"
          >
            <Settings size={12} />
          </Button>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button
                color="gray"
                className="cursor-pointer rounded-md bg-transparent hover:bg-zinc-700/20 w-8 backdrop-blur-2xl p-2 flex items-center justify-center"
              >
                <Info size={12} />
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
