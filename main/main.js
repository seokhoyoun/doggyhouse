let toggleNavStatus = false;

let toggleNav = function(){
    const getSidebar = document.querySelector('.nav-sidebar');
    const getSidebarUl = document.querySelector('.nav-sidebar ul');
    const getSidebarTitle = document.querySelector('.nav-sidebar span');
    const getSidebarLinks = document.querySelectorAll('.nav-sidebar a');

    if (toggleNavStatus === false) {
        getSidebarUl.style.visibility = "visible";
        getSidebar.style.width = "270px";
        getSidebarTitle.style.opacity = "0.5"; 

        let arrayLength = getSidebarLinks.length;
        for (let i = 0; i < arrayLength; i++){
            getSidebarLinks[i].style.opacity = "1";
        }
        toggleNavStatus = true;
    } else {
        getSidebar.style.width = "80px";
        getSidebarTitle.style.opacity = "0"; 
        
        let arrayLength = getSidebarLinks.length;
        for (let i = 0; i < arrayLength; i++){
            getSidebarLinks[i].style.opacity = "0";
        }
        getSidebarUl.style.visibility = "hidden";
        toggleNavStatus = false;
    }
}

const loginBtn = document.querySelector('#loginBtn');
const registerBtn = document.querySelector('#registerBtn');
const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');

loginBtn.addEventListener('click',popUpLoginBox);

function popUpLoginBox(){
    loginBox.style.display = "block";
}

registerBtn.addEventListener('click', function(){
    registerBox.style.display = "flex";
})

const xBtns = document.querySelectorAll('.close');
for(let i = 0; i < xBtns.length; i++){
    xBtns[i].addEventListener('click', function(){
        this.parentNode.style.display = "none";
    });
}



