<?php
session_start();
$isLoggedIn = isset($_SESSION['user_id']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex items-center justify-center h-screen bg-gray-100">

    <div class="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-gray-700 mb-4">Welcome to Our Website</h1>
        <p class="text-gray-500 mb-6">Explore and enjoy our services.</p>

        <?php if ($isLoggedIn): ?>
            <button onclick="logout()" class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                Logout
            </button>
        <?php else: ?>
            <a href="landing_page_customer/login.php" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                Login
            </a>
        <?php endif; ?>
    </div>

    <script>
        function logout() {
            fetch('api/logout.php', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.reload();
                    } else {
                        alert('Logout failed.');
                    }
                });
        }
    </script>

</body>
</html>
