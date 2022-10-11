class TTTimeTable {
    ths = []
    matrix = []

    constructor() {
        let index = 1
        document.querySelectorAll('.col-label-one').forEach(th => {
            for (let i = 0; i < th.colSpan; ++i, ++index) {
                this.ths[index] = {elem: th, span: th.colSpan - i}
            }
        })

        let rows = document.querySelector('.grid-border-args').firstElementChild.rows
        let rowCount = rows.length
        for (let i = 0; i < rowCount; ++i) {
            this.matrix[i] = []
        }
        for (let r of rows) {
            for (let c of r.cells) {
                let index = c.cellIndex
                let finished = false
                while (!finished) {
                    if (typeof this.matrix[r.rowIndex][index] === "undefined") {
                        this.matrix[r.rowIndex][index] = c
                        finished = true
                        if (c.rowSpan > 1) {
                            for (let s = 1; s < c.rowSpan; ++s) {
                                this.matrix[r.rowIndex + s][index] = false
                            }
                        }
                    } else {
                        ++index
                    }
                }
            }
        }
    }

    buildTable() {
        if (!this.matrix.length) {
            return
        }
        let tbl = document.createElement('table')
        tbl.id = 'tt-table'
        let tr = document.createElement('tr')
        tbl.appendChild(tr)
        tr.classList.add('tt-tr')

        for (let i = 0; i < this.matrix[0].length; ++i) {
            let th = document.createElement('th')
            th.innerText = this.matrix[0][i].innerText
            th.colSpan = this.matrix[0][i].colSpan
            tr.appendChild(th)
            th.classList.add('tt-th')
        }

        for (let r = 1; r < this.matrix.length; ++r) {
            let tr = document.createElement('tr')
            for (let c = 0; c < this.matrix.length; ++c) {
                if (this.matrix[r][c]) {
                    let td = this.matrix[r][c].cloneNode(true)
                    tr.appendChild(td)
                    let isBlock = td.classList.contains('object-cell-border')
                    td.classList.remove(...td.classList)
                    td.classList.add('tt-td')
                    if (isBlock) {
                        td.classList.add('tt-block')
                    }
                }
            }
            tr.classList.add('tt-tr')
            tbl.appendChild(tr)
        }
        return tbl
    }

}

function init() {
    initOptions();
    browser.storage.onChanged.addListener(handleStorageChanges);

    let timeTable = new TTTimeTable()

    for (let rIndex = 1; rIndex < timeTable.matrix.length; ++rIndex) {
        for (let cIndex = 1; cIndex < timeTable.matrix[rIndex].length; ++cIndex) {
            let col = timeTable.matrix[rIndex][cIndex]

            if (timeTable.matrix[rIndex][cIndex]
                && timeTable.ths[cIndex].span > 1
                && !neighbourCount(timeTable, rIndex, cIndex)
            ) {
                col.colSpan = timeTable.ths[cIndex].span
                for (let r = rIndex; r < rIndex + col.rowSpan; ++r) {
                    for (let c = cIndex + 1; c < cIndex + col.colSpan; ++c) {
                        timeTable.matrix[r][c].parentNode.removeChild(timeTable.matrix[r][c])
                        timeTable.matrix[r][c] = false
                    }
                }
            }
        }
    }

    let oldTable = document.querySelector('.grid-border-args')
    oldTable.replaceWith(timeTable.buildTable())

    highlightBlocks();
}

function neighbourCount(timeTable, row, col) {
    let cell = timeTable.matrix[row][col]
    let span = timeTable.ths[col].span
    let count = 0;
    for (let r = 0; r < cell.rowSpan; ++r) {
        for (let c = 1; c < span; ++c) {
            if (timeTable.matrix[row + r][col + c] === false || timeTable.matrix[row + r][col + c].classList.contains('object-cell-border')) {
                ++count
            }
        }
    }
    return count
}

function highlightBlocks(groups) {
    document.querySelectorAll('.tt-block')
        .forEach(function (e) {
            groups.forEach(group => {
                group.keywords.forEach(keyword => {
                    if (e.innerText.includes(keyword)) {
                        e.style.backgroundColor = group.groupColor
                    }
                })
            })
        });
}

function resetBlocks() {
    document.querySelectorAll('.tt-block').forEach(e => {
        e.classList.remove('gray-out')
        e.style.backgroundColor = '#bfbfbf'
    })
}

function removeBlocksByNameList(listOfBlocksToRemove) {
    if (!listOfBlocksToRemove) {
        return;
    }
    //Well, this is needlessly complex tbh, but I wanted to use filter and map ^^
    Array.from(document.querySelectorAll('.tt-block'))
        .filter((block) => {
            return listOfBlocksToRemove
                .filter(name => {
                    return block.innerText.includes(name);
                }, block).length > 0;
        }, listOfBlocksToRemove).map(blockToRemove => {
        blockToRemove.classList.add('gray-out');
    });
}

function handleStorageChanges(changes, area) {
    if (area === 'local') {
        initOptions();
    }
}

function initOptions() {
    resetBlocks()

    browser.storage.local.get({
        terms: [],
        groups: []
    }).then(res => {
        highlightBlocks(res.groups)
        removeBlocksByNameList(res.terms)
    }).catch(console.warn)
}

init();