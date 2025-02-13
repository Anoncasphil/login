<?php

$host = "localhost"; // XAMPP default hostname
$username = "root"; // Default XAMPP MySQL user
$password = ""; // Default XAMPP MySQL password (empty by default)
$database = "login"; // Database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>
