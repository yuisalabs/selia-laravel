import '../css/app.css';
import './bootstrap';
import './i18n';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toast } from '@/components/ui/toast';
import { ConfirmDialog } from '@/components/confirm-dialog';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const applyInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        try {
            const { state } = JSON.parse(storedTheme);
            const theme = state?.theme;
            if (theme === 'dark' || ((!theme || theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } catch (e) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
        }
    }
};

createInertiaApp({
    title: (title) => `${title} / ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        applyInitialTheme();
        
        const locale = (props.initialPage.props as { locale?: { current: string } }).locale?.current || 'en';
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
        
        const root = createRoot(el);

        root.render(
            <I18nextProvider i18n={i18n}>
                <App {...props} />
                <Toast />
                <ConfirmDialog />
            </I18nextProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
