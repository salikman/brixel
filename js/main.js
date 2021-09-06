"use strict";

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.style.paddingTop = null;
            panel.style.paddingBottom = null;
        } else {
            panel.style.maxHeight = (panel.scrollHeight + 25) + "px";
            panel.style.paddingTop = 15 + "px";
            panel.style.paddingBottom = 10 + "px";
        }
    });
}

(function ($) {
    $('.counter').countUp();

    function showModal(id) {
        $(document.body).addClass('main-menu-open');
        $('#nav').addClass('is-open');
    }

    function hideModals() {
        $(document.body).removeClass('main-menu-open');
        $('#nav').removeClass('is-open');
    }

    $('.navbar__collapse').on('click', function () {
        showModal('#menu');
    });

    $(document).on('click', function (e) {
        if (!(
                ($(e.target).parents('.navbar__menu').length) ||
                ($(e.target).hasClass('navbar__menu')) ||
                ($(e.target).hasClass('navbar__collapse')))) {
            hideModals();
        }
    });

    ///////////////////////////
    // Mobile dropdown
    $('.has-dropdown a i').on('click', (e) => {
        e.preventDefault();
        $('.has-dropdown').toggleClass('open-drop');
    });

    ///////////////////////////
    // sliders
    $('.slider-intro').slick({
        arrows: false,
        dots: true,
        dotsClass: 'slider-dots'
    })

    $('.reviews-js').slick({
        arrows: false,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToScroll: 1
    })

    let newsSlider = $('.news-js'),
        teamSlider = $('.team-js');

    function sectionSlider(i) {
        i.slick({
            arrows: false,
            speed: 800,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        })
    }
    sectionSlider(teamSlider);
    sectionSlider(newsSlider);

    
    // Init fancybox
    // =============
    var selector = ".slick-slide:not(.slick-cloned)";

    // Attach custom click event on cloned elements,
    // trigger click event on corresponding link
    $(document).on("click", ".slick-cloned", function (e) {
        $(selector)
            .eq(
                ($(e.currentTarget).attr("data-slick-index") || 0) % $(selector).length
            )
            .trigger("click.fb-start", {
                $trigger: $(this),
            });

        return false;
    });

    $(".slider-single").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        adaptiveHeight: true,
        infinite: false,
        useTransform: true,
        speed: 400,
        cssEase: "cubic-bezier(0.77, 0, 0.18, 1)",
    });

    $(".slider-nav")
        .on("init", function (event, slick) {
            $(".slider-nav .slick-slide.slick-current").addClass("is-active");
        })
        .slick({
            slidesToShow: 4,
            slidesToScroll: 4,

            arrows: false,
            infinite: false,
            responsive: [
                {
                    breakpoint: 1240,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 3,
                    },
                },{
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                    },
                },{
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
            ],
        });

    $(".slider-single").on("afterChange", function (event, slick, currentSlide) {
        $(".slider-nav").slick("slickGoTo", currentSlide);
        var currrentNavSlideElem =
            '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $(".slider-nav .slick-slide.is-active").removeClass("is-active");
        $(currrentNavSlideElem).addClass("is-active");
    });

    $(".slider-nav").on("click", ".slick-slide", function (event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data("slick-index");

        $(".slider-single").slick("slickGoTo", goToSingleSlide);
    });
})(jQuery)
