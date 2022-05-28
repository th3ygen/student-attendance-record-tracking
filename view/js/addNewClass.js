const table = document.querySelector('#studentTable');
const select = document.querySelector('#selectStd');
const count = document.querySelector('#stdCount');

let id = 0;
let c = 0;
function appendStudent(name) {
    const html = `
    <div class="stud" id="std-${id}">
        <div class="studName">
            ${name}
        </div>
        <div class="deleteButton" onclick="removeStudent('std-${id++}')">
            <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
    </div>`;


    table.innerHTML += html;
}

function appendStudentIntoList(name) {
    const html = `
        <option value="${name}">${name}</option>
    `

    select.innerHTML += html;
}

function addStudent(value) {
    if (value === 'none') return;

    appendStudent(value);
    count.innerHTML = ++c;

    select.remove(select.selectedIndex);
}

function removeStudent(id) {
    const item = table.querySelector(`#${id}`);

    appendStudentIntoList(item.querySelector('.studName').innerHTML);

    item.remove();

    count.innerHTML = --c;
}