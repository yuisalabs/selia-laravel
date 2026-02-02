import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toast } from '@/components/ui/toast';
import { ConfirmDialog } from '@/components/confirm-dialog';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const applyInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        try {
            const { state } = JSON.parse(storedTheme);
            const theme = state?.theme;
            document.documentElement.classList.toggle(
                'dark',
                theme === 'dark' ||
                    ((!theme || theme === 'system') &&
                        window.matchMedia('(prefers-color-scheme: dark)').matches),
            );
        } catch (e) {
            document.documentElement.classList.toggle(
                'dark',
                window.matchMedia('(prefers-color-scheme: dark)').matches,
            );
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
        
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <Toast />
                <ConfirmDialog />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

