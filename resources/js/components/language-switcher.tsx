'use client';

import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
    Menu,
    MenuPopup,
    MenuTrigger,
    MenuItem,
} from '@/components/ui/menu';
import { Button } from '@/components/ui/button';

interface LocaleInfo {
    name: string;
    native: string;
}

interface LocaleData {
    current: string;
    available: Record<string, LocaleInfo>;
    urls: Record<string, string>;
}

export function LanguageSwitcher() {
    const { locale } = usePage().props as { locale: LocaleData };
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: string) => {
        // Navigate to the localized URL (full page reload to update Laravel session)
        if (locale?.urls[lang]) {
            window.location.href = locale.urls[lang];
        }
    };

    const currentLocale = locale?.available[locale?.current];

    if (!locale?.available) {
        return null;
    }

    return (
        <Menu>
            <MenuTrigger
                render={
                    <Button variant="plain" size="sm" className="gap-2">
                        <Globe className="size-4" />
                        <span className="hidden sm:inline">
                            {currentLocale?.native || 'English'}
                        </span>
                    </Button>
                }
            />
            <MenuPopup align="end" sideOffset={8}>
                {Object.entries(locale.available).map(([code, info]) => (
                    <MenuItem
                        key={code}
                        onClick={() => handleLanguageChange(code)}
                        className={locale.current === code ? 'bg-accent' : ''}
                    >
                        <span className="mr-2">{getLanguageFlag(code)}</span>
                        {info.native}
                    </MenuItem>
                ))}
            </MenuPopup>
        </Menu>
    );
}

/**
 * Get flag emoji for language code
 */
function getLanguageFlag(code: string): string {
    const flags: Record<string, string> = {
        en: '🇺🇸',
        id: '🇮🇩',
    };
    return flags[code] || '🌐';
}

export default LanguageSwitcher;
