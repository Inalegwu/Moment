import { publicProcedure, router } from "@src/trpc";
import { desktopCapturer } from "electron";

export const mediaRouter = router({
  getCaptureDevices: publicProcedure.query(async () => {
    const devices = await desktopCapturer.getSources({
      types: ["screen", "window"],
      fetchWindowIcons: true,
    });

    return {
      devices,
    };
  }),
});
