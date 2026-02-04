## TL;DR

```bash
laravel new app --using=yuisalabs/selia-laravel
```

Make sure to update your `APP_URL` in the `.env` file before using the route function. Then, run `npm run dev` to generate and watch routes properly during development.

> [!WARNING]
> This project uses `mcamara/laravel-localization`. You MUST ensure `APP_URL` matches your local development URL exactly (e.g. `http://selia-laravel.test` or `http://localhost:8000`).
>
> Additionally, whenever you modify routes, you MUST run:
> ```bash
> php artisan route:trans:cache
> ```

> [!CAUTION]
> This project enforces **Conventional Commits** using `commitlint` and `husky`.
> Ensure your commit messages follow the standard format (e.g., `feat: add new login page`).

For detailed setup and development instructions, please read [HOW_TO_DEVELOP.md](HOW_TO_DEVELOP.md).

## Laravel Inertia React with TypeScript

By default, packages like Laravel Breeze use regular JavaScript for React. However, this project is tailored for those who want an Inertia.js boilerplate with TypeScript, enhanced with the **Selia UI Kit**.

### Default Account
```bash
Email: superadmin@yuisalabs.dev
Password: superadmin
```

### Features

- **Authentication**: Full auth scaffolding (Login, Register, Password Reset, Email Verification).
- **Access Control List (ACL)**: Full ACL scaffolding (Role, Permission, User Role, User Permission).
- **User Profile**: Profile management with update and delete capabilities.
- **TypeScript**: Fully typed codebase for better developer experience.
- **Selia UI**: Custom UI components and design system.
- **Modern Architecture**: Feature-based folder structure for scalability.

### Folder Structure

This project adopts a **feature-based architecture** to keep the codebase scalable and maintainable. Instead of grouping files by type (controllers, views, etc.), we group them by **feature** where possible, especially in the frontend.

#### Frontend (`resources/js/`)

```
resources/js/
├── components/         # Shared UI components (Button, Input, etc.)
├── layouts/            # Layout wrappers (AuthenticatedLayout, GuestLayout, PublicLayout)
├── pages/              # Inertia Page components (entry points)
│   ├── auth/           # Auth pages (Login, Register, etc.) - specific layout/view logic
│   └── ...
├── features/           # Feature-specific logic and specialized components
│   ├── auth/           # Authentication feature
│   │   └── components/ # Forms and logical components (LoginForm, RegisterForm, etc.)
│   └── ...
└── ...
```

**Key Concept:**
- **Pages (`resources/js/pages`)**: Should focused on **Layout** and **Routing**. They act as the "Controller" of the frontend, receiving data from Inertia props and organizing the page structure.
- **Features (`resources/js/features`)**: Contain the **Business Logic** and **Complex Components**. For example, the `LoginForm` component handles the form state, validation, and submission, while the `LoginPage` simply places that form into the `GuestLayout`.

This separation allows for easier testing, reuse of feature logic, and a cleaner separation of concerns.
