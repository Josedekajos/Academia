<?php
include 'db.php';
session_start();

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['user_id']; // Store user ID in session
        header("Location: dashboard.html"); // Redirect to user dashboard
        exit;
    } else {
        echo "Invalid password.";
    }
} else {
    echo "No account found with this email.";
}
$conn->close();
?>
