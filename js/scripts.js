/**
 * Smooth Scrolling
**/

jQuery(document).ready(function ($) {
   // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('.panel a')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 70
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
});

// hamburger toggle function
var hamburgerToggle = function(t) {
    let hamburger = t.classList;
    let masthead = document.querySelector('header').classList;
    if (hamburger.contains('is-active')) {
        hamburger.remove('is-active');
        masthead.remove('expand');
    } else {
        hamburger.add('is-active');  
        masthead.add('expand');
    }
}

var scrollCheck = function() {
    if (window.scrollY !== 0) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
}

window.addEventListener('scroll', scrollCheck);

window.onload = function() {
    scrollCheck(); 
}

jQuery(document).ready(function(){
    $('button.hamburger').on('click', function(){
        $('body').toggleClass('lock');
    });

    $('header nav a').on('click', function(){
        $('body').removeClass('lock');
        $('header').removeClass('expand');
        $('.hamburger').removeClass('is-active');
    });
});


/* Body */
const body = document.querySelector('body');

// Dark Mode Action
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('.dark-mode-button');

// Enable Dark Mode
const enableDarkMode = () => {
    body.classList.add('darkMode');
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.classList.add('active');
}

// Disable Dark Mode
const disableDarkMode = () => {
    body.classList.remove('darkMode');
    localStorage.setItem('darkMode', 'disabled')
    darkModeToggle.classList.remove('active');
}

if (darkMode == 'enabled') {
    enableDarkMode();
}

// Desktop Button
darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

if (localStorage.getItem("darkMode") === null) {
  enableDarkMode();
}

const processForm = form => {
  const data = new FormData(form)
  data.append('form-name', 'Contact');
  fetch('/', {
    method: 'POST',
    body: data,
  })
  .then(() => {
    form.innerHTML = `<div class="form-success"><h6>Thank you for reaching out to us. We'll contact you soon!</h6></div>`;
  })
  .catch(error => {
    form.innerHTML = `<div class="form-error"><h6>Error: ${error}</h6></div>`;
  })
}

const emailForm = document.querySelector('footer .top .right form')
if (emailForm) {
  emailForm.addEventListener('submit', e => {
    e.preventDefault();
    processForm(emailForm);
  })
}