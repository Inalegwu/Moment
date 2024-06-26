import { publicProcedure, router } from "@src/trpc";

export const appRouter = router({
  getDeviceAccentColor: publicProcedure.query(async ({ ctx }) => {
    return {
      color: ctx.sys.getAccentColor(),
    };
  }),
});

export type AppRouter = typeof appRouter;
