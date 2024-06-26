import { publicProcedure, router } from "@src/trpc";
import { TRPCError } from "@trpc/server";
import { dialog } from "electron";
import { readFileSync, writeFile } from "node:fs";
import { z } from "zod";

export const projectsRouter = router({
  saveProject: publicProcedure
    .input(
      z.object({
        projectName: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const projectBuffer = JSON.stringify(input);

      writeFile(
        `${ctx.app.getPath}/Moment`,
        projectBuffer,
        {
          encoding: "hex",
          flush: true,
        },
        (err) => {
          if (err)
            throw new TRPCError({
              message: "Something went wrong while trying to save project",
              code: "INTERNAL_SERVER_ERROR",
              cause: `${err}`,
            });
        },
      );
    }),
  openProject: publicProcedure.mutation(async ({ ctx }) => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      buttonLabel: "Open Project File",
      defaultPath: `${ctx.app.getPath("documents")}/Moment`,
      filters: [{ extensions: ["momproj"], name: "Moment Project" }],
    });

    if (canceled) {
      return {
        cancelled: true,
      };
    }

    const file = filePaths.at(0);

    if (!file)
      return {
        cancelled: true,
      };

    const data = await readFileSync(file, {
      encoding: "hex",
    });

    console.log(Buffer.from(data).toString("base64"));
  }),
  loadPreviouslyOpenedProject: publicProcedure
    .input(
      z.object({
        savedProjectId: z.string().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.savedProjectId === null) {
        return {
          found: false,
        };
      }

      const row = ctx.store.getRow("project", input.savedProjectId);

      if (!row || !row.path) {
        return;
      }

      const data = readFileSync(row.path, {
        encoding: "hex",
      });

      const projectInfo = JSON.parse(data);

      return {
        found: true,
        project: projectInfo,
      };
    }),
});
