document.querySelectorAll('.external-link').forEach(link => {
  link.addEventListener('click', function(e) {
    // Show confirmation dialog
    const userConfirmed = confirm(
      'You are being redirected to an external website. Please note that Dr. Ambedkar Foundation cannot be held responsible for external websites content & privacy policies.'
    );
    
    // Cancel navigation if user clicks "No"
    if (!userConfirmed) {
      e.preventDefault();
    }
  });
});
$(document).ready(function() {
  // Initialize carousel with keyboard navigation options
  var carousel = $("#customers-testimonials");
  
  carousel.owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    },
    navText: [
      '<span aria-hidden="true"><i class="fas fa-chevron-left"></i></span>',
      '<span aria-hidden="true"><i class="fas fa-chevron-right"></i></span>'
    ]
  });
  

  // Keyboard accessibility
  // Make carousel keyboard navigable
  carousel.on('changed.owl.carousel', function(event) {
    // Update ARIA live region when slide changes
    var current = event.item.index;
    var items = event.item.count;
    $('.owl-carousel').attr('aria-label', 'Partner organizations carousel, item ' + (current + 1) + ' of ' + items);
  });
  
  // Keyboard navigation for carousel items
  $('.owl-carousel .item').on('keydown', function(e) {
    var keyCode = e.keyCode || e.which;
    
    // Left arrow
    if (keyCode === 37) {
      e.preventDefault();
      carousel.trigger('prev.owl.carousel');
      carousel.find('.owl-item.active').last().find('.item').focus();
    }
    // Right arrow
    else if (keyCode === 39) {
      e.preventDefault();
      carousel.trigger('next.owl.carousel');
      carousel.find('.owl-item.active').first().find('.item').focus();
    }
    // Home key
    else if (keyCode === 36) {
      e.preventDefault();
      carousel.trigger('to.owl.carousel', [0]);
      carousel.find('.owl-item.active').first().find('.item').focus();
    }
    // End key
    else if (keyCode === 35) {
      e.preventDefault();
      carousel.trigger('to.owl.carousel', carousel.find('.owl-item').length - 1);
      carousel.find('.owl-item.active').last().find('.item').focus();
    }
  });
  
  // Make sure carousel is focusable
  carousel.attr('tabindex', '0');
  
  // Add ARIA labels to navigation buttons
  $('.owl-prev').attr('aria-label', 'Previous partner organizations');
  $('.owl-next').attr('aria-label', 'Next partner organizations');
  
  // Ensure screen readers can access all items (not just visible ones)
  carousel.find('.owl-item').each(function() {
    $(this).removeAttr('aria-hidden');
  });
});

// Ensure keyboard users can access dropdown menus
document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item-has-children > a');
  
  menuItems.forEach(item => {
    item.addEventListener('focus', function() {
      const submenu = this.nextElementSibling;
      if (submenu && submenu.classList.contains('sub-menu')) {
        submenu.style.display = 'block';
      }
    });
    
    item.addEventListener('blur', function() {
      // Delay hiding to allow clicking on submenu items
      setTimeout(() => {
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('sub-menu') && 
            !submenu.contains(document.activeElement)) {
          submenu.style.display = 'none';
        }
      }, 200);
    });
  });
  
  // Make sure submenu stays visible when focusing on its items
  const submenuItems = document.querySelectorAll('.sub-menu a');
  submenuItems.forEach(item => {
    item.addEventListener('focus', function() {
      const parentMenu = this.closest('.sub-menu');
      if (parentMenu) {
        parentMenu.style.display = 'block';
      }
    });
  });
});