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
        getSidebar.style.width = "79px";
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

const form = {
    userid: document.getElementById('userid'),
    password: document.getElementById('userpwd'),
    submit: document.getElementById('btn-submit'),
    messages: document.getElementById('form-messages')
}

form.submit.addEventListener('click',(e) =>{
    e.preventDefault();
    const request = new XMLHttpRequest();

    request.onload = () => {
        let responseObj = null;

        responseObj = request.responseText;

        if (responseObj) {
            handleResponse(responseObj);
        }
    }
//		    const requestData = 'userid='+form.userid.value+'&'+'password='+form.password.value;
    const requestData = 'userid='+encodeURIComponent(form.userid.value)+'&'+'password='+encodeURIComponent(form.password.value);
    console.log(requestData);
    request.open('POST','/testh/login');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(requestData);
});

function handleResponse(responseObj){
    if(responseObj === 'ok'){
        location.href = '/testh/index.jsp';
    } else{
        while(form.messages.firstChild){
            form.messages.removeChild(form.messages.firstChild);
        }
        const li = document.createElement('li');
        li.textContent = responseObj;
        form.messages.appendChild(li);
    }
    form.messages.style.display = "block";
}

const rform = {
    userid: document.forms['rform']['userid']
}

const messages = {
    id: document.getElementById('reg-check-id')
}

rform.userid.addEventListener('keyup', () =>{
    if(rform.userid.value === ''){
        handleMessages('아이디를 입력해주세요');
    } else if (rform.userid.value.length < 4 || rform.userid.value.length > 12) {
        handleMessages('아이디는 4 ~ 12자 이내로 만들어주세요');
    } else if (!/^[A-Za-z0-9]$/.test(rform.userid.value)){
        handleMessages('영문자와 숫자만 사용 가능합니다.');
    } else {
        const request = new XMLHttpRequest();

        request.onload = function(){
            let response = request.responseText;

            if(response){
                handleMessages(response);
            }
        }
        const requestData = 'userid='+encodeURIComponent(rform.userid.value);
        request.open('POST', 'testh/chkid');
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(requestData);
    }
});

function handleMessages(m){
    if(m === 'ok'){

    } else {
        while(messages.id.firstChild){
            messages.id.removeChild(messages.id.firstChild);
        }
        const li = document.createElement('li');
        li.textContent = m;
        messages.id.appendChild(li);
    }
    messages.id.style.display = "block";
}
