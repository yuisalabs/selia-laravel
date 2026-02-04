# How to Develop

This guide provides instructions on how to set up the project for development and explains the key configurations.

## Prerequisites

Ensure you have the following installed on your machine:

- **PHP**: 8.2 or higher
- **Composer**: Dependency manager for PHP
- **Node.js**: 18.x or higher
- **Database**: SQLite (default), MySQL, or PostgreSQL

## Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd selia-laravel
    ```

2.  **Run the setup script**:
    The project includes a convenient `setup` script in `composer.json` that automates the initialization process.
    ```bash
    composer run setup
    ```
    This script performs the following:
    - Installs PHP dependencies (`composer install`).
    - Copies `.env.example` to `.env`.
    - Generates the application key.
    - Runs database migrations (`migrate --force`).
    - Creates a default superadmin account.
    - Seeds the database.
    - Caches localization routes (`route:trans:cache`).
    - Installs Node.js dependencies (`npm install`).
    - Builds the frontend assets (`npm run build`).

    > [!NOTE]
    > `npm install` will also automatically set up **Husky** git hooks for commit linting.

## Development

To start the development environment, run:

```bash
composer run dev
```

This command uses `concurrently` to run the following services simultaneously:
- **Laravel Development Server**: `php artisan serve`
- **Queue Worker**: `php artisan queue:listen`
- **Vite Development Server**: `npm run dev`

### Important: Localization & Route Caching

This project uses [`mcamara/laravel-localization`](https://github.com/mcamara/laravel-localization).

> [!WARNING]
> **Route Caching is Critical**: Whenever you add, modify, or remove routes, you MUST run the following command to regenerate the javascript route cache (used by Ziggy and localization):
> ```bash
> php artisan route:trans:cache
> ```
> Failure to do so may result in `404` errors or missing translations for routes.

### Commit Guidelines

We enforce **Conventional Commits** using `commitlint` and `husky`. This ensures a clean and readable commit history.

Your commit messages must follow this format:
```
type(scope?): subject
```

**Common usage examples:**
- `feat(auth): add login page`
- `fix(user): resolve null pointer exception`
- `docs(readme): update installation instructions`
- `chore: update dependencies`
- `refactor: simplify role service`

If you attempt to commit with an invalid message, the commit will be rejected by the git hook.

## Configuration & Settings

### Environment Variables (.env)

Make sure to configure these important variables in your `.env` file:

- **APP_URL**:
  ```env
  APP_URL=http://localhost:8000
  ```
  > [!IMPORTANT]
  > It is crucail that `APP_URL` matches exactly the URL you are using to access the site. The localization package relies on this to generate correct URLs for different languages.

- **Filesystem**:
  By default, `FILESYSTEM_DISK` is set to `local`. If you need public access to storage, ensure you run:
  ```bash
  php artisan storage:link
  ```

### Database

The project is configured to use `sqlite` by default for ease of development. You can change `DB_CONNECTION` in `.env` to `mysql` or `pgsql` if preferred.
