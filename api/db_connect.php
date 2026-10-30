<?php
declare(strict_types=1);

$dbHost = getenv('DB_HOST') ?: '127.0.0.1';
$dbName = getenv('DB_NAME') ?: 'skillshift_db';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';

try {
    $pdo = new PDO(
        "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4",
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $exception) {
    error_log('SkillShift database connection failed: ' . $exception->getMessage());
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Could not connect to the SkillShift database. Check the MySQL service and database settings.']);
    exit;
}
