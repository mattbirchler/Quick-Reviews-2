<?php
// Get the user agent from the request
$userAgent = $_SERVER['HTTP_USER_AGENT'];

// Define the log file path
$logFile = 'logs.txt';

// Prepare the log entry with a timestamp
$logEntry = date('Y-m-d H:i:s') . " - " . $userAgent . PHP_EOL;

// Append the log entry to the log file
file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

// Optionally, output a message or perform other actions
// echo "User agent logged successfully.";
?>