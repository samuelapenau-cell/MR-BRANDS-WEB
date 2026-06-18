param(
  [string]$SupabaseUrl = "https://uwfrzrmjhcggtkpvpyur.supabase.co",
  [string]$ServiceRoleKey = $(if ($env:SUPABASE_SERVICE_ROLE_KEY) { $env:SUPABASE_SERVICE_ROLE_KEY } else { Read-Host "Enter your Supabase service_role key" }),
  [string]$ProductDbPath = "../base de datos productos"
)

$ErrorActionPreference = "Stop"

if (-not $ServiceRoleKey) {
  Write-Error "Supabase service_role key is required."
  exit 1
}

$headers = @{ Authorization = "Bearer $ServiceRoleKey" }
$bucketUrl = "$SupabaseUrl/storage/v1/object/productos"
$publicUrl  = "$SupabaseUrl/storage/v1/object/public/productos"

$folderToSlug = @{
  "Baggy Brown Carpediem"                = "baggy-brown-carpediem"
  "Baggy Carpediem"                      = "baggy-carpediem"
  "Baggy Jeam Carpediem Camuflado"       = "baggy-jeam-carpediem-camuflado"
  "Baggy REBUSS"                         = "baggy-rebuss-gris"
  "Baggy REBUSS (Azul Claro)"            = "baggy-rebuss-azul-claro"
  "BAGGY REBUSS (NEGRO)"                 = "baggy-rebuss-negro"
  "Baggy Track Pant Black"               = "baggy-track-pant-black"
  "BootCut Carpediem"                    = "bootcut-carpediem"
  "Corte Recto Carpediem"                = "corte-recto-carpediem"
  "Corte Recto REBUSS"                   = "corte-recto-rebuss"
  "Flared REBUSS"                        = "flared-rebuss-gris"
  "Flared REBUSS (Negro)"                = "flared-rebuss-negro"
  "Mono FirtsOne"                        = "mono-firtsone"
  "Pant Baggy Bordado Carpediem"         = "pant-baggy-bordado-carpediem"
  "Pant Burning"                         = "pant-burning-azul"
  "Pant Burning (Azul Oscuro)"           = "pant-burning-azul-oscuro"
  "Pant Burning (Azul Pre-lavado)"       = "pant-burning-azul-pre-lavado"
  "Pant Burning (Negro)"                 = "pant-burning-negro"
  "Pant Burning (Negro con Detalles)"    = "pant-burning-negro-detalles"
  "Pant Burning (Negro Pre-Lavado)"      = "pant-burning-negro-pre-lavado"
  "Pant Carpediem"                       = "pant-carpediem"
  "Pant Old Money Bari"                  = "pant-old-money-bari"
  "Pant Real Tree Camuflado Carpediem"   = "pant-real-tree-camuflado-carpediem"
  "Pant SuperBaggy"                      = "pant-superbaggy"
  "Pantalon Super Baggy"                 = "pantalon-super-baggy"
  "Baby Tee Bari (Beige)"                = "baby-tee-bari-beige"
  "Baby Tee Bari (Blanca)"               = "baby-tee-bari-blanca"
  "Baby Tee Bari (Negra)"                = "baby-tee-bari-negra"
  "Cold Culture Baby Tee (Blanco)"       = "cold-culture-baby-tee-blanco"
  "Cold Culture Baby Tee (Negro)"        = "cold-culture-baby-tee-negro"
  "Slim Fit Unicolor Carpediem (Blanco)" = "slim-fit-unicolor-carpediem-blanco"
  "Slim Fit Unicolor Carpediem (Negro)"  = "slim-fit-unicolor-carpediem-negro"
}

$categoryFolderMap = @{
  "PANTALONES"         = "pantalones"
  "SLIM FIT - BABY TEE" = "slim-fit"
}
# Add new categories as their folders are created
$folderCat = @{}
$root = $ProductDbPath
foreach ($kv in $categoryFolderMap.GetEnumerator()) {
  $catDir = Join-Path $root $kv.Key
  if (Test-Path $catDir) {
    Get-ChildItem $catDir -Directory | ForEach-Object { $folderCat[$_.Name] = $kv.Value }
  }
}

Write-Host "=== Uploading product images ===" -ForegroundColor Cyan
$totalOk = 0
$totalFail = 0
$sqlUpdates = @()

foreach ($entry in $folderToSlug.GetEnumerator()) {
  $folder = $entry.Key
  $slug   = $entry.Value
  $cat    = $folderCat[$folder]
  if (-not $cat) {
    Write-Host "- Unknown category for: $folder" -ForegroundColor Yellow
    continue
  }

  $slugToFolder = @{}
  foreach ($kv in $categoryFolderMap.GetEnumerator()) { $slugToFolder[$kv.Value] = $kv.Key }
  $catDir = $slugToFolder[$cat]
  $folderPath = Join-Path (Join-Path $root $catDir) $folder

  $images = Get-ChildItem $folderPath -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|webp)' }
  if ($images.Count -eq 0) {
    Write-Host "- No images for: $folder -> $slug" -ForegroundColor Yellow
    continue
  }

  $urls = @()
  foreach ($img in $images) {
    $remotePath = "$cat/$slug/$($img.Name)"
    $uri = "$bucketUrl/$remotePath"
    $publicUri = "$publicUrl/$remotePath"
    $contentType = if ($img.Extension -match 'png') { "image/png" } else { "image/jpeg" }

    try {
      Write-Host "  Uploading: $cat/$slug/$($img.Name)" -ForegroundColor Gray
      Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -InFile $img.FullName -ContentType $contentType | Out-Null
      $urls += $publicUri
      $totalOk++
    } catch {
      try {
        Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -InFile $img.FullName -ContentType $contentType | Out-Null
        $urls += $publicUri
        $totalOk++
      } catch {
        Write-Host "  FAILED: $remotePath - $_" -ForegroundColor Red
        $totalFail++
      }
    }
  }

  if ($urls.Count -gt 0) {
    $urlsStr = $urls -join "', '"
    $sqlUpdates += "update products set images = array['$urlsStr'] where slug = '$slug';"
  }
}

Write-Host " " -NoNewline
Write-Host "=== Results ===" -ForegroundColor Cyan
Write-Host "Uploaded: $totalOk" -ForegroundColor Green
if ($totalFail -gt 0) {
  Write-Host "Failed: $totalFail" -ForegroundColor Red
}

$parentDir = Split-Path $root -Parent
$sqlPath = Join-Path $parentDir "supabase/update-images.sql"
$sqlUpdates | Out-File -FilePath $sqlPath -Encoding utf8
Write-Host "SQL saved to: $sqlPath" -ForegroundColor Yellow
Write-Host "Run that SQL in Supabase SQL Editor to link images." -ForegroundColor Yellow
