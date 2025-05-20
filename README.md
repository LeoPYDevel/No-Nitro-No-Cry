---

# 💬 Discord Emoji Unlocker – **Patched & Improved Fork**

> ⚠️ This project is **not originally mine**. It’s a **patched continuation** with performance tweaks and some **new features** added on top of the original idea.

---

## 🚀 What does it do?

This extension allows you to **use and copy Discord emojis/stickers** without Nitro by unlocking blocked UI behavior. No more grayed-out emojis or Nitro nags.

### ✅ Features:

* Click any emoji or sticker to copy its **direct URL**.
* Detects animated emojis and, if available, **copies the `.gif` version** automatically.
* Optional PNG mode for higher quality (`.png` instead of `.webp`).
* Optional bigger emojis (to look like stickers).
* Removes Nitro popups and UI annoyances.
* Requires **no Discord token**, and **doesn’t connect to the internet** (besides fetching emoji images).

---

## 🔧 My contributions in this version:

* 🔄 **Added .gif fallback support** for animated emojis.
* ⚡ **Performance improvements** (avoid duplicated event listeners).
* 🧼 Minor code cleanup.
* 🛠️ Configurable settings using `chrome.storage.local`:

  * `BiggerEmoji` – make emojis appear large.
  * `UsePng` – force PNG output for better image quality.

---

## 💻 Installation Instructions

### Firefox:

> ⚠️ **Not tested yet on Firefox**, only tested on **Brave**.

* Get the official version from Firefox Addons *(if available)*

### Chrome / Edge / Brave / Opera:

1. Download this repository as a ZIP from GitHub.
2. Unzip it.
3. Inside the unzipped folder, you'll find a subfolder called `brave` – **rename it to anything you want** (e.g. `emoji-unlocker`).
4. Go to your browser's extensions page:

   * `chrome://extensions`
   * `brave://extensions`
   * `edge://extensions`
   * `opera://extensions`
5. Enable **Developer Mode**.
6. Drag and drop the renamed folder into the page.

> 💡 If drag & drop doesn't work:

* Click **"Load unpacked"**
* Select the renamed folder manually.

---

## 🧪 How to Use

* Just **click any emoji or sticker** in the Discord web interface (emoji panel or chat).
* It will be copied directly to your clipboard.

---

## ❓ FAQ

**Does this steal my token?**
🚫 Absolutely not. It doesn't access or send any data to any server. Feel free to inspect the code.

**How does it work?**
🧠 It simply modifies the Discord webpage locally using `content.js`.

**Can I get banned for using this?**
🤷 Probably not. The extension doesn’t send any requests or interfere with Discord servers, so there’s no way for Discord to know you’re using it.

**It have virus?**
No, and you can verify this, opening the code. Is open source and you can modify it if you want.

---

## 📢 Important Notes

* This is still **under development**, so expect some bugs or edge cases.
* Currently **tested only in Brave**. Firefox is **not yet confirmed** to work.
* Once downloaded, **rename the internal `brave` folder** to your preferred extension folder name.

---

## 🧰 TODO

* [ ] Add a UI panel to configure extension settings directly.
* [ ] Confirm Firefox compatibility.

---

## 📬 Got issues or questions?

Open an Issue I'll reply and fix things as soon as I can 😊

---


This original code NOT is mine, i use the code of: https://github.com/SuhasDissa/NotQuiteNitro
But i make it a litle bit better.

Copyright (c) 2021 Suhas Dissanayake
