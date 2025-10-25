export interface useGeneralStoreModal {
  scrollToTop: () => void;
  setTheme: (newTheme: string) => void;
  theme: string;
  journalOpen: boolean;
  setJournalOpen: (e: boolean) => void;
  sideBarOpen: boolean;
  setSideBarOpen: (e: boolean) => void;
  choosenUnits: number[];
  setChoosenUnits: (newUnits: number[]) => void;
}
