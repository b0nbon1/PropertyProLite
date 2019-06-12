/* preloader */
window.addEventListener("load", function(){
    var preloader = this.document.getElementById("preloader");
    this.document.body.removeChild(preloader);
});

/* modal login form */
var modal = document.getElementById('login-modal');
var modalBtn = document.getElementById('btn-login');
var closeBtn = document.getElementById('closeBtn');
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click',clickOutside);

function openModal(){
    modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
}

function clickOutside(e){
    if(e.target == modal){
    modal.style.display = 'none';
    }
}

/*footer date */
date = new Date().getFullYear();
console.log(date);
document.getElementById("current-date").innerHTML = date;