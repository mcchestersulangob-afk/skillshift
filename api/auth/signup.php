<?php
declare(strict_types=1);
require_once dirname(__DIR__) . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed.'], 405);
}
$input = request_json();
$name = trim((string) ($input['name'] ?? ''));
$email = strtolower(trim((string) ($input['email'] ?? '')));
$password = $input['password'] ?? null;
$role = $input['role'] ?? 'learner';

if (strlen($name) < 2 || strlen($name) > 100) {
    json_response(['error' => 'Enter a name between 2 and 100 characters.'], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    json_response(['error' => 'Enter a valid email address.'], 400);
}
if (!is_string($password) || strlen($password) < 6 || strlen($password) > 200) {
    json_response(['error' => 'Password must be between 6 and 200 characters.'], 400);
}
if ($role !== 'learner') {
    json_response(['error' => 'New accounts can sign up as learners. Admin and author accounts must be provisioned by an administrator.'], 403);
}

try {
    $statement = $pdo->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)');
    $statement->execute([$name, $email, password_hash($password, PASSWORD_DEFAULT), 'learner']);
} catch (PDOException $exception) {
    if ($exception->getCode() === '23000') {
        json_response(['error' => 'An account with this email already exists. Sign in instead.'], 409);
    }
    throw $exception;
}

$user = ['id' => (int) $pdo->lastInsertId(), 'name' => $name, 'email' => $email, 'role' => 'learner'];
session_regenerate_id(true);
$_SESSION['user_id'] = $user['id'];
$_SESSION['role'] = $user['role'];
json_response(['user' => $user], 201);
