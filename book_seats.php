<?php
// Database connection
$host = 'localhost';
$dbname = 'seat_booking';
$user = 'root';  // Replace with your database username
$pass = '';      // Replace with your database password

$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selectedSeats = json_decode($_POST['seats']);
    $seatStatus = 'booked';

    foreach ($selectedSeats as $seatId) {
        // Check if the seat is already booked
        $stmt = $conn->prepare("SELECT status FROM seats WHERE seat_id = :seat_id");
        $stmt->execute(['seat_id' => $seatId]);
        $seat = $stmt->fetch();

        if ($seat && $seat['status'] == 'available') {
            // If seat is available, book it
            $stmt = $conn->prepare("UPDATE seats SET status = :status WHERE seat_id = :seat_id");
            $stmt->execute(['status' => $seatStatus, 'seat_id' => $seatId]);
        }
    }

    echo "Booking successful";
}
?>