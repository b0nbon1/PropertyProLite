/********modal functions */
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
/* modal login form */
var modal = document.getElementById('login-modal');
if ( modal != null){
var modalBtn = document.getElementById('btn-login');
var closeBtn = document.getElementById('closeBtn');
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click',clickOutside);
}
/*******dropdown menu *******/
var myBtn = document.getElementById("myBtn")
if ( myBtn != null){
myBtn.onclick = function() {myFunction()};
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
  
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
      
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
}
/*********popout login modal*****/
var pop = document.getElementById("popout")
if (pop != null){
pop.onclick = function (e) {
  e.preventDefault;
  window.location.href = "../index.html#login-modal";
};
}
if(window.location.hash) {
  if (window.location.hash.substring(1) === 'login-modal') {
    openModal();
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click',clickOutside);
  }
}

/*footer date */
date = new Date().getFullYear();
console.log(date);
document.getElementById("current-date").innerHTML = date;