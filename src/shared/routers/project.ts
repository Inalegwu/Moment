import { publicProcedure, router } from "@src/trpc";

export const projectsRouter = router({
  saveProject: publicProcedure.query(async () => {}),
  readProjectFile: publicProcedure.query(async () => {}),
});
