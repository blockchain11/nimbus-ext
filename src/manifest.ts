import pkg from "../package.json";

const ManifestV3: Partial<chrome.runtime.ManifestV3> = {
  content_scripts: [
    {
      js: ["src/entries/contentScript/main.ts"],
      matches: ["*://*/*"],
    },
  ],
  icons: {
    512: "icons/logo-icon.png",
  },
  // options_ui: {
  //   page: "src/entries/options/index.html",
  //   open_in_tab: true,
  // },
  // chrome_url_overrides: {
  //   newtab: "src/entries/newTab/index.html",
  // },
  web_accessible_resources: [
    {
      resources: ["src/entries/contentScript/assets/full-logo.svg"],
      matches: ["*://*/*"],
    },
  ],
  permissions: ["storage", "unlimitedStorage", "activeTab"],
  commands: {
    "open-quick-search": {
      suggested_key: {
        default: "Ctrl+Shift+K",
        mac: "Command+Shift+K",
      },
      description: "Open Quick Search",
    },
  },
  action: {
    default_icon: {
      // 16: "icons/16.png",
      // 19: "icons/19.png",
      // 32: "icons/32.png",
      38: "icons/logo-icon.png",
    },
    default_title: "Open Nimbus sidebar",
  },
  background: {
    service_worker: "src/entries/background/serviceWorker.ts",
    // type: "module",
  },
  host_permissions: ["*://*/*"],
};

export function getManifest(): chrome.runtime.ManifestV3 {
  const manifest = {
    author: pkg.author,
    description: pkg.description,
    name: pkg.displayName ?? pkg.name,
    version: pkg.version,
  };

  return {
    ...manifest,
    ...ManifestV3,
    manifest_version: 3,
  };
}
