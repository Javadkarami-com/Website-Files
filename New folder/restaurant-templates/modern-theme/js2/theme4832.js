/************************************************
 * Template Name: QuickQR - Contactless Restaurant QR Menu Maker
 * Version: 1.0
 * Author: BYLANCER
 * Developed By: BYLANCER
 * Author URL: www.bylancer.com
 *************************************************/

(function ($) {
    "use strict";

    // remove old localstorage data
    localStorage.setItem('quickqr_order', '{}');

    var $menuCustomize = $('#menuCustomize'),
        $view_order_wrapper = $('#view-order-wrapper');


    /* PRELOADER */
    $(window).on('load', function () {
        $(".preloading").fadeOut("slow");
        if ($("body").hasClass("my_splash_page")) {
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 3000);
        }
    });


    // on category click
    $('.menu-category').on('click', function (e) {
        e.preventDefault();
        $('.menu-category').removeClass("active");
        $(this).addClass("active");

        $('.menu-category-item').hide();
        $('.menu-category-' + $(this).data('catid')).show();

        $('#sidebarleft').removeClass('active');
        $('#content').removeClass('lowopacity');
        $('.overlay').removeClass('active');
        $('body').removeClass('noscroll');
    });
    $('#content').on('click', function (e) {
    
        $('.menu-category').removeClass("active");
        $('#sidebarleft').removeClass('active');
        $('#content').removeClass('lowopacity');
        $('.overlay').removeClass('active');
        $('body').removeClass('noscroll');
    });
    $('.menu-category').first().trigger('click');


    $('.overlay').addClass('active');

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 0) {
            $(".bg-header").addClass("active");
        }
        else {
            $(".bg-header").removeClass("active");
        }
    });

    /* SIDE NAVIGATION */
    $('#dismiss, .overlay').on('click', function () {
        $(this).parents('.sidenav').removeClass('active');
        $('#viewOrder').removeClass('active');
        $('#sidebarleft').removeClass('active');
        $('#content').removeClass('lowopacity');

        $('#call-waiter-box').removeClass('active');
        $('.overlay').removeClass('active');
        $menuCustomize.removeClass('active');
        $('body').removeClass('noscroll');
    });

    $('#sidebarleftbutton').on('click', function () {
        $('.overlay').addClass('active');
        $('body').addClass('noscroll');
        $('#sidebarleft').addClass('active');
        $('#content').addClass('lowopacity');
    });

    $('#call-the-waiter-btn').on('click', function () {
        $('.overlay').addClass('active');
        $('body').addClass('noscroll');
        $('#call-waiter-box').addClass('active');
    });

    $('#viewOrderBtn').on('click', function () {
        var order_data = JSON.parse(localStorage.getItem('quickqr_order'));
        var $order_items_wrapper = $('.your-order-items'),
            $order_total_selector = $('.your-order-price');

        $('.your-order-content').show();
        $('.order-success-message').hide();

        function generateViewOrder() {
            var order_total = 0;
            $order_items_wrapper.html('');
            for (var i in order_data) {
                if (order_data.hasOwnProperty(i)) {
                    var order = order_data[i],
                        price = Number(order.item_price),
                        quantity = Number(order.quantity),
                        extras = order.extras,
                        extra_total = 0;

                    var $order_tpl = $('<div class="section-menu">' +
                        '<div class="menu-item list">' +
                        '<div class="badge only"><i class="fa fa-circle"></i></div>' +
                        '<div class="menu-content">' +
                        '<div class="menu-detail">' +
                        '<div class="menu-title">' +
                        '<h4></h4>' +
                        '<div class="menu-price"></div>' +
                        '</div>' +
                        '<div class="add-menu">' +
                        '<div class="add-btn add-item-btn">' +
                        '<div class="wrapper h-100">' +
                        '<div class="addition menu-order-quantity-decrease">' +
                        '<i class="icon-feather-minus"></i>' +
                        '</div>' +
                        '<div class="count">' +
                        '<span class="num menu-order-quantity">1</span>' +
                        '</div>' +
                        '<div class="addition menu-order-quantity-increase">' +
                        '<i class="icon-feather-plus"></i>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<span class="price menu_price"></span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="menu-extra-wrapper"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    var title = order.item_name;

                    $order_tpl.data('cart_id', i);
                    $order_tpl.find('h4').html(title);
                    $order_tpl.find('.badge').addClass(TOTAL_MENUS[order.id].type);
                    $order_tpl.find('.menu-price').html(formatPrice(price));
                    $order_tpl.find('.menu-order-quantity').html(quantity);
                    $order_tpl.find('.menu_price').html(formatPrice(price * quantity));

                    for (var j in extras) {
                        if (extras.hasOwnProperty(j)) {
                            var extra = extras[j],
                                extra_price = Number(extra.price);

                            var $extra_tpl = $('<div class="menu-detail">' +
                                '<div class="menu-title">' +
                                '<a href="javascript:void(0)" class="item-extra-delete"><i class="icon-feather-trash-2 m-r-5"></i></a>' +
                                '<h4></h4>' +
                                '</div>' +
                                '<div>' +
                                '<span class="price menu_price"></span>' +
                                '</div>' +
                                '</div>');

                            $extra_tpl.data('extra_cart_id', j);
                            $extra_tpl.find('h4').html(extra.name + ' <span class="menu-price">' + formatPrice(extra_price) + '</span>');
                            $extra_tpl.find('.menu_price').html(formatPrice(extra_price * quantity));

                            var $extra_delete = $extra_tpl.find('.item-extra-delete');
                            $extra_delete.on('click', function () {
                                var cart_key = $(this).closest('.section-menu').data('cart_id');
                                var extra_cart_key = $(this).closest('.menu-detail').data('extra_cart_id');
                                delete order_data[cart_key]['extras'][extra_cart_key];

                                localStorage.setItem('quickqr_order', JSON.stringify(order_data));
                                generateViewOrder();
                            });

                            extra_total += extra_price;
                            $order_tpl.find('.menu-extra-wrapper').append($extra_tpl);
                        }
                    }
                    var this_item_total = (extra_total + price) * quantity;
                    order_total += this_item_total;

                    $order_tpl.find('.menu-order-quantity-decrease').off().on('click', function (e) {
                        e.stopPropagation();
                        var $item = $(this).closest('.section-menu');
                        var $quantity = $item.find('.menu-order-quantity');
                        var quantity = Number($quantity.text()) - 1;
                        var cart_key = $item.data('cart_id');
                        var $menu_item = $('.section-menu[data-id="' + order_data[cart_key]['id'] + '"]');
                        if (quantity == 0) {
                            var $add_btn = $('<div class="add-btn add-item-to-order">' +
                                '<span>' + LANG_ADD + '</span>' +
                                '<i class="icon-feather-plus"></i>' +
                                '</div>');
                            $menu_item.find('.add-menu').html($add_btn);
                            delete order_data[cart_key];

                        } else {
                            $menu_item.find('.menu-order-quantity').text(quantity);
                            order_data[cart_key]['quantity'] = quantity;
                        }

                        localStorage.setItem('quickqr_order', JSON.stringify(order_data));
                        generateViewOrder();
                    });
                    $order_tpl.find('.menu-order-quantity-increase').off().on('click', function (e) {
                        e.stopPropagation();
                        var $item = $(this).closest('.section-menu');
                        var $quantity = $item.find('.menu-order-quantity');
                        var cart_key = $item.data('cart_id');
                        var $menu_item = $('.section-menu[data-id="' + order_data[cart_key]['id'] + '"]');
                        var quantity = Number($quantity.text()) + 1;

                        $menu_item.find('.menu-order-quantity').text(quantity);
                        order_data[cart_key]['quantity'] = quantity;
                        localStorage.setItem('quickqr_order', JSON.stringify(order_data));

                        generateViewOrder();
                    });
                    $order_items_wrapper.append($order_tpl);

                }
            }
            $order_total_selector.html(formatPrice(order_total));
            if (order_total == 0) {
                $('.overlay').trigger('click');
            }
            manageViewOrder();
        }

        generateViewOrder();
        $('#viewOrder').addClass('active');
        $('.overlay').addClass('active');
        $('body').addClass('noscroll');
    });

    // add menu to order
    $(document).on('click', '.add-item-to-order', function (e) {
        e.preventDefault();

        var $add_customize = $('<div class="add-btn add-item-btn">' +
            '<div class="wrapper h-100">' +
            '<div class="addition menu-order-quantity-decrease">' +
            '<i class="icon-feather-minus"></i>' +
            '</div>' +
            '<div class="count">' +
            '<span class="num menu-order-quantity">1</span>' +
            '</div>' +
            '<div class="addition menu-order-quantity-increase">' +
            '<i class="icon-feather-plus"></i>' +
            '</div>' +
            '</div>' +
            '</div>'),
            $item = $(this).closest('.section-menu'),
            item_id = $item.data('id'),
            name = $item.data('name'),
            description = $item.data('description'),
            price = $item.data('price'),
            amount = $item.data('amount'),
            order_price = Number(amount),
            extras = TOTAL_MENUS[$item.data('id')].extras || [],
            order_data = JSON.parse(localStorage.getItem('quickqr_order')),
            random_id = randomId(10);


        $item.data('cart_id', random_id);
        if (extras.length == 0) {
            order_data[random_id] = {
                'id': item_id,
                'item_name': name,
                'item_price': amount,
                'extras': {},
                'quantity': 1
            };

            localStorage.setItem('quickqr_order', JSON.stringify(order_data));

            $item.find('.add-menu').html($add_customize);
        } else {
            $menuCustomize.find('h4').html(name);
            $menuCustomize.find('.customize-item-description').html(description);
            $('#order-price').html(formatPrice(amount));
            $('#menu-order-quantity').text(1);

            var $extra_wrapper = $('#customize-extras');
            $extra_wrapper.html('');

            console.log(extras);
            for (var i in extras) {
                if (extras.hasOwnProperty(i)) {

                    var $extra_tpl = $(
                        '<div class="extras menu-extra-item">' +
                        '<span class="extra-item-title"></span>' +
                        '<div class="d-flex align-items-center">' +
                        '<del><span class="mr-2 extra-item-price" style="font-weight:900;"></span></del>' +
                        '<span class="mr-2 extra-item-price-off" style="color:#416cb6; font-weight:900;"></span>' +
                        '<div class="custom-control custom-checkbox mr-sm-2">' +
                        '<input type="checkbox" class="custom-control-input" id="customControl">' +
                        '<label class="custom-control-label" for="customControl"></label>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    $extra_tpl.find('.custom-control-input').attr('id', 'checkbox' + extras[i].id);
                    $extra_tpl.find('label').attr('for', 'checkbox' + extras[i].id);
                    $extra_tpl.find('.extra-item-title').html(extras[i].title);
                    $extra_tpl.find('.extra-item-price').html(formatPrice(extras[i].price));
                    $extra_tpl.data('price', extras[i].price);
                    $extra_tpl.data('id', extras[i].id);
                    //calculate offer
                    let discountPrice = 0;
                    if (extras[i].offer != null) {
                        discountPrice = (extras[i].offer / 100) * extras[i].price;
                        discountPrice = extras[i].price - discountPrice;

                        $extra_tpl.find('.extra-item-price').html(formatPrice(extras[i].price));
                        $extra_tpl.find('.extra-item-price-off').html(formatPrice(discountPrice));
                        $extra_tpl.data('price', discountPrice);
                    } else {
                        $extra_tpl.find('.extra-item-price-off').html(formatPrice(extras[i].price));
                        $extra_tpl.find('.extra-item-price').remove();
                    }
                    $extra_tpl.find('.custom-control-input').on('change', function () {
                        $('#menu-order-quantity').text(1);
                        calculateOrderPrice(amount);

                    });
                    $extra_wrapper.append($extra_tpl);
                }
            }

            $menuCustomize.find('.menu-order-quantity-decrease').off().on('click', function (e) {
                e.stopPropagation();
                var quatity = Number($('#menu-order-quantity').text()) - 1;
                if (quatity == 0) {
                    quatity = 1;
                }
                $('#menu-order-quantity').text(quatity);
                calculateOrderPrice(order_price);
            });
            $menuCustomize.find('.menu-order-quantity-increase').off().on('click', function (e) {
                e.stopPropagation();
                $('#menu-order-quantity').text(Number($('#menu-order-quantity').text()) + 1);
                calculateOrderPrice(order_price);
            });

            $('#add-order-button').off().on('click', function (e) {
                calculateOrderPrice(order_price);
                var price = $('#order-price').html();
                var order_data = JSON.parse(localStorage.getItem('quickqr_order'));

                // this order's extras
                var extras = {};
                $('.menu-extra-item').each(function () {
                    if ($(this).find('.custom-control-input').is(':checked')) {
                        extras[randomId(10)] = {
                            'id': $(this).data('id'),
                            'name': $(this).find('.extra-item-title').html(),
                            'price': $(this).data('price')
                        };
                    }
                });

                order_data[random_id] = {
                    'id': item_id,
                    'item_name': name,
                    'item_price': amount,
                    'extras': extras,
                    'quantity': $('#menu-order-quantity').text()
                };

                localStorage.setItem('quickqr_order', JSON.stringify(order_data));

                $add_customize.find('.menu-order-quantity').text($('#menu-order-quantity').text());
                $item.find('.add-menu').html($add_customize);

                manageViewOrder();
                $('.overlay').trigger('click');
            });


            $menuCustomize.addClass('active');
            $('.overlay').addClass('active');
            $('body').addClass('noscroll');
        }
        manageViewOrder();
    });

    $(document).on('click', '.menu-order-quantity-decrease', function (e) {
        var $item = $(this).closest('.section-menu');
        var $quantity = $item.find('.menu-order-quantity');
        var quantity = Number($quantity.text()) - 1;
        var order_data = JSON.parse(localStorage.getItem('quickqr_order'));
        var cart_key = $item.data('cart_id');
        if (quantity == 0) {
            var $add_btn = $('<div class="add-btn add-item-to-order">' +
                '<span>' + LANG_ADD + '</span>' +
                '<i class="icon-feather-plus"></i>' +
                '</div>');
            $item.find('.add-menu').html($add_btn);
            delete order_data[cart_key];
        } else {
            $quantity.text(quantity);
            order_data[cart_key]['quantity'] = quantity;
        }

        localStorage.setItem('quickqr_order', JSON.stringify(order_data));
        manageViewOrder();
    });
    $(document).on('click', '.menu-order-quantity-increase', function (e) {
        var $quantity = $(this).closest('.add-item-btn').find('.menu-order-quantity');
        var quantity = Number($quantity.text()) + 1;
        $quantity.text(quantity);

        var order_data = JSON.parse(localStorage.getItem('quickqr_order'));
        order_data[$(this).closest('.section-menu').data('cart_id')]['quantity'] = quantity;
        localStorage.setItem('quickqr_order', JSON.stringify(order_data));

        manageViewOrder();
    });

    /*
    * Ordering type
    */
    $("#ordering-type").on("change", function (e) {
        let ordering_type = $(this).val();
        if (ordering_type == 'on-table') {
            $('#table-number-field').slideDown();
            $('#phone-number-field').slideUp();
            $('#address-field').slideUp();
        } else if (ordering_type == 'takeaway') {
            $('#table-number-field').slideUp();
            $('#phone-number-field').slideDown();
            $('#address-field').slideUp();
        } else if (ordering_type == 'delivery') {
            $('#table-number-field').slideUp();
            $('#phone-number-field').slideDown();
            $('#address-field').slideDown();
        }
        /*if($("#pay_via").val() == 'pay_online'){
            $('#phone-number-field').slideDown();
        }*/
    }).trigger('change');

    if ($("#ordering-type").find('option').length == 1) {
        $("#ordering-type").closest('.section').hide();
    }

    /*
    * pay via
    */
    $("#pay_via").on("change", function (e) {
        let pay_via = $(this).val();
        if (pay_via == 'pay_on_counter') {
            $('#submit-order-button').html(LANG_SEND_ORDER);
            /*if($("#ordering-type").val() == 'on-table'){
                $('#phone-number-field').slideUp();
            }*/

        } else if (pay_via == 'pay_online') {
            $('#submit-order-button').html(LANG_PAY_NOW);
            //$('#phone-number-field').slideDown();
        }
    });

    /*
    * Send Order
    */
    $("#send-order-form").on("submit", function (e) {
        e.preventDefault();
        var order_data = JSON.parse(localStorage.getItem('quickqr_order')),
            items = [],
            $form = $(this),
            $btn = $form.find('button'),
            $form_error = $form.find('.form-error'),
            $data = $form.serializeArray();

        for (var i in order_data) {
            if (order_data.hasOwnProperty(i)) {
                items.push(order_data[i]);
            }
        }
        $data.push({ name: 'action', value: 'sendRestaurantOrder' });
        $data.push({ name: 'items', value: JSON.stringify(items) });
        $data.push({ name: 'restaurant', value: $form.data('id') });

        $form_error.slideUp();
        $btn.addClass('button-progress').prop('disabled', true);
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: $data,
            dataType: 'json',
            success: function (response) {
                $btn.removeClass('button-progress').prop('disabled', false);
                if (response.success) {
                    // clear order data
                    localStorage.setItem('quickqr_order', '{}');
                    manageViewOrder();
                    //$form.find('input').val('');

                    if (response.message != '' && response.message != null) {
                        location.href = response.message;
                    } else {
                        var $add_btn = $('<div class="add-btn add-item-to-order">' +
                            '<span>' + LANG_ADD + '</span>' +
                            '<i class="icon-feather-plus"></i>' +
                            '</div>');
                        $('.section-menu .add-menu').html($add_btn);

                        $('.your-order-content').slideUp();
                        $('.order-success-message').slideDown();

                        if (response.whatsapp_url != '' && response.whatsapp_url != null) {
                            // send to whatsapp
                            location.href = response.whatsapp_url;
                        }
                    }

                } else {
                    $form.find('.form-error').html(response.message).slideDown().focus();
                }
            }
        });
    });

    /*
    * Call the waiter
    */
    $("#call-waiter-form").on("submit", function (e) {
        e.preventDefault();
        var $form = $(this),
            $btn = $form.find('button'),
            $data = $form.serializeArray();

        $data.push({ name: 'action', value: 'callTheWaiter' });
        $data.push({ name: 'restaurant', value: $form.data('id') });

        $btn.addClass('button-progress').prop('disabled', true);

        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: $data,
            dataType: 'json',
            success: function (response) {
                $btn.removeClass('button-progress').prop('disabled', false);
                $('#dismiss').trigger('click');
            }
        });
    });

    /* on lang change */
    $('.user-lang-switcher').on('click', '.dropdown-menu a', function (e) {
        e.preventDefault();
        var lang = $(this).data('lang');
        var code = $(this).data('code');
        if (lang != null) {
            var res = lang.substr(0, 2);
            $('#selected_lang').html(res);
            $.cookie('Quick_lang', lang, { path: '/' });
            $.cookie('Quick_user_lang', lang, { path: '/' });
            $.cookie('Quick_user_lang_code', code, { path: '/' });
            location.reload();
        }
    });
    var code = $.cookie('Quick_user_lang_code');
    if (code != null) {
        $('.user-lang-switcher .filter-option').html(code.toUpperCase());
    }

    function manageViewOrder() {
        var order_data = JSON.parse(localStorage.getItem('quickqr_order'));
        var price = 0,
            quantity = 0;
        for (var i in order_data) {
            if (order_data.hasOwnProperty(i)) {
                var extra_price = 0,
                    extras = order_data[i]['extras'];
                for (var j in extras) {
                    if (extras.hasOwnProperty(j)) {
                        extra_price += Number(extras[j]['price']);
                    }
                }
                price += (Number(order_data[i]['item_price']) + extra_price) * Number(order_data[i]['quantity']);
                quantity += Number(order_data[i]['quantity']);
            }
        }
        $('#view-order-quantity').html(quantity);
        $('#view-order-price').html(formatPrice(price));
        if (quantity > 0) {
            $view_order_wrapper.show();
        } else {
            $view_order_wrapper.hide();
        }
    }

    function formatPrice(price) {
        var number = price * 1;//makes sure `number` is numeric value
        var str = number.toFixed(CURRENCY_DECIMAL_PLACES ? CURRENCY_DECIMAL_PLACES : 0).toString().split('.');
        var parts = [];
        for (var i = str[0].length; i > 0; i -= 3) {
            parts.unshift(str[0].substring(Math.max(0, i - 3), i));
        }
        str[0] = parts.join(CURRENCY_THOUSAND_SEPARATOR ? CURRENCY_THOUSAND_SEPARATOR : ',');
        price = str.join(CURRENCY_DECIMAL_SEPARATOR ? CURRENCY_DECIMAL_SEPARATOR : '.');

        return (CURRENCY_LEFT == 1 ? CURRENCY_SIGN + ' ' : '') + price + (CURRENCY_LEFT == 0 ? ' ' + CURRENCY_SIGN : '');
    }

    function randomId(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function calculateOrderPrice(amount) {
        var extra = 0;
        $('.menu-extra-item').each(function () {
            if ($(this).find('.custom-control-input').is(':checked')) {
                extra += Number($(this).data('price'));
            }
        });
        $('#order-price').html(formatPrice((amount + extra) * Number($('#menu-order-quantity').text())));
    }
})(jQuery);


