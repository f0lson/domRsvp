const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

const createListItem = (userInput) => {
    // creating the list item
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = userInput;
    li.appendChild(span);

    //creating and appending rsvp checkbox
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const rsvpCheckbox = document.createElement('input');
    rsvpCheckbox.type = 'checkbox';
    label.appendChild(rsvpCheckbox);
    li.appendChild(label);

    //creating and appending edit button
    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    li.appendChild(edit);

    //creating and appending remove button
    const remove = document.createElement('button');
    remove.textContent = 'Remove';
    li.appendChild(remove);

    return li;
}

// When a user submits the form (hits 'enter' or clicks the button) we will create an <li> with the user's input in it and attach it to the 'Invitees' section (the <ul>)
form.addEventListener('submit', (e) => {
    // preventing the form from submitting (it's default behavior)
    e.preventDefault();

    // storing the user's input in the 'name' variable
    const name = input.value;

    // using the function to create the list item
    const li = createListItem(name);

    // selecting ul and appending new li to it
    ul.appendChild(li);

    // reset the input field
    input.value = '';
});

// because we're going to be adding and removing so many list items, it is best to add the event listeners to the parent element. The event will delegate down to the respective

ul.addEventListener('change', (e) => {
    // assigning the element we changed to the variable checkbox
    const checkbox = e.target;
    // the 'checked' state of the checkbox returns a boolean value of true when it's checked.
    const checked = checkbox.checked;
    // reference the list item to change its class later
    const li = checkbox.parentNode.parentNode;

    // if something has a true value for checked then we add the class 'responded' otherwise we remove the class name.
    if (checked) {
        li.className = 'responded';
    } else {
        li.className = '';
    }
});

ul.addEventListener('click', (e) => {
    // qualifying the click
    // if the element clicked has a textContent of 'Remove' then we remove the li from the ul
    if (e.target.tagName === 'BUTTON') {

        const button = e.target;
        const li = e.target.parentNode;
        const ul = li.parentNode;

        if (button.textContent === 'Remove') {
            ul.removeChild(li);
        }
        if (button.textContent === 'Edit') {
            const span = li.querySelector(':first-child');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            li.insertBefore(input, span);
            li.removeChild(span);
            button.textContent = 'Save';

            console.log(span);
        }
        if (button.textContent === 'Save') {
            
        }
    }
});
