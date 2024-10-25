<?php
// Database connection
$host = 'localhost';
$dbname = 'seat_booking';
$user = 'root';
$pass = '';

$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);

// Fetch booked seats
$query = "SELECT seat_id FROM seats WHERE status = 'booked'";
$stmt = $conn->query($query);
$bookedSeats = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode($bookedSeats);
?>
