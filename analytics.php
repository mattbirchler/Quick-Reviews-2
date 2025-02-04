<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get query parameters
$mediaType = isset($_GET['mediaType']) ? $_GET['mediaType'] : 'unknown';
$deviceType = isset($_GET['deviceType']) ? $_GET['deviceType'] : 'unknown';
$isPremium = isset($_GET['isPremium']) ? $_GET['isPremium'] : 'false';
$action = isset($_GET['action']) ? $_GET['action'] : 'unknown';
$records = isset($_GET['records']) ? $_GET['records'] : '0';
$accentColor = isset($_GET['accentColor']) ? $_GET['accentColor'] : 'unknown';

// Debug logging
error_log("Records value received: " . $_GET['records']);
error_log("Final records value: " . $records);

// Create log entry with timestamp
$timestamp = date('Y-m-d H:i:s');
$logFile = __DIR__ . '/ios-logs.csv';  // Use absolute path

// Add CSV headers if file is empty
if (!file_exists($logFile) || filesize($logFile) === 0) {
    $headers = "Timestamp,MediaType,DeviceType,IsPremium,Action,Records,AccentColor\n";
    if (!file_put_contents($logFile, $headers)) {
        error_log("Failed to write headers to $logFile");
    }
}

// Create CSV formatted entry
$logEntry = "$timestamp,$mediaType,$deviceType,$isPremium,$action,$records,$accentColor\n";

// Append to log file with error checking
if (!file_put_contents($logFile, $logEntry, FILE_APPEND)) {
    error_log("Failed to write entry to $logFile");
}

// Return empty response
header('HTTP/1.1 204 No Content');
?>
