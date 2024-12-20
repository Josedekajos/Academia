<?php
include 'db.php';

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
if ($conn->query($sql) === TRUE) {
    header("Location: login.html"); // Redirect to login page after successful registration
    exit;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>
