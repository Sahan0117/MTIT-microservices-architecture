Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\product-service" -WindowStyle Normal
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\payment-service" -WindowStyle Normal
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\order-service" -WindowStyle Normal
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\customer-service" -WindowStyle Normal
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\Inventory-service" -WindowStyle Normal
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory ".\api-gateway" -WindowStyle Normal
Write-Host "All services started in separate windows."
