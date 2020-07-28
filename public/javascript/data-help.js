//data help when focus on input
let help = document.getElementById('help');
let fields = document.querySelectorAll('input');
for (let field of Array.from(fields)) {
    field.addEventListener('focus', (event) => {
        let text = event.target.getAttribute('data-help');
        if (help.textContent === null) {
            console.log('bullshit')
        }
        help.textContent = text;
    });
    field.addEventListener('blur', (event) => {
        help.textContent = '';
    });
}