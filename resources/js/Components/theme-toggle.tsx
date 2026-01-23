import { Laptop2Icon, MoonIcon, SunIcon } from 'lucide-react';
import { useThemeStore } from '@/stores/theme-store';
import { Menu, MenuItem, MenuPopup, MenuTrigger } from './ui/menu';
import { Button } from './ui/button';

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  let label = <Laptop2Icon />;

  if (theme === 'dark') {
    label = <MoonIcon />;
  } else if (theme === 'light') {
    label = (
      <>
        <SunIcon />
      </>
    );
  }

  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="plain" size="icon" pill>
            {label}
          </Button>
        }
      />
      <MenuPopup size="compact">
        <MenuItem onClick={() => setTheme('light')}>
          <SunIcon /> Light
        </MenuItem>
        <MenuItem onClick={() => setTheme('dark')}>
          <MoonIcon /> Dark
        </MenuItem>
        <MenuItem onClick={() => setTheme('system')}>
          <Laptop2Icon /> System
        </MenuItem>
      </MenuPopup>
    </Menu>
  );
}