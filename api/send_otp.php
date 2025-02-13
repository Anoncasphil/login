<?php
session_start();
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Generate a 6-digit OTP
$otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
$_SESSION['otp_hash'] = password_hash($otp, PASSWORD_DEFAULT);
$_SESSION['otp_expiration'] = time() + 300; // OTP valid for 5 minutes

// Email settings
$recipientEmail = $_POST['email'] ?? 'test@example.com'; // Get email from form
$senderEmail = 'your_email@yourdomain.com';
$senderPassword = 'your_password'; // Use an App Password if possible
$smtpHost = 'smtp.hostinger.com';
$smtpPort = 465;

// Compose the email
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $senderEmail;
    $mail->Password = $senderPassword;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $smtpPort;

    // Recipients
    $mail->setFrom($senderEmail, 'Your App');
    $mail->addAddress($recipientEmail);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Your OTP Code';
    $mail->Body = "<p>Your OTP code is: <strong>$otp</strong></p><p>This code is valid for 5 minutes.</p>";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'OTP sent successfully.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
}
?>
