import html from './dom.html';
import './dom.css';


const createMenu = (selector, elements) => {
    const element = document.createElement('div');
    element.innerHTML = html;


    const rootElement = element;

    const divWrapperElement1 = rootElement.querySelector('main');
    const divWrapperElement = divWrapperElement1.querySelector('div');
    const tHeadElement = divWrapperElement.querySelector('thead');
    const tBodyElement = divWrapperElement.querySelector('tbody');
    const templateHeadRow = rootElement.querySelector("template[id='template-head-column']")
    const templateRowHead = rootElement.querySelector("template[id='template-row-head']")
    const templateRowColumn = rootElement.querySelector("template[id='template-row-column']")

    const headRowElement = document.createElement('tr');

    for(const column of ['id', 'name', 'inn', 'address', 'kpp']) {
        const columnElement = templateHeadRow.content.children[0].cloneNode(true);

        columnElement.innerHTML = column;

        headRowElement.appendChild(columnElement)
    }

    tHeadElement.appendChild(headRowElement)

    const createRowColumn = (content) => {
        const rowColumn = templateRowColumn.content.children[0].cloneNode();
        rowColumn.innerHTML = content;
        return rowColumn;
    }

    for(const item of elements) {
        const bodyRowElement = document.createElement('tr');

        bodyRowElement.classList.add('dom-table-row')

        const rowHead = templateRowHead.content.children[0].cloneNode();

        bodyRowElement.appendChild(rowHead)
        bodyRowElement.appendChild(createRowColumn(item.id));
        bodyRowElement.appendChild(createRowColumn(item.name));
        bodyRowElement.appendChild(createRowColumn(item.inn));
        bodyRowElement.appendChild(createRowColumn(item.address));
        bodyRowElement.appendChild(createRowColumn(item.kpp));
        rowHead.innerHTML = item.name;

        tBodyElement.appendChild(bodyRowElement)
    }

    const lastRow = divWrapperElement.querySelector('tbody>tr:last-child');
        window.document.getElementById(selector).append(element);
}

export { createMenu }