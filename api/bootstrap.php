<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'httponly' => true,
        'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
        'samesite' => 'Lax',
        'path' => '/',
    ]);
    session_start();
}

require_once __DIR__ . '/db_connect.php';

function json_response(array $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function request_json(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 16384) {
        json_response(['error' => 'Request body is too large.'], 413);
    }
    $data = json_decode($raw ?: '{}', true);
    if (!is_array($data)) {
        json_response(['error' => 'Request body must be valid JSON.'], 400);
    }
    return $data;
}

function require_learner(): int
{
    $userId = $_SESSION['user_id'] ?? null;
    if (!is_int($userId) || $userId < 1) {
        json_response(['error' => 'Please sign in to access your learner account.'], 401);
    }
    if (($_SESSION['role'] ?? null) !== 'learner') {
        json_response(['error' => 'Learner access is required.'], 403);
    }
    return $userId;
}

function public_user(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'name' => $row['name'],
        'email' => $row['email'],
        'role' => $row['role'],
    ];
}
