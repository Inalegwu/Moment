import { router } from "@src/trpc";
import { deviceRouter } from "./device";
import { mediaRouter } from "./media";
import { projectsRouter } from "./project";

export const appRouter = router({
  device: deviceRouter,
  media: mediaRouter,
  project: projectsRouter,
});

export type AppRouter = typeof appRouter;
