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

var _captchaTries = 0;

function recaptchaOnload() {
    _captchaTries++;
    if (_captchaTries > 9)
        return;
    if ($('.g-recaptcha').length > 0) {
        grecaptcha.render("recaptcha", {
            sitekey: '6LeR0ZMUAAAAAHe19OLvaksuM7cB-k8XHCCmE96b',
            callback: function() {
                console.log('recaptcha callback');
            }
        });
        return;
    }
    window.setTimeout(recaptchaOnload, 1000);
}