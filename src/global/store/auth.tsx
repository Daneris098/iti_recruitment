import { create } from "zustand";
import { JWTPayload, UserDataStore } from "../types/auth";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserDataStore = create<UserDataStore>()(
  persist(
    (set) => ({
      data: undefined,
      setData: (value: JWTPayload) => set({ data: value }),
    }),
    {
      name: "my-data-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
