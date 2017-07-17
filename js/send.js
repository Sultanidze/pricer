jQuery(document).ready(function ($) {
    $('.sendorderga').click(function() {
        ga('send', 'event', 'button', 'click', 'Заказать', 1);
    });
    
    //Отправка формы
    $('#contact-form').submit(function () {
        var $form = $(this),
            error = false;
        $form.find('input').each(function () { 
            if ($(this).val() == '' && $(this).attr('id') != 'url') { // если находим пустое
                alert('Заполните поле "' + $(this).attr('placeholder') + '"!');
                error = true;
            }
        });
        if (!error) { // если ошибки нет
            //var data = $form.serialize();
            
            var action = 'zayavka';
            var data = {};
            data['action'] = action;
            data['name'] = $('#name').val();
            data['phone'] = $('#phone').val();
            data['email'] = $('#email').val();
            data['url'] = $('#url').val();
            data['source'] = 12;
            
            $.ajax({ 
                type: 'POST',
                url: 'http://seo-studio.ua/wp-cross-functions.php', // путь до обработчика
                dataType: 'json', 
                data: { action: action, data: data }, 
                beforeSend: function (data) { // событие до отправки
                    $form.find('button[type="submit"]').attr('disabled', 'disabled'); 
                },
                success: function (data) {
                    if (parseInt(data['order_id']) > 0) {
                        ga('ecommerce:addTransaction', {
                                     id: data['order_id'],
                            affiliation: 'Order',
                                revenue: '1', 
                               shipping: '1',
                                    tax: '1'
                        });
                        ga('ecommerce:addItem', {
                                  id: data['order_id'],
                                 sku: data['order_id'],
                                name: data['order_id'],
                            category: $('.request_form input[name=site]').val(),
                               price: '1',
                            quantity: '1'
                        });
                        ga('ecommerce:send');
                        
                        ga('send', 'event', 'form', 'submit', 'Отправить заявку', 1);
                        
                        $('#msg-ok').removeClass('hidden');
                    } else {
                        $('#msg-bad').removeClass('hidden');
                    }
                    
                    /*if (data['error']) { // если обработчик вернул ошибку
                        //alert(data['error']); // покажем её текст
                        $('#msg-bad').removeClass('hidden');
                    } else { // если все прошло ок
                        //alert('Данные отправлены!'); // пишем что все ок
                        $('#msg-ok').removeClass('hidden');
                    }*/
                },
                error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                    console.log(xhr.status); // покажем ответ сервера
                    console.log(thrownError); // и текст ошибки
                },
                complete: function (data) { // событие после любого исхода
                    $form.find('button[type="submit"]').prop('disabled', false);
                }

            });
        }
        return false; 
    });
});
