import html from "./app.html";
import './app.css'

// константы

// исчетчик идентификаторов
let counter = 2;
// контент
let content = [
    {
        "id": 1,
        "name": "Sam",
        "inn": 1234,
        "address": "test",
        "kpp": 1234
    }
]

// элемент, куда вставляем наш html
const rootElement = document.getElementById('root');
// делаем вставку нашего html из app.html где появляются наши шаблоны
rootElement.innerHTML = html;

// в шаблоне, где появляется наша таблица
const divWrapperElement = document.querySelector('main').querySelector('div');
// заголовок таблицы
const tHeadElement = divWrapperElement.querySelector('thead');
// содержание таблицы
const tBodyElement = divWrapperElement.querySelector('tbody');
// шаблон заголовка таблицы
const templateHeadRow = document.querySelector("template[id='template-head-column']");
// шаблон строки таблицы
const templateRow = document.querySelector("template[id='template-row']");
// шаблон ячейки таблицы
const templateRowColumn = document.querySelector("template[id='template-row-column']");
// шаблон кнопки удаления данных из таблицы
const templateRemoveButton = document.querySelector("template[id='remove-counterparty-button']");

// получаем поля ввода
const formElement = document.getElementById('counterparty-form');
const formNameElement = formElement.querySelector("input[id='name']");
const formKppElement = formElement.querySelector("input[id='kpp']");
const formAddressElement = formElement.querySelector("input[id='address']");
const formInnElement = formElement.querySelector("input[id='inn']");

// кнопка закрытия формы
const closeBtn = document.getElementById("close-button-custom");



// functions
// функция создания ячейки по содержимому
const createRowColumn = (content) => {
    const rowColumn = templateRowColumn.content.children[0].cloneNode();
    rowColumn.innerHTML = content;
    return rowColumn;
}

const removeRow = (event) => {
        // удаляем запись из массива по id аттрибута кнопки
        content = content.filter(item => item.id != event.target.getAttribute("data-id"));
        // перерисовываем табличку
        refreshCounterpartyTableContent();
 }

const createRemoveButtonRowColumn = (id) => {
    // создаем кнопку по шаблону, для удаления контрагентов
    const removeButton = templateRemoveButton.content.children[0].cloneNode();
    removeButton.innerHTML = "удалить";

    // добавляем эвент удаления
    removeButton.addEventListener('click', event => removeRow(event));
    // добавляем атрибут, какой элемент нужно удалить по нажатию
    removeButton.setAttribute("data-id", id);
    // создаем ячейку
    const rowColumn = templateRowColumn.content.children[0].cloneNode();
    // добавляем кнопку в ячейку
    rowColumn.append(removeButton);
    return rowColumn;
}

// функция очистки таблицы контрагентов
const clearAllRows = () => {
    // находим все строки с контрагентами
    let trs = document.querySelectorAll('.dom-table-body tr');
    // удаляем строки в цикле
    trs.forEach((tr)=> {
        tr.remove();
    });
}

// обновление содержимого таблицы
const refreshCounterpartyTableContent = () => {
    //очищаем таблицу перед перерисовкой
    clearAllRows();
    // перебираем элементы контрагентов
    for(const item of content) {
        // создаем строку по шаблону, в которую будем записывать контрагента
        const bodyRowElement = templateRow.content.children[0].cloneNode();
        // добавляем идентифкатор контрагента в строку
        bodyRowElement.setAttribute("data-id", item.id);
        bodyRowElement.addEventListener('dblclick', (event) => {
            // проставляем в кнопку идентификатор элемента, на который нажали
            openModalButton.setAttribute("data-id", bodyRowElement.getAttribute("data-id"));
            // нажимаем кнопку отобразить форму
            openModalButton.click();
        });

        //добавляем ячейки в строку
        bodyRowElement.appendChild(createRowColumn(item.id));
        bodyRowElement.appendChild(createRowColumn(item.name));
        bodyRowElement.appendChild(createRowColumn(item.inn));
        bodyRowElement.appendChild(createRowColumn(item.address));
        bodyRowElement.appendChild(createRowColumn(item.kpp));
        // добавляем ячейку с кнопкой
        bodyRowElement.appendChild(createRemoveButtonRowColumn(item.id));

        // добавляем строку в тело таблицы
        tBodyElement.appendChild(bodyRowElement)
    }
}

