<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include_once "../config/database.php";
$database = new Database();
$conn = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $search = isset($_GET['search']) ? $_GET['search'] : "";
    $query = "SELECT id, name, email, created_at 
              FROM users 
              WHERE name LIKE :search OR email LIKE :search
              ORDER BY created_at DESC";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":search", "%{$search}%");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);

} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? 0;

    if ($id) {
        $query = "DELETE FROM users WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "User deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete user"]);
        }
    } else {
        echo json_encode(["message" => "Invalid user ID"]);
    }
}
?>
