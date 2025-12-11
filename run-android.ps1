# Set Java 17
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

# Set Android SDK
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path = "$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:Path"

Write-Host "[OK] Java 17 configured" -ForegroundColor Green
Write-Host "[OK] Android SDK configured" -ForegroundColor Green
Write-Host ""

# Check for running emulator
$devices = & "$env:ANDROID_HOME\platform-tools\adb.exe" devices | Select-String "emulator"

if ($devices.Count -eq 0) {
    Write-Host "[!] No emulator detected!" -ForegroundColor Yellow
    Write-Host "Please start an Android emulator from Android Studio first." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then run this script again." -ForegroundColor Cyan
    exit 1
}

Write-Host "[OK] Emulator detected" -ForegroundColor Green
Write-Host ""
Write-Host "Building and installing app..." -ForegroundColor Cyan

# Run the app
npx expo run:android
