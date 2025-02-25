# Login Database Setup Guide

## Description
This project is a functioning **Login, Register, and Forgot Password** system built using **HTML, JavaScript, Tailwind CSS, and PHP**. It provides a secure authentication system with OTP-based password reset functionality.

This guide will help you set up the **login** database in XAMPP, including importing the SQL schema and configuring your local environment.

## Prerequisites

Before proceeding, ensure you have the following installed:
- [XAMPP](https://www.apachefriends.org/index.html) (Apache, MySQL, PHP)
- PHPMyAdmin (included with XAMPP)

## Steps to Set Up the Database

### 1. Start XAMPP Services
1. Open **XAMPP Control Panel**.
2. Start **Apache** and **MySQL** services.

### 2. Create the Database
1. Open your web browser and go to **http://localhost/phpmyadmin/**.
2. Click **Databases** at the top.
3. In the "Create database" field, enter **login**.
4. Choose **utf8mb4_general_ci** as the collation.
5. Click **Create**.

### 3. Import the SQL File
1. In **phpMyAdmin**, click on the newly created **login** database.
2. Click the **Import** tab.
3. Click **Choose File** and select `login.sql` (provided in this repository).
4. Click **Go** to execute the import.

### 4. Verify the Tables
After importing, the following tables should exist in the **login** database:
- `user_tbl`
- `otp_code`
- `password_reset_otps`

To check:
1. Click on the **login** database in phpMyAdmin.
2. Verify that the tables are listed under "Tables".

### 5. Configure Database Connection in PHP
If your project uses PHP to connect to MySQL, update the database credentials in your configuration file (`config.php` or `.env`):

```php
$servername = "localhost";
$username = "root";
$password = ""; // Default password is empty in XAMPP
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
```

## Troubleshooting

### MySQL Service Not Starting
- Ensure no other MySQL service is running on port **3306**.
- Open **XAMPP Control Panel**, click **Config** > **my.ini**, and change `port=3306` to another available port (e.g., `3307`). Restart MySQL.

### Import Errors
- If you encounter an **SQL syntax error**, ensure your SQL file is correct and your MySQL version supports all commands.
- If a **table already exists**, delete the database and recreate it before re-importing.

## Conclusion
You have successfully set up the **login** database in XAMPP! 🎉 Now you can start developing your project.

For any issues, feel free to open an issue in this repository. 🚀

