<?php
declare(strict_types=1);
require_once dirname(__DIR__) . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed.'], 405);
}
$input = request_json();
$email = strtolower(trim((string) ($input['email'] ?? '')));
$password = $input['password'] ?? null;
$role = $input['role'] ?? null;
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !is_string($password) || !in_array($role, ['learner', 'admin', 'author'], true)) {
    json_response(['error' => 'Email, password, and role are required.'], 400);
}

$statement = $pdo->prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1');
$statement->execute([$email]);
$account = $statement->fetch();
if (!$account || !password_verify($password, $account['password_hash']) || $account['role'] !== $role) {
    json_response(['error' => 'Email or password is incorrect.'], 401);
}

session_regenerate_id(true);
$_SESSION['user_id'] = (int) $account['id'];
$_SESSION['role'] = $account['role'];
json_response(['user' => public_user($account)]);
