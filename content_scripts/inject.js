function init() {
    highlightBlocks();
    initOptions();
    browser.storage.onChanged.addListener(handleStorageChanges);
}

function highlightBlocks() {
    document.querySelectorAll('.object-cell-border').forEach(function (e) {
        if (e.innerText.includes('Üb')) {
            e.classList.add('prac');
        } else if (e.innerText.includes('Repetitorium')) {
            e.classList.add('rep');
        } else if (e.innerText.includes('Gremienblock')) {
            e.classList.add('gblock');
        } else {
            e.classList.add('lec');
        }
    });
}

function updateBlocks(listOfBlocksToRemove) {
    resetBlocks();
    removeBlocksByNameList(listOfBlocksToRemove);
}

function resetBlocks() {
    document.querySelectorAll('.object-cell-border').forEach(e => e.classList.remove('gray-out'))
}

function removeBlocksByNameList(listOfBlocksToRemove) {
    if (!listOfBlocksToRemove) {
        return;
    }
    //Well, this is needlessly complex tbh, but I wanted to use filter and map ^^
    Array.from(document.querySelectorAll('.object-cell-border'))
        .filter((block) => {
            return listOfBlocksToRemove
                .filter(name => {
                    return block.innerText.includes(name);
                }, block).length > 0;
        }, listOfBlocksToRemove).map(blockToRemove => {
        blockToRemove.classList.add('gray-out');
    });
}

function handleStorageChanges(changes, area){
    if(area === 'local'){
        initOptions();
    }
}

function initOptions() {
    browser.storage.local.get({
        terms: []
    }).then(res => updateBlocks(res.terms))
        .catch(console.warn)
}

init();