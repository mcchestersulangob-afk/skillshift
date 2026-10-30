<?php
declare(strict_types=1);
require_once dirname(__DIR__) . '/bootstrap.php';

$userId = $_SESSION['user_id'] ?? null;
if (!is_int($userId) || $userId < 1) {
    json_response(['error' => 'Please sign in again.'], 401);
}
$statement = $pdo->prepare('SELECT id, name, email, role FROM users WHERE id = ? LIMIT 1');
$statement->execute([$userId]);
$user = $statement->fetch();
if (!$user) {
    json_response(['error' => 'Please sign in again.'], 401);
}
json_response(['user' => public_user($user)]);
