import { useTheme } from "next-themes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  as: "CBD/HEMP" | "RECREATIONAL";
  setValue: (value: string) => void;
  modal: boolean;
  setModal: (v: boolean) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      as: "CBD/HEMP", // Default value for light theme
      modal: false,
      setModal: (v: boolean) => set({modal: v}),
      setValue: (value: string) => set({ as: value as "CBD/HEMP" | "RECREATIONAL" }),
    }),
    {
      name: "theme-store", // The name for the persisted state
      // @ts-ignore
      getStorage: () => localStorage, // Store in localStorage
    }
  )
);

export const useApplicationAs = () => {
  const { theme } = useTheme();
  const { as, setValue, modal, setModal } = useStore();

  // Update `as` when the theme changes
  if (theme === "dark" && as !== "RECREATIONAL") {
    setValue("RECREATIONAL");
  } else if (theme === "light" && as !== "CBD/HEMP") {
    setValue("CBD/HEMP");
  }

  return { as, setValue, modal, setModal };
};

export default useStore;
