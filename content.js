{
  "manifest_version": 2,
  "name": "My Extension",
  "version": "1.0",
  "description": "Description of my extension",
  "permissions": [
    "activeTab"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],  // Matches all URLs
      "js": ["content.js"]       // List of JavaScript files to inject
    }
  ],
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  }
}
