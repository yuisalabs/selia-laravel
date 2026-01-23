import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
}

const applyTheme = (theme?: Theme) => {
  document.documentElement.classList.toggle(
    'dark',
    theme === 'dark' ||
      ((!theme || theme === 'system') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  );
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    },
  ),
);

