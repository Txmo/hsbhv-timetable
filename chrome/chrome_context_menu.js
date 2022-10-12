chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "add-selection",
        title: "Add selection to removed blocks",
        contexts: ["selection"]
    });

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId === "add-selection") {
            chrome.storage.local.get(['terms'], (res) => {
                chrome.storage.local.set({
                    terms: Array.from(new Set((res?.terms ?? []).concat(info.selectionText)))
                })
            })
        }
    });
});