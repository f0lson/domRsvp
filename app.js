const form = document.querySelector('#registrar');
const input = form.querySelector('input');
const main = document.querySelector('.main');
const ul = document.querySelector('#invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
filterLabel.textContent = 'Filter Out Tha Flakes: ';
const filterCheckbox = document.createElement('input');
filterCheckbox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
main.insertBefore(div, ul);

filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    console.log('checked!');
    const lis = ul.children;
    // if isChecked === true
    if (isChecked) {
        // iterate thru the children
        for (let i = 0; i < lis.length; i++) {
            // store the array in the li variable
            let li = lis[i];
            // if any of the items in the li array has a class name of 'repsonded' set their display to an empty string
            if (li.className === 'responded') {
                li.style.display = '';
            } else {
                // if any of the items doesn't have the class name of 'responded', set their display to none so they hide
                li.style.display = 'none';
            }
        }
    } else {
        // if the box isn't checked, set all the items in li's displays to an empty string so they show on the pages
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            li.style.display = '';
        }
    }

});

const createListItem = (userInput) => {
    // function to create the element
    function createElement(elementName, property, value) {
        const element = document.createElement(elementName);
        element[property] = value;
        return element;
    }

    // function to append the element to the li
    function appendToLI (elementName, property, value) {
        const element = createElement(elementName, property, value);
        li.appendChild(element);
        return element;
    }

    const li = document.createElement('li');
    appendToLI('span', 'textContent', userInput);
    appendToLI('label', 'textContent', 'Confirmed')
        .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'Edit');
    appendToLI('button', 'textContent', 'Remove');

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
        const action = button.textContent;

        const buttonActions = {
            remove : () => {
                ul.removeChild(li);
            },
            edit : () => {
                const span = li.querySelector(':first-child');
                const input = document.createElement('input');
                input.type = 'text';
                input.value = span.textContent;
                li.insertBefore(input, span);
                li.removeChild(span);
                button.textContent = 'Save';
            },
            save : () => {
                const input = li.querySelector(':first-child');
                const span = document.createElement('span');
                span.textContent = input.value;
                li.insertBefore(span, input);
                li.removeChild(input);
                button.textContent = 'Edit';
            }
        };

        if (action === 'remove') {
            buttonActions.remove();
        } else if (action === 'edit') {
            buttonActions.edit();
        } else if (action === 'save') {
            buttonActions.save();
        }

    }
});
