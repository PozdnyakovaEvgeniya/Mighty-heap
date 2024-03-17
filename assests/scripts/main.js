function handleResize() {
    let windowWidth = window.innerWidth;

    if (windowWidth > 490) {
        let serviceHeaders = document.querySelectorAll('.service-header');
        
        for (let i = 0; i < serviceHeaders.length; i += 2) {
            serviceHeaders[i].style.height = '';
            serviceHeaders[i + 1].style.height = '';
            serviceHeaders[i].offsetHeight > serviceHeaders[i + 1].offsetHeight && (serviceHeaders[i + 1].style.height = `${serviceHeaders[i].offsetHeight}px`);
            serviceHeaders[i].offsetHeight < serviceHeaders[i + 1].offsetHeight && (serviceHeaders[i].style.height = `${serviceHeaders[i + 1].offsetHeight}px`);
        }
    }
}

window.addEventListener('resize', handleResize);
handleResize();

let sliders = document.querySelectorAll('.slider');

for (let slider of sliders) {
    let containers = slider.querySelectorAll('.container');
    let index = -1;
    let timeout;

    const slide = (side, isTimer = true) => {
        containers[index] && containers[index].classList.remove('active');

        let prevIndex = index;
        index = side === 'right' ? index < containers.length - 1 ? index + 1 : 0 : index === 0 ? index = containers.length - 1 : index - 1;
        containers[index].classList.add('active');

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            containers[prevIndex] && (containers[prevIndex].style.position = 'fixed');
            containers[index].style.position = 'relative';
        }, 300)

        if (!isTimer) {
            clearInterval(timer);
            timer = setInterval(() => slide('right'), 3000);
        }
    }

    slide('right');
    let timer = setInterval(() => slide('right'), 3000);

    let left = slider.querySelector('.left');
    left && left.addEventListener('click', () => {slide('left', false)});

    let right = slider.querySelector('.right');
    right && right.addEventListener('click', () => slide('right', false));
}

let labels = document.querySelectorAll('.contact label:nth-child(5), .contact label:nth-child(6)');

for (let label of labels) {
    let input = label.querySelector('input, textarea');
    let span = label.querySelector('span');

    input.addEventListener('input', () => {
        input.value && (span.innerHTML = '');
        !input.value && (span.innerHTML = '*');
    })
}

function setMask(event) {
    let cursorPosition = this.selectionStart;

    if (cursorPosition < 3) {
      event.preventDefault();
    }

    let matrix = "+7 (___) ___ __ __"; 
    let index = 0; 
    let def = matrix.replace(/\D/g, ""); 
    let val = this.value.replace(/\D/g, "");
    let new_value = matrix.replace(/[_\d]/g, (a) => {
        return index < val.length ? val.charAt(index++) || def.charAt(i) : a
    });

    index = new_value.indexOf("_");
    if (index != -1) {
        index < 5 && (index = 3);
        new_value = new_value.slice(0, index);
    }
    
    let reg = matrix.substr(0, this.value.length).replace(/_+/g, (a) => {
        return "\\d{1," + a.length + "}"
    }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || event.keyCode > 47 && event.keyCode < 58) this.value = new_value;
    if (event.type == "blur" && this.value.length < 5)  this.value = ""
}

let phone = document.querySelector('[type="tel"]');
phone.addEventListener('input', setMask, false);
phone.addEventListener('focus', setMask, false);
phone.addEventListener('blur', setMask, false);
phone.addEventListener('keydown', setMask, false);

let contact = document.querySelector('.contact');
let success_message = document.querySelector('.success-message-wrapper');

contact.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = contact.querySelector('[name="name"]');
    let phone = contact.querySelector('[name="phone"]');
    let email = contact.querySelector('[name="email"]');
    let comment = contact.querySelector('[name="comment"]');

    fetch('vendor/action/onMail.php', {
        method: 'post',
        body: JSON.stringify({name: name.value, phone: phone.value, email: email.value, comment: comment.value}),
    // }).then((res) => {
    //     return res.json();
    // }).then((data) => {
    //     if (data.message) {
    //         success_message.classList.add('active');

    //         const setSuccess = () => {
    //             success_message.classList.remove('active');
    //             name.value = '';
    //             phone.value = '';
    //             email.value = '';
    //             comment.value = '';
    //         }

    //         let timeout = setTimeout(setSuccess, 3000)

    //         success_message.addEventListener('click', () => {
    //             setSuccess();
    //             clearTimeout(timeout);
    //         })
    //     }
    }).finally(() => {
        success_message.classList.add('active');

        const closeSuccess = () => {
            success_message.classList.remove('active');
            name.value = '';
            phone.value = '';
            email.value = '';
            comment.value = '';
        }

        let timeout = setTimeout(closeSuccess, 3000)

        success_message.addEventListener('click', () => {
            closeSuccess();
            clearTimeout(timeout);
        })
    });
});