// функция создания меню по набору элементов
const createCounterpartyTable = (elements) => {
    // создаем строку заголовок
    const headRowElement = document.createElement('tr');

    // наполняем ячейки в строку заголовка
    for(const column of ['id', 'name', 'inn', 'address', 'kpp', 'remove']) {
        const columnElement = templateHeadRow.content.children[0].cloneNode(true);

        columnElement.innerHTML = column;

        headRowElement.appendChild(columnElement)
    }

    // добавляем строку в блок заголовка
    tHeadElement.appendChild(headRowElement)

    // обновляем данные в таблице
    refreshCounterpartyTableContent();
}

// отрисовываем табличку
createCounterpartyTable(content);

// функция заполнения формы контрагента
const fillCounterpartyForm = (element) => {
    // переменная, показывающая задан ли элемен для заполнения
    let isValueDefined = element !== undefined;
    // значения для заполнения формы
    let name = isValueDefined ? element.name : '';
    let kpp = isValueDefined ? element.kpp : '';
    let address = isValueDefined ? element.address : '';
    let inn = isValueDefined ? element.inn : '';

    // если элемент существует, то форме добавляем аттрибут идентификатора
    if (isValueDefined) {
        formElement.setAttribute("data-id", element.id);
    } else {
        // чистим аттрибут, если нет элемента
        formElement.removeAttribute("data-id");
    }

    //заполняем поля ввода значениями элемента
    formNameElement.value = name;
    formKppElement.value = kpp;
    formAddressElement.value = address;
    formInnElement.value = inn;
}

// фнукцию очищающая форму контрагента
const clearForm = () => {
    fillCounterpartyForm();
}

// получить данные формы
const getFormValue = () => {
    return {
        "id": formElement.getAttribute("data-id"),
        "name": formNameElement.value,
        "kpp": formKppElement.value,
        "address": formAddressElement.value,
        "inn": formInnElement.value
    };
}

// находим кнопку добавить
const openModalButton = document.getElementById("open-modal");

// добавляем обработчик нажатия
openModalButton.addEventListener('click', (e) => {
    // находим элемент, для которого выбрали действие
    let element = content.find(item => item.id == event.target.getAttribute("data-id"));
    // убираем прочитанный аттрибут
    event.target.removeAttribute("data-id");
    // заполняем форму в соответствии с элементом
    fillCounterpartyForm(element);
    //если создаем называем кнопку create иначе update
    if (element !== undefined) {
        addButton.innerText = 'Update';
    } else {
        addButton.innerText = 'Create';
    }
});

// находим кнопку добавления контрагента
const addButton = document.getElementById("create-button-custom");

// добавить обработку нажатия кнопки добавить
addButton.addEventListener('click', (e) => {
    // берем данные, которые пользователь ввел
    let formValues = getFormValue();

    //обновляем форму
    clearForm();

    // если новый сотрудник, то его добавляем
    if (formValues.id === null) {
        // добавляем идентификатор к данным формы
        let newCounterparty = {... formValues, "id": counter++}
        // добавляем созданного контрагента в контекст
        content.push(newCounterparty);
    } else {
        // если существующий, то находим его
        let element = content.find(item => item.id == formValues.id);
        // заполняем поля элемента
        element.name = formValues.name;
        element.kpp = formValues.kpp;
        element.address = formValues.address;
        element.inn = formValues.inn;
    }

    // закрыть форму
    closeBtn.click();
    // перерисовать данные таблицы
    refreshCounterpartyTableContent();
})

closeBtn.addEventListener('click', (event) => {
    console.log('test');
    clearForm();
});