(function () {
    const delimiterInput = document.getElementById('input-delimiter');
    const blocksToDelete = document.getElementById('input-blocks-to-remove');
    if (!delimiterInput || !blocksToDelete) {
        console.warn('dom elements missing');
        return;
    }

    restoreOptionsFromStorage();

    delimiterInput.addEventListener('change', saveOptionsToStorage);
    blocksToDelete.addEventListener('change', saveOptionsToStorage);

    function saveOptionsToStorage() {
        browser.storage.local.set({
            delimiter: delimiterInput.value,
            terms: getTermsArray()
        });
    }

    function restoreOptionsFromStorage() {
        browser.storage.local.get({
            delimiter: "",
            terms: ""
        }).then(res => {
            delimiterInput.value = res.delimiter;
            blocksToDelete.value = res.terms.join(res.delimiter);
        });
    }

    function getTermsArray() {
        return blocksToDelete.value === "" ? [] : blocksToDelete.value.split(delimiterInput.value);
    }

})();