"use strict";

var Shuffle = window.Shuffle;

class Demo {
    constructor(element) {
        this.element = element;
        this.shuffle = new Shuffle(element, {
            itemSelector: '.picture-item',
            sizer: element.querySelector('.my-sizer-element'),
        });

        this._activeFilters = [];
        this.addFilterButtons();
    }

    addFilterButtons() {
        const options = document.querySelector('.filter__btn');
        if (!options) {
            return;
        }

        const filterButtons = Array.from(options.children);
        const onClick = this._handleFilterClick.bind(this);
        filterButtons.forEach((button) => {
            button.addEventListener('click', onClick, false);
        });
    }

    _handleFilterClick(evt) {
        const btn = evt.currentTarget;
        const isActive = btn.classList.contains('active');
        const btnGroup = btn.getAttribute('data-group');

        this._removeActiveClassFromChildren(btn.parentNode);

        let filterGroup;
        if (isActive) {
            btn.classList.remove('active');
            filterGroup = Shuffle.ALL_ITEMS;
        } else {
            btn.classList.add('active');
            filterGroup = btnGroup;
        }

        this.shuffle.filter(filterGroup);
    }

    _removeActiveClassFromChildren(parent) {
        const {
            children
        } = parent;
        for (let i = children.length - 1; i >= 0; i--) {
            children[i].classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.demo = new Demo(document.getElementById('grid'));
});

(function($) {

    function showModal(id){
		$(document.body).addClass('main-menu-open');
		$('#nav').addClass('is-open');
	}

    function hideModals(){
		$(document.body).removeClass('main-menu-open');
        $('#nav').removeClass('is-open');
	}

    $('.navbar__collapse').on('click', function() {
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
    $('.slider').slick({
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
    
})(jQuery)