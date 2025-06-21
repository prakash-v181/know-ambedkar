(function($) {
    "use strict";

$(document).ready(function() {
$(".skpTpcnt").click(function() {
     $('html, body').animate({
         scrollTop: $(".abtSecNew").offset().top
     }, 500);
 });
});

document.addEventListener("DOMContentLoaded", function () {
  function showDateTime() {
    var myDiv = document.getElementById("myDiv");

    var date = new Date();
    var dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var dayName = dayList[date.getDay()]; // Get day name (e.g., "Thu")
    var monthName = monthNames[date.getMonth()]; // Get month name (e.g., "October")
    var dayOfMonth = date.getDate(); // Get day of the month (e.g., 5)
    var year = date.getFullYear(); // Get full year (e.g., 2023)

    // Format the date as "Thu, 5 October, 2023"
    var today = `${dayName} ${dayOfMonth} ${monthName} ${year}`;

    // Format the time to ensure two digits for hours, minutes, and seconds
    var hour = date.getHours().toString().padStart(2, "0"); // Ensure two digits
    var min = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits
    var sec = date.getSeconds().toString().padStart(2, "0"); // Ensure two digits

    var time = `${hour}:${min}:${sec}`;
    myDiv.textContent = `Today is ${today}. Time is ${time}`;
  }

  showDateTime(); // Call immediately to avoid delay
  setInterval(showDateTime, 1000); // Update every second
});

$(document).ready(function() {
  var resize = new Array('div', '.resizable');
  resize = resize.join(',');

  //resets the font size when "reset" is clicked
  var resetFont = $(resize).css('font-size');
  $(".reset").click(function() {
    $(resize).css('font-size', resetFont);
  });

  //increases font size when "+" is clicked
  $(".increase").click(function() {
    var originalFontSize = $(resize).css('font-size');
    var originalFontNumber = parseFloat(originalFontSize, 10);
    var newFontSize = originalFontNumber * 1.2;
    $(resize).css('font-size', newFontSize);
    return false;
  });

  //decrease font size when "-" is clicked

  $(".decrease").click(function() {
    var originalFontSize = $(resize).css('font-size');
    var originalFontNumber = parseFloat(originalFontSize, 10);
    var newFontSize = originalFontNumber * 0.8;
    $(resize).css('font-size', newFontSize);
    return false;
  });

});

jQuery(document).ready(function(){
$('.admnsTabDiv ul li').click(function(){
  $('.hidebkingTab').hide();
  var admnsTabId = $(this).attr('rel');
  $('#'+admnsTabId).show();
});
});

jQuery(document).ready(function($) {
  "use strict";
  var owl = $('#customers-testimonials').owlCarousel({
    loop: true,
    center: true,
    items: 5,
    margin: 30,
    autoplay: true,
    dots: true,
    nav: true,
    autoplayTimeout: 3000,
    smartSpeed: 450,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 3
      },
      768: {
        items: 5
      },
      1170: {
        items: 7
      }
    }
  });

  // Pause on hover over carousel & highlight the item
  $('#customers-testimonials').on('mouseenter', '.owl-item', function() {
    owl.trigger('stop.owl.autoplay');
    $(this).addClass('highlight-item'); // Add highlight class
  }).on('mouseleave', '.owl-item', function() {
    owl.trigger('play.owl.autoplay');
    $(this).removeClass('highlight-item'); // Remove highlight class
  });
});



        /*-------------------------------------------
        preloader active
        --------------------------------------------- */
   /*     jQuery(window).load(function() {
           jQuery('.preloader').fadeOut('slow');
        });*/

        /*-------------------------------------------
        Sticky Header
        --------------------------------------------- */
   /*     $(window).on('scroll', function(){
            if( $(window).scrollTop()>80 ){
                $('#sticky').addClass('stick');
            } else {
                $('#sticky').removeClass('stick');
            }
        }); */

        jQuery(document).ready(function(){
          /*--------------------------------
            Bootstrap Dropdown Animation
          -----------------------------------*/
          // Add slideDown animation to Bootstrap dropdown when expanding.
            $('.dropdown').on('show.bs.dropdown', function() {
              $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
          });

          // Add slideUp animation to Bootstrap dropdown when collapsing.
          $('.dropdown').on('hide.bs.dropdown', function() {
              $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
          });

          /*-------------------------------------------
          js wow active
          --------------------------------------------- */
          new WOW().init();
  
          /*-------------------------------------------
          js scrollup
          --------------------------------------------- */
          $.scrollUp({
              scrollText: '<i class="fa fa-angle-up"></i>',
              easingType: 'linear',
              scrollSpeed: 500,
              animation: 'fade'
          }); 

          /*-------------------------------------------
          testimonial-slide active Partner Organisation
          --------------------------------------------- */
          $(document).ready(function(){
  $(".partner-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 3,
        nav: false
      },
      576: {
        items: 4,
        nav: false
      },
      768: {
        items: 5,
        nav: true
      },
      992: {
        items: 7,
      },
      1500: {
        items: 9,
      }
    }
  });
});
          /*---------------------------------
          venobox Popup active
          -----------------------------------*/
          $('.popup-video').venobox(); 
  
          /*---------------------------------
          isotope activation 
          -----------------------------------*/
          $('.grid').appear(function() {
            // filter items on button click
            $('.filtering-button').on('click', 'li', function () {
              var filterValue = $(this).attr('data-filter');
              $grid.isotope({ filter: filterValue });
            });
            var $grid = $('.grid').isotope({
              // set itemSelector so .grid-sizer is not used in layout
              itemSelector: '.grid-item',
              percentPosition: true,
              animationOptions: {
                duration: 500,
                easing: 'zoom-in'
              },
              masonry: {
                // use element for option
                columnWidth: '.grid-item'
              },
              transitionDuration: '.9s'
            })

            $('.filtering-button li').on('click',  function () {
              $('.filtering-button li').removeClass('active');
              $(this).addClass('active');
            });
          });
            
          /*---------------------------------
          counterUp active
          -----------------------------------*/
          jQuery('.counter').counterUp({
            delay: 10,
            time: 1000
          });
          
          /*---------------------------------
          niceSelect active
          -----------------------------------*/
          jQuery('select').niceSelect();
        
        });

    })(jQuery);

    // Carousel Pause Functionality
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carouselExampleDark');
    const pauseBtn = document.getElementById('carouselPauseBtn');
    let isPaused = false;

    // Create the Bootstrap Carousel instance
    const carouselInstance = new bootstrap.Carousel(carousel, {
        interval: 5000,  // Customize as needed
        ride: 'carousel',
        pause: false,    // Disable built-in pause on hover (we’ll control manually)
        touch: true
    });

    pauseBtn.addEventListener('click', function () {
        if (isPaused) {
            carouselInstance.cycle(); // Resume
            pauseBtn.innerHTML = `
                <i class="fas fa-pause" aria-hidden="true"></i>
                <span class="visually-hidden">Pause slideshow</span>`;
            pauseBtn.setAttribute('aria-label', 'Pause slideshow');
            isPaused = false;
        } else {
            carouselInstance.pause(); // Pause
            pauseBtn.innerHTML = `
                <i class="fas fa-play" aria-hidden="true"></i>
                <span class="visually-hidden">Play slideshow</span>`;
            pauseBtn.setAttribute('aria-label', 'Play slideshow');
            isPaused = true;
        }
    });

    // Prevent touch interactions from restarting the carousel if paused
    carousel.addEventListener('touchstart', function () {
        if (isPaused) {
            carouselInstance.pause(); // Force pause again
        }
    });
});

