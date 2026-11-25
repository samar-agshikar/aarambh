#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "=========================================="
echo "   Building Aarambh Gaze for macOS (.dmg) "
echo "=========================================="
echo ""

# Ensure common Node/Homebrew/nvm paths are loaded when double-clicked from Finder
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if [ -d "$HOME/.nvm/versions/node" ]; then
  LATEST_NVM="$(ls "$HOME/.nvm/versions/node" | tail -n 1 || true)"
  if [ -n "$LATEST_NVM" ]; then
    export PATH="$HOME/.nvm/versions/node/$LATEST_NVM/bin:$PATH"
  fi
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed on this Mac yet."
  echo "Opening https://nodejs.org/ so you can download the LTS installer."
  echo "After installing Node.js, double-click 'Build Mac App.command' again."
  open "https://nodejs.org/"
  read -n 1 -s -r -p "Press any key to close..."
  exit 1
fi

echo "Node version: $(node -v)"
echo "Step 1/2: Installing dependencies (first run may take 1-2 minutes)..."
npm install

echo ""
echo "Step 2/2: Packaging Aarambh Gaze into a macOS .dmg installer..."
npm run build:mac

echo ""
echo "Done! Opening the 'release' folder..."
echo "Double-click the .dmg file and drag 'Aarambh Gaze' into Applications."
open release
