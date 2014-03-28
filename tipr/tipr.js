
/*
Tipr 1.0.3
Copyright (c) 2013 Tipue
Tipr is released under the MIT License
http://www.tipue.com/tipr
*/


(function($) {

     $.fn.tipr = function(options) {

          var set = $.extend( {

               'speed'        : 200,
               'mode'         : 'bottom'

          }, options);

          var deviceHasTouch = !!('ontouchstart' in window);
          var deviceHasMouse = !!('onmousemove' in window);

          if (!deviceHasTouch && deviceHasMouse) {

               return this.each(function() {

                    var tipr_cont = '[class^=tipr_container_]';
                    var tipr_point = '[class^=tipr_point_]';

                    $(this).hover(
                         function ()
                         {
                              var out = '<div class="tipr_container_' + set.mode + '"><div class="tipr_point_' + set.mode + '"><div class="tipr_content">' + $(this).attr('data-tip') + '</div></div></div>';
                              $(this).append(out);

                              var w_t = $(tipr_cont).outerWidth();
                              var w_e = $(this).width();
                              var h_e = $(this).outerHeight();
                              var h_t = $(tipr_cont).outerHeight();
                              var m_l = (w_e / 2) - (w_t / 2);
                              var v_h = $(window).height() + $(window).scrollTop();

                              var hitbox = $(this).offset().top + h_e + h_t;
                              var show_top = false;

                              $(tipr_cont).css('margin-left', m_l + 'px');
                              $(this).removeAttr('title');

                              if (hitbox > v_h && set.mode === 'bottom') {
                                show_top = true;
                                $(tipr_cont).removeClass('tipr_container_bottom').addClass('tipr_container_top');
                                $(tipr_point).removeClass('tipr_point_bottom').addClass('tipr_point_top');
                              }

                              if (set.mode === 'top' || show_top === true)
                                $(tipr_cont).css('margin-top', '-' + (h_e + h_t) + 'px');

                              $(tipr_cont).fadeIn(set.speed);
                         },
                         function ()
                         {
                              $(tipr_cont).remove();
                         }
                    );

               });
          };
     };

})(jQuery);
