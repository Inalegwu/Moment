import { createIndexedDbPersister } from "tinybase/cjs/persisters/persister-indexed-db";
import { createStore } from "tinybase/cjs/with-schemas";

export const store = createStore().setTablesSchema({
  project: {
    path: {
      type: "string",
    },
  },
});

const persister = createIndexedDbPersister(store, "electrostatic_db", 5);

persister.save();
persister.startAutoSave();
