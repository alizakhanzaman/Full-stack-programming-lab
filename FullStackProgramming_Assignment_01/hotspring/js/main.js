/* =========================================
   HOTSPRING PORTABLE SPAS — Main JavaScript
   ========================================= */

$(document).ready(function() {

  /* ---- HERO SLIDER ---- */
  var currentSlide = 0;
  var slides = $('.slide');
  var dots   = $('.dot');
  var slideInterval;

  function showSlide(idx) {
    slides.removeClass('active');
    dots.removeClass('active');
    currentSlide = (idx + slides.length) % slides.length;
    $(slides[currentSlide]).addClass('active');
    $(dots[currentSlide]).addClass('active');
  }

  function nextSlide() { showSlide(currentSlide + 1); }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  dots.on('click', function() {
    clearInterval(slideInterval);
    showSlide($(this).index());
    startSlider();
  });

  if (slides.length > 0) {
    showSlide(0);
    startSlider();
  }

  /* ---- PRODUCT TABS ---- */
  $('.tabs-nav button').on('click', function() {
    var target = $(this).data('tab');
    $('.tabs-nav button').removeClass('active');
    $('.tab-content').removeClass('active');
    $(this).addClass('active');
    $('#tab-' + target).addClass('active');
  });

  /* ---- PRODUCT THUMBNAIL GALLERY ---- */
  $('.prod-thumbnails img').on('click', function() {
    var src = $(this).attr('src');
    $('.prod-gallery .main-img').attr('src', src);
    $('.prod-thumbnails img').removeClass('active');
    $(this).addClass('active');
  });

  /* ---- CART QUANTITY ---- */
  $('.qty-select').on('change', function() {
    updateCartTotal();
  });

  function updateCartTotal() {
    var total = 0;
    $('.cart-row').each(function() {
      var price = parseFloat($(this).data('price')) || 0;
      var qty   = parseInt($(this).find('.qty-select').val()) || 0;
      total += price * qty;
    });
    $('.cart-total-amount').text('$' + total.toFixed(2));
  }

  /* ---- REMOVE CART ITEM ---- */
  $(document).on('click', '.remove-item', function() {
    var row = $(this).closest('tr');
    row.fadeOut(300, function() {
      $(this).remove();
      updateCartTotal();
      var count = $('.cart-row').length;
      if (count === 0) {
        $('.cart-table tbody').append(
          '<tr><td colspan="5" style="text-align:center;padding:30px;color:#888;">Your cart is empty. <a href="index.html">Continue Shopping</a></td></tr>'
        );
        $('.cart-summary').hide();
      }
    });
  });

  /* ---- CAROUSEL ---- */
  var carouselPos = 0;
  var itemWidth = 0;

  function initCarousel() {
    if ($('.carousel-track').length === 0) return;
    itemWidth = $('.carousel-item').outerWidth(true);
  }

  $('.carousel-next').on('click', function() {
    var track    = $(this).siblings('.carousel-track');
    var items    = track.find('.carousel-item');
    var visible  = Math.floor(track.parent().width() / itemWidth);
    var maxPos   = items.length - visible;
    if (carouselPos < maxPos) {
      carouselPos++;
      track.css('transform', 'translateX(-' + (carouselPos * itemWidth) + 'px)');
    }
  });

  $('.carousel-prev').on('click', function() {
    var track = $(this).siblings('.carousel-track');
    if (carouselPos > 0) {
      carouselPos--;
      track.css('transform', 'translateX(-' + (carouselPos * itemWidth) + 'px)');
    }
  });

  initCarousel();

  /* ---- PRICE CALCULATOR ---- */
  $('.price-calc-row select').on('change', function() {
    var base = parseFloat($('#base-price').val()) || 1979;
    var extra = 0;
    $('.price-calc-row select').each(function() {
      extra += parseFloat($(this).val()) || 0;
    });
    $('.total-price-display').text('$' + (base + extra).toFixed(2));
  });

  /* ---- ADD TO CART ANIMATION ---- */
  $('.btn-cart').on('click', function() {
    var btn = $(this);
    var orig = btn.html();
    btn.html('✓ Added!').css('background', '#4a9e4a');
    setTimeout(function() {
      btn.html(orig).css('background', '');
    }, 1500);
    // Update header cart count
    var count = parseInt($('.cart-count').text()) || 0;
    $('.cart-count').text(count + 1);
  });

  /* ---- NEWSLETTER FORM ---- */
  $('.newsletter-form').on('submit', function(e) {
    e.preventDefault();
    var email = $(this).find('input').val();
    if (!isValidEmail(email)) {
      showAlert('Please enter a valid email address.', 'error');
    } else {
      showAlert('Thank you for subscribing!', 'success');
      $(this).find('input').val('');
    }
  });

  /* ---- CONTACT FORM VALIDATION ---- */
  $('#contact-form').on('submit', function(e) {
    e.preventDefault();
    var valid = true;
    $(this).find('[required]').each(function() {
      if ($.trim($(this).val()) === '') {
        markError($(this));
        valid = false;
      } else if ($(this).attr('type') === 'email' && !isValidEmail($(this).val())) {
        markError($(this));
        valid = false;
      } else {
        clearError($(this));
      }
    });
    if (valid) {
      showAlert('Your message has been sent! We will contact you shortly.', 'success');
      $(this)[0].reset();
    }
  });

  /* ---- LOGIN FORM VALIDATION ---- */
  $('#login-form').on('submit', function(e) {
    e.preventDefault();
    var valid = true;
    $(this).find('[required]').each(function() {
      if ($.trim($(this).val()) === '') {
        markError($(this));
        valid = false;
      } else if ($(this).attr('type') === 'email' && !isValidEmail($(this).val())) {
        markError($(this));
        valid = false;
      } else {
        clearError($(this));
      }
    });
    if (valid) {
      showAlert('Login successful! Redirecting to your account...', 'success');
      setTimeout(function() { window.location.href = 'my-account.html'; }, 1500);
    }
  });

  /* ---- REGISTER FORM VALIDATION ---- */
  $('#register-form').on('submit', function(e) {
    e.preventDefault();
    var valid = true;
    var password = $('#reg-password').val();
    var confirm  = $('#reg-confirm').val();

    $(this).find('[required]').each(function() {
      if ($.trim($(this).val()) === '') {
        markError($(this));
        valid = false;
      } else if ($(this).attr('type') === 'email' && !isValidEmail($(this).val())) {
        markError($(this));
        valid = false;
      } else {
        clearError($(this));
      }
    });

    if (password && password.length < 6) {
      markError($('#reg-password'), 'Password must be at least 6 characters.');
      valid = false;
    }
    if (password && confirm && password !== confirm) {
      markError($('#reg-confirm'), 'Passwords do not match.');
      valid = false;
    }

    if (valid) {
      showAlert('Account created successfully! You can now sign in.', 'success');
      $(this)[0].reset();
    }
  });

  /* ---- PAYMENT FORM VALIDATION ---- */
  $('#payment-form').on('submit', function(e) {
    e.preventDefault();
    var valid = true;
    $(this).find('[required]').each(function() {
      if ($.trim($(this).val()) === '') {
        markError($(this));
        valid = false;
      } else if ($(this).attr('type') === 'email' && !isValidEmail($(this).val())) {
        markError($(this));
        valid = false;
      } else {
        clearError($(this));
      }
    });

    // Card number validation
    var cardNum = $('#card-number').val().replace(/\s/g, '');
    if (cardNum && (cardNum.length < 13 || !/^\d+$/.test(cardNum))) {
      markError($('#card-number'), 'Please enter a valid card number.');
      valid = false;
    }

    // Terms checkbox
    if (!$('#accept-terms').prop('checked')) {
      showAlert('You must accept the Terms and Conditions to proceed.', 'error');
      valid = false;
    }

    if (valid) {
      showAlert('Order placed successfully! Thank you for your purchase.', 'success');
      setTimeout(function() { window.location.href = 'my-account.html'; }, 2000);
    }
  });

  /* ---- EDIT FORMS ---- */
  $('#edit-account-form, #edit-billing-form, #edit-shipping-form').on('submit', function(e) {
    e.preventDefault();
    var valid = true;
    $(this).find('[required]').each(function() {
      if ($.trim($(this).val()) === '') {
        markError($(this));
        valid = false;
      } else {
        clearError($(this));
      }
    });
    if (valid) {
      showAlert('Your information has been updated successfully.', 'success');
    }
  });

  /* ---- FORGET PASSWORD ---- */
  $('#forget-form').on('submit', function(e) {
    e.preventDefault();
    var email = $('#forget-email').val();
    if (!email || !isValidEmail(email)) {
      markError($('#forget-email'), 'Please enter a valid email address.');
    } else {
      clearError($('#forget-email'));
      showAlert('Password reset instructions have been sent to ' + email, 'success');
      $(this)[0].reset();
    }
  });

  /* ---- SEARCH ---- */
  $('.search-form').on('submit', function(e) {
    e.preventDefault();
    var q = $(this).find('input').val().trim();
    if (q) {
      showAlert('Searching for: "' + q + '"...', 'info');
    }
  });

  /* ---- REAL-TIME FIELD VALIDATION ---- */
  $(document).on('blur', 'input[required], textarea[required]', function() {
    if ($.trim($(this).val()) === '') {
      markError($(this));
    } else {
      clearError($(this));
    }
  });

  $(document).on('input', 'input[required], textarea[required]', function() {
    if ($.trim($(this).val()) !== '') {
      clearError($(this));
    }
  });

  /* ---- SMOOTH SCROLL ---- */
  $('a[href^="#"]').on('click', function(e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 60 }, 400);
    }
  });

  /* ---- FILTER SIDEBAR TOGGLE ---- */
  $('.filter-group-title').on('click', function() {
    $(this).next('ul').slideToggle(200);
  });

  /* ---- MOBILE NAV TOGGLE ---- */
  $('.nav-toggle').on('click', function() {
    $('.main-nav ul').slideToggle(200);
  });

  /* ---- HELPER FUNCTIONS ---- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function markError(field, msg) {
    field.closest('.form-row').addClass('error');
    var errEl = field.closest('.form-row').next('.field-error');
    if (errEl.length && msg) errEl.text(msg);
    errEl.show();
    field.addClass('input-error');
    field.css('border-color', '#cc0000');
  }

  function clearError(field) {
    field.closest('.form-row').removeClass('error');
    field.closest('.form-row').next('.field-error').hide();
    field.removeClass('input-error');
    field.css('border-color', '');
  }

  function showAlert(msg, type) {
    var cls = 'alert-' + (type || 'info');
    var alert = $('<div class="alert ' + cls + ' fade-in">' + msg + '</div>');
    // Remove existing alerts
    $('.page-alert').remove();
    alert.addClass('page-alert').css({ position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, minWidth: '300px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' });
    $('body').append(alert);
    setTimeout(function() { alert.fadeOut(400, function() { $(this).remove(); }); }, 3500);
  }

  /* ---- FADE IN ON SCROLL ---- */
  function checkFade() {
    var scrollTop = $(window).scrollTop() + $(window).height();
    $('.product-card, .about-card, .feature-banners > div').each(function(i) {
      if ($(this).offset().top < scrollTop) {
        var self = $(this);
        setTimeout(function() {
          self.addClass('fade-in');
        }, i * 60);
      }
    });
  }

  $(window).on('scroll', checkFade);
  checkFade();

});
