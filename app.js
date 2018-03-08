const form = document.querySelector('#registrar');
const input = form.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    //creating the li element
    const li = document.createElement('li');
    const name = input.value;
    li.textContent = name;

    //selecting ul and appending new li to it
    const ul = document.querySelector('#invitedList');
    ul.appendChild(li);
    console.log(name);
});
