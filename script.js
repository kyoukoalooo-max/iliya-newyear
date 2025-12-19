const gift = document.getElementById('gift');
const hint = document.getElementById('hint');

// Переключение состояния коробки
gift.addEventListener('click', () => {
    gift.classList.toggle('open');
    if (gift.classList.contains('open')) {
        hint.style.opacity = '0';
    } else {
        hint.style.opacity = '1';
    }
});

// Обновление таймера
function updateTimer() {
    // Цель — 1 января 2026 года
    const targetDate = new Date('January 1, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = targetDate - now;

    if (gap <= 0) {
        document.querySelector('.timer-title').innerText = "С НОВЫМ ГОДОМ!";
        return;
    }

    // Расчеты времени
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    // Вывод в HTML
    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
}

// Эффект снега
function createSnowflake() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.innerText = '❄';
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.fontSize = Math.random() * 10 + 10 + 'px';
    snow.style.opacity = Math.random();
    snow.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    document.body.appendChild(snow);
    
    setTimeout(() => {
        snow.remove();
    }, 5000);
}

// Запуск функций
setInterval(updateTimer, 1000);
setInterval(createSnowflake, 300);
updateTimer();


document.addEventListener('click', (e) => {
    createBottle(e.clientX, e.clientY);
});

function createBottle(x, y) {
    const bottle = document.createElement('div');
    bottle.innerText = '🍾'; // Эмодзи бутылки
    bottle.style.position = 'fixed';
    bottle.style.left = `${x}px`;
    bottle.style.top = `${y}px`;
    bottle.style.fontSize = '40px';
    bottle.style.cursor = 'default';
    bottle.style.userSelect = 'none';
    bottle.style.transition = 'transform 0.1s linear';
    document.body.appendChild(bottle);

    let posY = y;
    let velocity = 0;
    const gravity = 0.8;
    const floor = window.innerHeight - 50;

    function fall() {
        velocity += gravity;
        posY += velocity;

        if (posY >= floor) {
            bottle.style.top = `${floor}px`;
            shatter(x, floor);
            bottle.remove(); // Удаляем целую бутылку
        } else {
            bottle.style.top = `${posY}px`;
            requestAnimationFrame(fall);
        }
    }
    requestAnimationFrame(fall);
}

function shatter(x, y) {
    const shards = ['✨', '✳️', '💧', '🧩']; // Осколки
    for (let i = 0; i < 8; i++) {
        const shard = document.createElement('div');
        shard.innerText = shards[Math.floor(Math.random() * shards.length)];
        shard.style.position = 'fixed';
        shard.style.left = `${x}px`;
        shard.style.top = `${y}px`;
        shard.style.transition = 'all 0.6s ease-out';
        document.body.appendChild(shard);

        // Разлетание осколков в разные стороны
        const destX = (Math.random() - 0.5) * 200;
        const destY = (Math.random() - 0.5) * 100 - 50;

        setTimeout(() => {
            shard.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 360}deg)`;
            shard.style.opacity = '0';
        }, 10);

        // Удаление осколков из DOM
        setTimeout(() => shard.remove(), 600);
    }
}



document.addEventListener('DOMContentLoaded', (event) => {
    const garlandContainer = document.getElementById('garlandContainer');
    // Ссылаемся на наш скрытый чекбокс
    const toggleCheckbox = document.getElementById('toggleGarlandCheckbox');
    
    const BULB_COUNT = 50;

    function createBulbs() {
        for (let i = 0; i < BULB_COUNT; i++) {
            const bulb = document.createElement('div');
            bulb.classList.add('bulb');
            // При загрузке страницы чекбокс уже checked=true
            if (toggleCheckbox.checked) {
               bulb.classList.add('active'); 
            }
            bulb.style.animationDelay = `${i * 0.05}s`; 
            garlandContainer.appendChild(bulb);
        }
    }

    // Функция для переключения состояния гирлянды на основе чекбокса
    function toggleGarland() {
        const isGarlandOn = toggleCheckbox.checked;
        const bulbs = document.querySelectorAll('.bulb');
        
        bulbs.forEach(bulb => {
            if (isGarlandOn) {
                bulb.classList.add('active');
            } else {
                bulb.classList.remove('active');
            }
        });
        // Текст кнопки больше не нужен, визуал меняется сам через CSS
    }

    // Инициализация
    createBulbs();
    // Отслеживаем изменение состояния чекбокса (клик по тумблеру)
    toggleCheckbox.addEventListener('change', toggleGarland);
});


// Получаем кнопку и body
const changeCursorBtn = document.getElementById('changeCursorBtn');
const body = document.body;

// Массив с названиями классов курсоров
const cursorClasses = ['cursor-pointer', 'cursor-hand', 'cursor-text'];
let currentClassIndex = 0;

changeCursorBtn.addEventListener('click', () => {
    // Удаляем текущий класс курсора
    body.classList.remove(cursorClasses[currentClassIndex]);

    // Переходим к следующему индексу, циклически
    currentClassIndex = (currentClassIndex + 1) % cursorClasses.length;

    // Добавляем новый класс курсора
    body.classList.add(cursorClasses[currentClassIndex]);
});