//Set Waves
Waves.attach('.components li a', ['waves-block']);
Waves.init();

$(document).ready(function () {
    var submitIcon = $('.searchbox-icon');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function () {
        if (isOpen == false) {
            searchBox.addClass('searchbox-open');
            inputBox.focus();
            isOpen = true;
        } else {
            searchBox.removeClass('searchbox-open');
            inputBox.focusout();
            isOpen = false;
        }
    });
    submitIcon.mouseup(function () {
        return false;
    });
    searchBox.mouseup(function () {
        return false;
    });
    $(document).mouseup(function () {
        if (isOpen == true) {
            $('.searchbox-icon').css('display', 'block');
            submitIcon.click();
        }
    });
});

function buttonUp() {
    var inputVal = $('.searchbox-input').val();
    inputVal = $.trim(inputVal).length;
    if (inputVal !== 0) {
        $('.searchbox-icon').css('display', 'none');
    } else {
        $('.searchbox-input').val('');
        $('.searchbox-icon').css('display', 'block');
    }
}

function inlineBG() {
    $(".single-page-header").each(function () {
        var attrImageBG = $(this).attr('data-background-image');
        if (attrImageBG !== undefined) {
            $(this).append('<div class="background-image-container"></div>');
            $('.background-image-container').css('background-image', 'url(' + attrImageBG + ')');
        }
    });
}

inlineBG();
$(".intro-search-field").each(function () {
    var bannerLabel = $(this).children("label").length;
    if (bannerLabel > 0) {
        $(this).addClass("with-label");
    }
});

