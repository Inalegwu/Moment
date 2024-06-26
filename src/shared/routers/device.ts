import { publicProcedure, router } from "@src/trpc";
import { nativeTheme } from "electron";

export const deviceRouter = router({
  getDeviceColorTheme: publicProcedure.query(async ({ ctx }) => {
    


    return {
      colorMode:nativeTheme.shouldUseDarkColors?"dark":"light"
    } as {
      colorMode:"dark"|"light"
    }
    
  }),
});
