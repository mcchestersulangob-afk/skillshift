# SkillShift

## XAMPP setup

1. Start **Apache** and **MySQL** in the XAMPP Control Panel.
2. Open phpMyAdmin at `http://localhost/phpmyadmin` and import [`database/schema.sql`](database/schema.sql). It creates the `skillshift_db` database and its account and learner progress tables.
3. Open the project through the existing Vite preview. Its `/api` proxy forwards requests to the PHP files in this project under Apache.

By default, the PHP API connects to MySQL at `127.0.0.1` as `root` with an empty password, which matches a typical local XAMPP setup. Set the `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS` environment variables in Apache/PHP if your MySQL credentials differ. Set `SKILLSHIFT_PHP_BASE` if the project folder path under `htdocs` differs from `/SkillShift Website Development`.

## API routes

- `POST /api/auth/signup.php` creates a learner account.
- `POST /api/auth/login.php` signs in an account.
- `POST /api/auth/logout.php` ends the PHP session.
- `GET /api/auth/me.php` returns the signed-in user.
- `GET /api/learner/progress.php` loads completed modules.
- `PUT /api/learner/progress.php` saves a completion state.

Passwords use PHP's `password_hash` / `password_verify`; authenticated requests use HTTP-only PHP session cookies. Public signup only creates learner accounts. To promote a trusted account to admin or author, create it as a learner, then update it in phpMyAdmin, for example:

```sql
UPDATE skillshift_db.users SET role = 'admin' WHERE email = 'admin@example.com';
```

This setup is for local development. Before exposing it publicly, configure a non-default MySQL account, HTTPS, request rate limits, and an administrator provisioning flow.
