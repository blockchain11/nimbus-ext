import * as browser from "webextension-polyfill";
import { onMessage } from "webext-bridge";

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

console.log(browser);

const fetchBasicData = async () => {
  const list = await fetch("https://api.coingecko.com/api/v3/search").then(
    (response) => response.json()
  );
  console.log(browser.storage);
  browser.storage.local
    .set({ coinList: JSON.stringify(list.coins) })
    .then(() => {
      console.log("Loaded crypto list");
    });
};

const fetchConfigPages = async () => {
  const listConfigPages = await fetch("https://utils.getnimbus.xyz/config/pages").then((response) => response.json());
  browser.storage.local
    .set({ configPageList: JSON.stringify(listConfigPages.data) })
    .then(() => {
      console.log("Loaded config page list");
    });
};

const fetchSearchData = async (search) => {
  const list = await fetch(`https://api.coingecko.com/api/v3/search?query=${search}`).then((response) => response.json());
  return JSON.stringify(list.coins)
}

browser.runtime.onStartup.addListener(async () => {
  console.log("onStartup....");
  await fetchBasicData();
  await fetchConfigPages();
});

interface ICoinListInput {
  limit: number;
}

interface ISearchInput {
  search: string;
}

onMessage<ICoinListInput, any>("coinList", async ({ data: { limit } }) => {
  try {
    const data = JSON.parse(
      (await browser.storage.local.get("coinList")).coinList
    );
    return data.slice(0, limit);
  } catch (error) {
    return [];
  }
});

onMessage("configPageList", async () => {
  try {
    return JSON.parse(
      (await browser.storage.local.get("configPageList")).configPageList
    );
  } catch (error) {
    return [];
  }
});

onMessage<ISearchInput, any>("getSearchData", async ({ data: { search } }) => {
  try {
    const data = JSON.parse(await fetchSearchData(search))
    return data.slice(0, 5)
  } catch (e) {
    return [];
  }
});

// Run on init
fetchBasicData();
fetchConfigPages();
