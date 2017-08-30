jQuery(document).ready(function ($) {
    //Кэшируем
    var $window = $(window),
        $first_section = $('#about'), //первая секция
        $first_screen = $first_section.find('.as-table'), //будем растягивать этот элемент чтобы растянуть первую секцию
        $dheader=$('#desktop-header'), //десктоп-хидер
        header_h = $('header').outerHeight(), //высота хидера в первой секции
        $menu = $('.menu li a'), //меню
        win_w, //здесь будем хранить значение ширины экрана
        breakpoint = 1000, //брейкпоинт для меню
        top_offset = 84; //высота десктоп-хидера

    //Растянем стартовый экран на высоту страницы и узнаем ширину экрана
    function first_scr_height() {
        win_w = $window.width();
        var win_h = $window.height();
        $first_screen.removeAttr('style', 'height');
        if (win_w > breakpoint) {
            $first_screen.css('height', win_h - header_h + 'px');
        }
    }
    first_scr_height();

    $window.on('resize', function () {
        first_scr_height();//перерасчет значений при ресайзе
        var fromTop = $window.scrollTop(),
            first_section_h = $first_section.outerHeight();
        //console.log('fromTop: ' + fromTop + ' section height: ' + first_section_h);
        if (win_w > breakpoint && fromTop >= first_section_h) {//если скролл больше, чем высота первой секции и большое разрешение, вернем десктоп-хидер на место
            $dheader.addClass('stuck');
            //console.log('stuck');
        }
    });

    //Стикед десктоп-хидер
    var sticky = new Waypoint.Sticky({
        element: $dheader
    });

    //Скролл вниз по кнопке в первой секции
    $first_section.on('click', 'a.more', function (e) {
        var $el = $(this);
        scroll_to_section($el, e);
    });

    //Плавный скролл к секциям
    $menu.on('click', function(e){
        var $el = $(this);
        scroll_to_section($el,e);
    });

    function scroll_to_section(el,e) {
        e.preventDefault();
        var $el = el,
            link = $el.attr('href'),
            $target = $(link),
            offset = top_offset;
        if (win_w <= breakpoint) {
            offset = 0;
        }
        $('html,body').animate({ scrollTop: $target.offset().top - offset }, 500, 'swing');
    }

    //карта меню
    var scrollItems = $menu.map(function () {
        var item = $($(this).attr('href'));
        if (item.length) { return item; }
    });

    //подсветка элементов меню при скролле
    $window.on('scroll', function () {
        var fromTop = $(this).scrollTop() + top_offset+2, //позиция секции
            cur = scrollItems.map(function () { //айди текущей секции
        if ($(this).offset().top < fromTop) {
            return this;
        }
        });
        cur = cur[cur.length - 1]; //айди текущего элемента
        var id = cur && cur.length ? cur[0].id : '';
        $menu.parent().removeClass('active').end().filter('[href=#' + id + ']').parent().addClass('active');
    });


    //Слайдер
    var $scrSlider = $('#screens .slider ul').bxSlider({
        pager: false,
        // controls: false,
//        hideControlOnEnd: true,
    	slideMargin: 15,
    	auto:true,
    	autostart: true,
        infiniteLoop: true,
        speeed: 500,
        nextSelector: '.slider-right',
        prevSelector: '.slider-left',
        nextText: '',
        prevText:''
    });

    $('#cases .slider ul').bxSlider({
        pager: false,
        infiniteLoop: false,
        hideControlOnEnd: true,
        nextSelector: '#slider-right',
        prevSelector: '#slider-left',
        nextText: '',
        prevText:''
    });

   
    //.svg фаллбак
    if (!Modernizr.svg) {
        $('img[src*="svg"]').attr('src', function () {
            return $(this).attr('src').replace('.svg', '.png');
        });
    }

    //css хелперы
    $('ul').find('li:first-child').addClass('first');
    $('ul').find('li:last-child').addClass('last');
    $('.row').find('.column:first-child').addClass('first');
    $('.row').find('.column:last-child').addClass('last');

    //плейсхолдеры для плохих браузеров
    $('input').placeholder();

    //уведомления в контактной форме
    $('.notice').append('<div class="close"><i class="icon-cancel"></i></div>');
    $('.notice').on('click', '.close', function () {
        var el = $(this).parents('.notice');
        el.addClass('hidden');
    });


});
