import { publicProcedure, router } from "@src/trpc";

export const deviceRouter = router({
  getDeviceColorTheme: publicProcedure.query(async ({ ctx }) => {
    return {
      colorMode: "dark",
    };
  }),
});
