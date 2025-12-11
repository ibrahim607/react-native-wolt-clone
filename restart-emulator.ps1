Write-Host "Restarting Android Emulator and Metro Bundler..." -ForegroundColor Cyan

# Kill Metro Bundler processes
Write-Host "`nStopping Metro Bundler processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*node.exe*" } | Stop-Process -Force
Write-Host "Metro Bundler stopped." -ForegroundColor Green

# Kill Java/Gradle processes that might be stuck
Write-Host "`nStopping Gradle daemon processes..." -ForegroundColor Yellow
Get-Process -Name "java" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "Gradle processes stopped." -ForegroundColor Green

# Kill any emulator processes
Write-Host "`nStopping Android Emulator processes..." -ForegroundColor Yellow
Get-Process -Name "qemu-system-x86_64" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "emulator" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "adb" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "Emulator processes stopped." -ForegroundColor Green

# Wait a moment for processes to fully terminate
Write-Host "`nWaiting for processes to terminate..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Clean Metro cache
Write-Host "`nCleaning Metro cache..." -ForegroundColor Yellow
if (Test-Path "$env:LOCALAPPDATA\Temp\metro-*") {
    Remove-Item "$env:LOCALAPPDATA\Temp\metro-*" -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "$env:LOCALAPPDATA\Temp\haste-map-*") {
    Remove-Item "$env:LOCALAPPDATA\Temp\haste-map-*" -Recurse -Force -ErrorAction SilentlyContinue
}
Write-Host "Metro cache cleaned." -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Manually open Android Studio" -ForegroundColor White
Write-Host "2. Start your emulator from the Device Manager" -ForegroundColor White
Write-Host "3. Once the emulator is fully loaded, run: .\run-android.ps1" -ForegroundColor White
Write-Host "`nOr run this command to start fresh:" -ForegroundColor Yellow
Write-Host "npx react-native start --reset-cache" -ForegroundColor Cyan
Write-Host "`nThen in a new terminal:" -ForegroundColor Yellow
Write-Host "npx react-native run-android" -ForegroundColor Cyan
