// Menu Controller
let headerMenu = document.getElementById('header-menu');
let menuButton = document.getElementById('menu-button');
let menuCloseButton = document.getElementById('close-button');


function openMenu(){
    headerMenu.style.right = "0";
    menuButton.style.display = "none";
    menuCloseButton.style.display = "";
}

function closeMenu(){
    headerMenu.style.right = "";
    menuButton.style.display = "";
    menuCloseButton.style.display = "none";
}

menuButton.addEventListener('click', openMenu);
menuCloseButton.addEventListener('click', closeMenu);

