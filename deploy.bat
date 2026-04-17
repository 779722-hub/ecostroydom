@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion
cd /d "%~dp0"

echo.
echo ============================================================
echo   EcoStroyDom — Deploy to GitHub Pages
echo ============================================================
echo.

REM === Check if this is a git repo ===
if not exist ".git" (
  echo [X] This folder is not a git repository.
  echo     Run: git init
  pause
  exit /b 1
)

REM === Show what will be committed ===
echo Changes:
git status --short
echo.

REM === Bail out if nothing to commit ===
for /f "delims=" %%i in ('git status --porcelain') do set HAS_CHANGES=1
if not defined HAS_CHANGES (
  echo [i] No changes to commit. Pushing any local commits to remote...
  git push
  echo.
  echo Done.
  pause
  exit /b 0
)

REM === Ask for commit message ===
set /p MSG=Commit message (press Enter for auto timestamp):

if "!MSG!"=="" (
  for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /value ^| find "="') do set DT=%%a
  set "MSG=Update !DT:~0,4!-!DT:~4,2!-!DT:~6,2! !DT:~8,2!:!DT:~10,2!"
)

echo.
echo Staging all changes...
git add -A

echo Committing: "!MSG!"
git commit -m "!MSG!"
if errorlevel 1 (
  echo [X] Commit failed.
  pause
  exit /b 1
)

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 (
  echo.
  echo [!] Push failed. Trying pull --rebase and push again...
  git pull --rebase
  git push
  if errorlevel 1 (
    echo [X] Push still failed. Resolve manually.
    pause
    exit /b 1
  )
)

echo.
echo ============================================================
echo   [OK] Deployed. Site will update in ~1 min.
echo   https://ecostroydom.kz/   (Ctrl+F5 to refresh)
echo ============================================================
echo.
pause
