function logout() {
    localStorage.removeItem('user');
    window.location.href = '/view/index.html';
}

try {
    const user = JSON.parse(localStorage.getItem("user"));

    document.querySelector("#name").innerHTML = user.name;
} catch (e) {
    console.log(e);
}

document.querySelector('#notinav').addEventListener('click', () => {
    window.location.href = 'notification.html';
});