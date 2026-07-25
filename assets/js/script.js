function getCurrentTimeWithTimezone(timezone) {
    const date = new Date();
    const options = {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        timeZone: timezone
    };
    const formattedTime = date.toLocaleString('en-US', options).replace(/\s/g, ''); // Removing spaces
    return formattedTime;
}

function updateTimes() {
    const currentTimeIST = getCurrentTimeWithTimezone('Asia/Kolkata');
    const currentTimeBarcelona = getCurrentTimeWithTimezone('Europe/Madrid');

    document.querySelectorAll('.js-time-newyork').forEach(element => {
        element.textContent = currentTimeIST;
    });
    document.querySelectorAll('.js-time-barcelona').forEach(element => {
        element.textContent = currentTimeBarcelona;
    });
}

// Update times initially
updateTimes();

// Update times every second
setInterval(updateTimes, 1000);

// --- Project Category Filter ---
document.addEventListener('click', function(e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    var filter = btn.dataset.filter;

    document.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.remove('is-active');
    });
    btn.classList.add('is-active');

    document.querySelectorAll('.project-category-block').forEach(function(block) {
        if (filter === 'all' || block.dataset.category === filter) {
            block.classList.remove('is-hidden');
        } else {
            block.classList.add('is-hidden');
        }
    });
});

$(document).ready(function() {
    var $body = $(document.body);
    var scrollPosition = 0;
    var isScrollDisabled = false;

    function disableScroll() {
        var oldWidth = $body.innerWidth();
        scrollPosition = window.pageYOffset;
        $body.css({
            'overflow': 'hidden',
            'position': 'fixed',
            'top': `-${scrollPosition}px`,
            'width': oldWidth
        });
        isScrollDisabled = true;
    }

    function enableScroll() {
        $body.css({
            'overflow': '',
            'position': '',
            'top': '',
            'width': ''
        });
        $(window).scrollTop(scrollPosition);
        isScrollDisabled = false;
    }

    // ---- Custom mobile nav ----
    var $mobBtn  = $('.nav_button');
    var $mobNav  = $('#mobNav');
    var mobOpen  = false;

    function openMobNav() {
        mobOpen = true;
        $mobNav.addClass('is-open');
        $mobBtn.addClass('is-open');
        $body.addClass('mob-nav-open');
        disableScroll();
    }

    function closeMobNav() {
        mobOpen = false;
        $mobNav.removeClass('is-open');
        $mobBtn.removeClass('is-open');
        $body.removeClass('mob-nav-open');
        enableScroll();
    }

    $mobBtn.on('click', function (e) {
        e.stopPropagation();
        mobOpen ? closeMobNav() : openMobNav();
    });

    // Close when a link inside the overlay is clicked
    $mobNav.find('.mob-nav__link').on('click', function () {
        closeMobNav();
    });

    // Close mobile nav on resize past breakpoint
    const breakpoints = [991, 767, 479];
    let lastWidth = window.innerWidth;

    function checkBreakpoints() {
        const currentWidth = window.innerWidth;

        breakpoints.forEach(breakpoint => {
            if (
                (lastWidth <= breakpoint && currentWidth > breakpoint) ||
                (lastWidth >= breakpoint && currentWidth < breakpoint)
            ) {
                if (isScrollDisabled) enableScroll();
                closeMobNav();
            }
        });

        // Update lastWidth for the next call
        lastWidth = currentWidth;
    }

    // Event listener for window resize
    window.addEventListener('resize', checkBreakpoints);

});
