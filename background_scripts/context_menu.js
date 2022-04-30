(function () {
    browser.contextMenus.create({
        id: "add-selection",
        title: "Add selection to removed blocks",
        contexts: ["selection"]
    });

    browser.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId === "add-selection") {
            browser.storage.local.get({
                terms: []
            }).then(res => {
                browser.storage.local.set({terms: Array.from(new Set(res.terms.concat(info.selectionText)))});
            }).catch(reason => {
                console.warn('Failed to get from storage with ' + reason);
            });
        }
    });
})();