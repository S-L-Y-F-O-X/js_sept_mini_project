"use strict";
const userService = {
    getAll: () => fetch('https://jsonplaceholder.typicode.com/users').then(value => value.json()),
};
class UserRenderer {
    static renderUsers() {
        userService.getAll().then(users => {
            const userList = document.getElementById('user-list');
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-div');
                userDiv.innerHTML = `<p>ID: ${user.id}</p>` + `<p>Name: ${user.name}</p>`;
                const button = document.createElement('button');
                button.classList.add('button-user');
                button.textContent = 'Details';
                button.addEventListener('click', () => {
                    window.location.href = `user-details.html?id=${user.id}`;
                });
                userDiv.appendChild(button);
                userList.appendChild(userDiv);
            });
        });
    }
}
UserRenderer.renderUsers();
