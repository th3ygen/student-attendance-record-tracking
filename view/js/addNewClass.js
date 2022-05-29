/* async function addNewClass(name, maxStudent, teacherId, timeslots, students) {

}
 */
function addStudent(value) {
	if (value === "none") return;

	appendStudent(value);
	count.innerHTML = ++c;

    stds[value].selected = true;

	select.remove(select.selectedIndex);
}

function removeStudent(id) {
	const item = table.querySelector(`#${id}`);
    let name = item.querySelector(".studName").innerHTML.replace(/^\s+|\s+$/g, '');

	appendStudentIntoList(name);

    stds[name].selected = false;

	item.remove();

	count.innerHTML = --c;
}

const table = document.querySelector("#studentTable");
const select = document.querySelector("#selectStd");
const count = document.querySelector("#stdCount");
let stds = {};
const selected = [];

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
    `;

	select.innerHTML += html;
}

async function submit() {
    const user = JSON.parse(localStorage.getItem("user"));

	const name = document.querySelector("#className").value;
    const teacherId = user.id;
	const maxStudent = document.querySelector("#maxStudent").value;
	const timeslot1 = document.querySelector("#timeSlot1").value;
	const timeslot2 = document.querySelector("#timeSlot2").value;
    const students = Object.keys(stds).filter(key => stds[key].selected).map(key => stds[key].id);

    const req = await fetch("http://localhost:3000/api/class/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                teacherId,
                maxStudent,
                timeslots: [timeslot1, timeslot2],
                students,
                
                }),
        });

    if (req.status === 200) {
        alert("Class added successfully");
        /* window.location.href = "./class.html"; */
    } else {
        alert("Something went wrong");
    }

}

window.onload = async () => {
	const req = await fetch("http://localhost:3000/api/class/student/get");

	if (req.status === 200) {
		const { students } = await req.json();

		for (let student of students) {
			
            stds[student.name] = {
                id: student._id,
                selected: false
            };

			appendStudentIntoList(student.name);
		}
	}
};
