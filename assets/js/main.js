$(document).ready(function () {
    $(".dropdown-button").dropdown();

    $(document).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('.menu').css({
                'background-color' : '#7B1FA2',
                'box-shadow' : '0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2)',
            });

            $('.menu__list__item__link').css({
                'color' : 'white'
            });
        } else {
            $('.menu').css({
                'background-color' : 'transparent',
                'box-shadow' : 'none',
            });

            $('.menu__list__item__link').css({
                'color' : 'black'
            });
        }
    });
});