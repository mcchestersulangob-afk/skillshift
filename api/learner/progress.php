<?php
declare(strict_types=1);
require_once dirname(__DIR__) . '/bootstrap.php';

$userId = require_learner();
$moduleXp = [1 => 40, 2 => 20, 3 => 50, 4 => 45, 5 => 40];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $statement = $pdo->prepare('SELECT module_id FROM learner_progress WHERE user_id = ? ORDER BY module_id');
    $statement->execute([$userId]);
    json_response(['completedModules' => array_map('intval', $statement->fetchAll(PDO::FETCH_COLUMN))]);
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = request_json();
    $moduleId = $input['moduleId'] ?? null;
    $completed = $input['completed'] ?? null;
    if (!is_int($moduleId) || !array_key_exists($moduleId, $moduleXp) || !is_bool($completed)) {
        json_response(['error' => 'Choose a valid module and completion state.'], 400);
    }
    if ($completed) {
        $statement = $pdo->prepare('INSERT IGNORE INTO learner_progress (user_id, module_id) VALUES (?, ?)');
        $statement->execute([$userId, $moduleId]);
    } else {
        $statement = $pdo->prepare('DELETE FROM learner_progress WHERE user_id = ? AND module_id = ?');
        $statement->execute([$userId, $moduleId]);
    }
    $statement = $pdo->prepare('SELECT module_id FROM learner_progress WHERE user_id = ? ORDER BY module_id');
    $statement->execute([$userId]);
    $completedModules = array_map('intval', $statement->fetchAll(PDO::FETCH_COLUMN));
    $earnedXp = array_sum(array_map(static fn (int $id): int => $moduleXp[$id] ?? 0, $completedModules));
    json_response(['completedModules' => $completedModules, 'earnedXP' => $earnedXp]);
}

header('Allow: GET, PUT');
json_response(['error' => 'Method not allowed.'], 405);
