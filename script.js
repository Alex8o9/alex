const nextPage = document.querySelector('.next-page');
const sections = ['.main', '.album', '.confession'];
let currentIndex = 0;

nextPage.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= sections.length) {
        currentIndex = 0;
    }
    const nextSection = document.querySelector(sections[currentIndex]);
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
});

let scrollTimer;
window.addEventListener('scroll', () => {
    nextPage.style.opacity = '1';
    nextPage.style.pointerEvents = 'auto';
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        if (window.innerWidth <= 768) return;
        nextPage.style.opacity = '0';
        nextPage.style.pointerEvents = 'none';
    }, 2000);
});

const cursor = document.createElement('div');
cursor.classList.add('cursor-light');
document.body.appendChild(cursor);

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const texts = ["CUTE!", "ADORABLE!", "KIND!"];
let speed = 100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.onload = typeWriter;
