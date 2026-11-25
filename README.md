# Aarambh Gaze — macOS Desktop App

Everything is pre-configured to produce a native **`Aarambh Gaze.dmg`** installer that you can drag straight into your Mac's **Applications** folder.

---

## Method 1: Build the `.dmg` Directly on Your Mac (One Double-Click)

1. Unzip this folder on your Mac.
2. Make sure [Node.js LTS](https://nodejs.org/) is installed.
3. Double-click **`Build Mac App.command`** inside the folder.
   - *(If macOS warns that it can't verify the script, right-click `Build Mac App.command` → **Open** → **Open**.)*
4. Wait ~1–2 minutes while dependencies download and the app packages.
5. Finder will automatically open the **`release/`** folder containing **`Aarambh Gaze-1.0.0-arm64.dmg`** (or `x64.dmg` on Intel Macs).
6. Double-click the `.dmg` and drag **Aarambh Gaze** into **Applications**.

---

## Method 2: Let GitHub Build the `.dmg` for You in the Cloud

1. Push this folder to a new GitHub repository (`main` branch).
2. Open your repository on GitHub → click the **Actions** tab.
3. Click the **Build macOS App (.dmg)** workflow run (it starts automatically on push).
4. Once it finishes (~2 minutes), scroll to **Artifacts** and download **`Aarambh-Gaze-macOS-DMG`**.
5. Unzip it, open the `.dmg` for your Mac (`arm64` for M1/M2/M3/M4 Macs, `x64` for Intel Macs), and drag **Aarambh Gaze** into **Applications**.

---

## First Time Opening on macOS

Because this personal build is not signed with a paid $99/year Apple Developer certificate, macOS Gatekeeper may ask before opening it the very first time:

1. In **Applications**, **right-click** (or Control-click) **Aarambh Gaze** → click **Open**.
2. If macOS says the app cannot be verified, open **System Settings → Privacy & Security**, scroll down, and click **Open Anyway** next to *Aarambh Gaze*.
3. After that first launch, it opens normally from Spotlight, Launchpad, or your Dock.
