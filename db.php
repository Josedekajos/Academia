<?php
$servername = "127.0.0.1:8080";
$username = "root";
$password = "jose6543@+7A";
$dbname = "academia";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
