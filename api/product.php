<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include_once "../config/database.php";

$database = new Database();
$conn = $database->getConnection();

$categories = isset($_GET['categories']) ? explode(',', $_GET['categories']) : [];
$brands = isset($_GET['brands']) ? explode(',', $_GET['brands']) : [];

$query = "SELECT * FROM products WHERE 1=1";

if (!empty($categories)) {
  $placeholders = implode(',', array_fill(0, count($categories), '?'));
  $query .= " AND category_id IN ($placeholders)";
}
if (!empty($brands)) {
  $placeholders = implode(',', array_fill(0, count($brands), '?'));
  $query .= " AND brand_id IN ($placeholders)";
}

$stmt = $conn->prepare($query);
$allFilters = array_merge($categories, $brands);
$stmt->execute($allFilters);

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($products);
?>
