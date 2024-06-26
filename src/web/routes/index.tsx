import { useObservable } from "@legendapp/state/react";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import t from "@src/shared/config";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useRef } from "react";
import { useTimeout, useWindow } from "../hooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const previewRef = useRef<HTMLVideoElement>(null);

  const { data: mediaDevices } = t.media.getCaptureDevices.useQuery();
  const playBackVisible = useObservable(false);

  useTimeout(() => {
    if (playBackVisible.get()) {
      playBackVisible.set(false);
    }
  });

  const getMediaStream = async (id: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        // @ts-ignore:idk whats going on here...
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: id,
        },
      },
    });

    console.log(stream);

    if (!previewRef.current) return;

    const tracks = stream.getTracks();

    tracks.map(console.log);

    previewRef.current.srcObject = stream;
    previewRef.current.play();
  };

  useWindow("mousemove", () => {
    playBackVisible.set(true);
  });

  return (
    <Flex grow="1" direction="column" className="h-full w-full">
      <Flex className="w-full h-4/6 relative overflow-hidden">
        <video className="w-full h-full object-contain" ref={previewRef} />
        {/* controls */}
        <Flex
          direction="column"
          align="start"
          justify="between"
          className="absolute z-10 p-2 w-full h-full"
        >
          <Flex align="center" justify="between" width="100%" />
          <Flex align="center" width="100%" justify="between">
            <Flex grow="1" />
            <Flex align="center" justify="end" gap="1">
              <Button
                color="gray"
                className="cursor-pointer rounded-md bg-transparent hover:bg-zinc-700/20 w-8 backdrop-blur-3xl p-2 flex items-center justify-center"
              >
                <SkipBack size={12} />
              </Button>
              <Button
                color="gray"
                className="cursor-pointer rounded-md bg-transparent hover:bg-zinc-700/20 w-8 backdrop-blur-3xl p-2 flex items-center justify-center"
              >
                <Play size={12} />
              </Button>
              <Button
                color="gray"
                className="cursor-pointer rounded-md bg-transparent hover:bg-zinc-700/20 w-8 backdrop-blur-3xl p-2 flex items-center justify-center"
              >
                <Pause size={12} />
              </Button>
              <Button
                color="gray"
                className="cursor-pointer rounded-md bg-transparent hover:bg-zinc-700/20 w-8 backdrop-blur-3xl p-2 flex items-center justify-center"
              >
                <SkipForward size={12} />
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" className="h-2/6 bg-dark-9" width="100%">
        <Flex
          width="100%"
          align="center"
          justify="end"
          gap="4"
          className="py-1 pr-1"
        >
          <Select.Root size="1" onValueChange={(e) => getMediaStream(e)}>
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
