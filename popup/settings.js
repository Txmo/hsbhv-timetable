(function () {
    const delimiterInput = document.getElementById('input-delimiter');
    const blocksToDelete = document.getElementById('input-blocks-to-remove');
    const addGroupBtn = document.getElementById('addColorGroup')
    if (!delimiterInput || !blocksToDelete || !addGroupBtn) {
        console.warn('dom elements missing');
        return;
    }

    restoreOptionsFromStorage();

    delimiterInput.addEventListener('change', saveOptionsToStorage);
    blocksToDelete.addEventListener('change', saveOptionsToStorage);
    addGroupBtn.addEventListener('click', () => {
        addGroup(null)
    })

    function addGroup(data) {
        let container = document.createElement('div')
        container.classList.add('tt-color-block')
        container.appendChild(createGroupInfo(data))

        let keywords = createKeywords(data)
        container.appendChild(keywords)

        let btnContainer = document.createElement('div')
        let addKeywordBtn = document.createElement('button')
        addKeywordBtn.innerText = 'Add keyword'
        addKeywordBtn.addEventListener('click', () => {
            keywords.appendChild(createKeywordContainer(null))
        })
        btnContainer.appendChild(addKeywordBtn)
        container.appendChild(btnContainer)
        document.getElementById('groupContainer').append(container)
    }

    function createGroupInfo(data) {
        let groupInfo = document.createElement('div')
        groupInfo.classList.add('tt-group-info')
        let title = document.createElement('div')
        title.innerText = 'Group'
        let btnRemove = document.createElement('button')
        btnRemove.innerText = '🗑'
        btnRemove.addEventListener('click', () => {
            groupInfo.parentElement.parentElement.removeChild(groupInfo.parentElement)
            saveOptionsToStorage()
        })
        title.appendChild(btnRemove)
        groupInfo.appendChild(title)
        let groupName = createGroupName(data ? data.groupName : null)
        let groupColor = createColorPicker(data ? data.groupColor : null)
        groupInfo.append(groupName, groupColor)
        return groupInfo
    }

    function createKeywords(data) {
        let keywords = document.createElement('div')
        keywords.classList.add('tt-keywords')
        let keywordsTitle = document.createElement('div')
        keywordsTitle.innerText = 'Keywords'
        keywords.appendChild(keywordsTitle)
        let keywordsList = document.createElement('div')
        let list
        if (data && data.keywords && data.keywords.length) {
            list = data.keywords
        } else {
            list = ['']
        }
        list.forEach(keyword => {
            keywordsList.appendChild(createKeywordContainer(keyword))
        })
        keywords.appendChild(keywordsList)
        return keywords
    }

    function createKeywordContainer(keyword) {
        let inpDiv = document.createElement('div')
        inpDiv.classList.add('tt-keyword-container')
        let inpKeyword = createKeywordInput(keyword)
        inpKeyword.addEventListener('click', saveOptionsToStorage)
        let btnRemove = document.createElement('button')
        btnRemove.innerText = '🗑'
        btnRemove.addEventListener('click', () => {
            inpDiv.parentElement.removeChild(inpDiv)
            saveOptionsToStorage()
        })
        inpDiv.append(inpKeyword, btnRemove)
        return inpDiv
    }

    function createKeywordInput(keyword) {
        let inp = document.createElement('input')
        inp.type = 'text'
        inp.classList.add('tt-input-keyword')
        inp.addEventListener('change', saveOptionsToStorage)
        if (keyword) {
            inp.value = keyword
        }
        return inp
    }

    function createGroupName(name) {
        let inp = document.createElement('input')
        inp.type = 'text'
        inp.classList.add('tt-input-group-name')
        inp.placeholder = 'Group name (optional)'
        inp.addEventListener('change', saveOptionsToStorage)
        if (name) {
            inp.value = name
        }
        return inp
    }

    function createColorPicker(color) {
        let inp = document.createElement('input')
        inp.type = 'text'
        inp.placeholder = 'hex-color-code (e.g. ##FF4500)'
        inp.classList.add('tt-input-color-picker')
        inp.addEventListener('change', saveOptionsToStorage)
        if (color) {
            inp.value = color
        }
        return inp
    }

    function saveOptionsToStorage() {
        chrome.storage.local.set({
            delimiter: delimiterInput.value === "" ? ";" : delimiterInput.value,
            terms: getTermsArray(),
            groups: getGroupsArray()
        });
    }

    function restoreOptionsFromStorage() {
        chrome.storage.local.get(['delimiter', 'terms', 'groups'], (res) => {
            delimiterInput.value = (res?.delimiter ?? '') === "" ? ";" : res.delimiter;
            blocksToDelete.value = (res?.terms ?? []).join(res.delimiter);
            (res?.groups ?? []).forEach((group) => {
                addGroup(group)
            })
        })
    }

    function getTermsArray() {
        return blocksToDelete.value === "" ? [] : blocksToDelete.value.split(delimiterInput.value);
    }

    function getGroupsArray() {
        let res = []
        document.querySelectorAll('.tt-color-block')
            .forEach((dom) => {
                let obj = {}
                obj.groupName = dom.querySelector('.tt-input-group-name').value
                obj.groupColor = dom.querySelector('.tt-input-color-picker').value
                obj.keywords = []
                dom.querySelectorAll('.tt-input-keyword')
                    .forEach((input) => {
                        if (input.value) {
                            obj.keywords.push(input.value)
                        }
                    })
                res.push(obj)
            })

        return res
    }

})();