// For Video player for cideo-gallery.html

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('videoPlayer-14april2025');
  const container = video.parentElement;
  const playPauseBtn = container.querySelector('.play-pause-btn');
  const progressBar = container.querySelector('.progress-bar');
  const progressContainer = container.querySelector('.progress-container');
  const fullscreenBtn = container.querySelector('.fullscreen-btn');
  const ccBtn = container.querySelector('.cc-btn');
  const playIcon = playPauseBtn.querySelector('.fa-play');
  const pauseIcon = playPauseBtn.querySelector('.fa-pause');
  
  // Initialize video state
  video.removeAttribute('controls');
  
  // Play/Pause functionality
  function togglePlayPause() {
    if (video.paused) {
      video.play();
      playPauseBtn.setAttribute('aria-label', 'Pause video');
      playPauseBtn.setAttribute('aria-pressed', 'true');
      playPauseBtn.innerHTML = '<i class="fas fa-pause" aria-hidden="true"></i><span class="sr-only">Pause</span>';
    } else {
      video.pause();
      playPauseBtn.setAttribute('aria-label', 'Play video');
      playPauseBtn.setAttribute('aria-pressed', 'false');
      playPauseBtn.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i><span class="sr-only">Play</span>';
    }
  }
  
  // Progress bar functionality
  function updateProgressBar() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = percentage + '%';
    progressContainer.setAttribute('aria-valuenow', percentage);
  }
  
  function seekVideo(event) {
    const percent = (event.clientX - progressContainer.getBoundingClientRect().left) / progressContainer.offsetWidth;
    video.currentTime = percent * video.duration;
  }
  
  // Fullscreen functionality
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error('Fullscreen error:', err);
      });
      fullscreenBtn.setAttribute('aria-pressed', 'true');
    } else {
      document.exitFullscreen();
      fullscreenBtn.setAttribute('aria-pressed', 'false');
    }
  }
  
  // Captions functionality
  function toggleCaptions() {
    const track = video.textTracks[0];
    track.mode = track.mode === 'showing' ? 'hidden' : 'showing';
    ccBtn.setAttribute('aria-pressed', track.mode === 'showing');
  }
  
  // Event listeners
  playPauseBtn.addEventListener('click', togglePlayPause);
  
  progressContainer.addEventListener('click', seekVideo);
  
  // For keyboard accessibility on progress bar
  progressContainer.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const change = e.key === 'ArrowLeft' ? -5 : 5;
      video.currentTime = Math.min(Math.max(video.currentTime + change, 0), video.duration);
    }
  });
  
  video.addEventListener('timeupdate', updateProgressBar);
  video.addEventListener('click', togglePlayPause);
  video.addEventListener('ended', function() {
    playPauseBtn.setAttribute('aria-pressed', 'false');
    playPauseBtn.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i><span class="sr-only">Play</span>';
  });
  
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  ccBtn.addEventListener('click', toggleCaptions);
  
  // Initialize captions
  if (video.textTracks.length > 0) {
    video.textTracks[0].mode = 'hidden';
  }
});

// Video Fallback

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('videoPlayer-14april2025');
  
  // Check if any video source can play
  const canPlayHandler = function() {
    const sources = video.querySelectorAll('source');
    let supportedSource = null;
    
    sources.forEach(source => {
      if (video.canPlayType(source.type)) {
        supportedSource = source.src;
        return;
      }
    });
    
    if (!supportedSource) {
      // Show fallback message if no supported format
      const fallback = document.createElement('div');
      fallback.innerHTML = `
        <p>Video playback not supported. Please try:</p>
        <ul>
          <li><a href="${sources[0].src}" download>Download MP4 version</a></li>
          <li>Use a modern browser (Chrome, Firefox, Edge)</li>
        </ul>
      `;
      video.parentNode.replaceChild(fallback, video);
    }
  };
  
  // Check when metadata is loaded
  video.addEventListener('loadedmetadata', canPlayHandler);
  // Also check immediately
  canPlayHandler();
});