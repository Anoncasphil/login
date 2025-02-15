<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>L</title>

      <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"></script>

</head>
<body>

<div class="font-[sans-serif] flex items-center justify-center min-h-screen px-4">
  <div class="max-w-md w-full p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">

    <!-- OTP Section -->
    <div id="valid-section" class="mt-6 text-center">
      <!-- Success GIF -->
      <img src="../src/green_check.png" alt="Success" class="mx-auto w-20 h-20 mb-4 animate-bounce">

      <!-- Success Message -->
      <h2 class="text-2xl font-bold text-green-600 mb-2">Your account has been created!</h2>
      <p class="text-gray-700 mb-6">Redirecting to login in <span id="countdown">10</span> seconds...</p>

      <!-- Login Button -->
      <button type="button" id="redirect-login" class="w-full mt-4 shadow-xl py-2 px-4 text-sm tracking-wide rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none">
        Go to login
      </button>
    </div>
  </div>
</div>

<script>
  // Countdown Timer
  let seconds = 30;
  const countdownElement = document.getElementById('countdown');

  const countdownInterval = setInterval(() => {
    seconds--;
    countdownElement.textContent = seconds;

    if (seconds <= 0) {
      clearInterval(countdownInterval);
      window.location.href = '../index.php';
    }
  }, 1000);

  // Manual Redirect on Button Click
  document.getElementById('redirect-login').addEventListener('click', () => {
    window.location.href = 'login.php';
  });
</script>




</div>
    
</body>
</html>