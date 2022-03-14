(function($){

    $('.table-brao .see-more').on('click', function(){
		$('.table-brao-row').toggleClass('sombra');
	});

    $('.round-head-button').on('click', function(e){
		var $this = $(this);
        var $round = $this.siblings('.round-head-title');
        var round;

        if($this.is('.round-head-prev'))  {
            round = parseInt($round.find('span').text());
            round--;

            if (round >= 1 && round <= 38) {
                $($this).siblings('.round-head-title').find('span.round-head-title-number').text(round);
                putRound(round);
            }
        }

        if($this.is('.round-head-next'))  {
            round = parseInt($round.find('span').text());
            round++;
            
            if (round >= 1 && round <= 38){
                $($this).siblings('.round-head-title').find('span.round-head-title-number').text(round);
                putRound(round);
            }
        }
	});

    var urlApi = 'https://apiinfrahomologacao.futfanatics.app/';

    $.get(urlApi + 'brasileirao/info', function(data){
        var year = data.data[0].ano_campeonato;
        var roundNow = data.data[0].campeonato_atual;

        putRound(roundNow);

        /* Renderizando as Rodadas */
        $.ajax({
            url: urlApi + 'brasileirao/tabela/' + year,
            async: true
        }).done(function(data){

            var templateTable = $('#templateTable').text();
            var $table = $('.table-brao-row .table');
            var array = data.data;
            var renderTimes = ejs.render(templateTable, {times: [array]});
            $table.find('.round-games').remove();
            $table.append(renderTimes);
        });

        /* Renderizando a Timeline */
        $.ajax({
            url: urlApi + 'brasileirao/timeline',
            async: true
        }).done(function(data){
            var template = $('#templateTimeline').text();
            var containerSlides = $('.timeline-slick');
            var containerNav = $('.timeline-nav');

            containerSlides.slick({
                autoplay: false,
                asNavFor: '.timeline-nav',
                autoplaySpeed: 4000,
                pauseOnFocus: false,
                pauseOnHover: false,
                arrows: false,
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                //prevArrow: '<button type="button" class="slick-prev slick-arrow icon-arrow-left"></button>',
                //nextArrow: '<button type="button" class="slick-next slick-arrow icon-arrow-right"></button>',
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        swipe: false
                    }
                    
                }]
            });
            
            containerNav.slick({
                centerMode: true,
                asNavFor: '.timeline-slick',
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: true,
                dots: false,
                focusOnSelect: true,
                prevArrow: '<button type="button" class="slick-prev slick-arrow icon-arrow-left"></button>',
                nextArrow: '<button type="button" class="slick-next slick-arrow icon-arrow-right"></button>',
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
            var array = data.data;
            var renderSlides = ejs.render(template, {timeline: [array]});

            $(renderSlides).each(function(i, elem){
                if ($(elem).is('.year')) {
                    var $elem = $(elem);
                    var year = $elem.attr('data-year');
                    var $spanYear = $(`<div><div><span class="item">${year}</span></div></div>`);
                    containerSlides.slick('slickAdd', $elem);
                    containerNav.slick('slickAdd', $spanYear);
                }
            });
        });
    });

    function putRound(round) {
        /* Renderizando a Tabela Completa */
        $.ajax({
            url: urlApi + 'brasileirao/rodada/' + round,
            async: true
        }).done(function(data){

            var templateRound = $('#templateRounds').text();
            var $rounds = $('.table-brao-row .round');
            var array = data.data;
            var renderRounds = ejs.render(templateRound, {rounds: [array]});
            
            $rounds.find('.round-games').remove();
            $rounds.append(renderRounds);
        });
    }
})(jQuery);