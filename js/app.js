const daysContent = require('./data.json');
const today = new Date();
const placeholder = 'https://placehold.co/300x300?text=No+image+available';

function checkDay(day) { 
    if (day <= today.getDate() && 11 == (today.getMonth() + 1)) {
        return true;
    } else {
        return false;
    }
}

function showModal(e) {
    document.querySelector(`.dayModal[data-day="${e.target.dataset.day}"]`).classList.remove('hidden');
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0;
}

function closeModal(x) {
    x.target.parentElement.parentElement.classList.add('hidden');
}

for (let day of daysContent) { 
    let dayDoor = document.querySelector(`.day[data-day="${day.day}"]`);
    if (checkDay(day.day)) {
        let div = document.createElement('div'); 
        div.setAttribute('data-day', day.day);
        div.classList.add('dayModal','hidden');    
        div.innerHTML = 
            `<div class='modalTop'><h3>#${day.day}</h3><button class='closeModal'>X</button></div><div class='modalMain'><img src='${day.image?day.image:placeholder}' /><div class='dayContent'><h4>${day.short?day.short:''}</h4><p>${day.text}</p><a href='${day.link?day.link:'https://www.duesseldorf-vegan.de/'}' target='_blank'>${day.cta?day.cta:'Besuche unsere Website'}</a></div></div>`;
        document.querySelector('#modals').appendChild(div); 
        dayDoor.addEventListener('click', showModal);
    } else {
        dayDoor.classList.add('disabled');
    }
}

const closeBtns = Array.from(document.querySelectorAll('.closeModal'));
closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
