(function($){
	$(window).on('load', function() {
		var template =
			'<div><div>' +
			'<div class="item" itemscope itemtype="http://schema.org/Product" itemid="XXXXX">' +
				'<a class="item-link" href="#">' + 
					'<div class="item-offer">' +
						'<span>35%OFF</span>' +
						'<i class="icon-vitrine-check"></i>' +
					'</div>' +
					'<div class="item-image">' + 
						'<img itemprop="image"  data-original="XXXXX" class="lazy img-fluid" src="img/loading.svg" alt="XXXX" title="XXXXX">' +
					'</div>' +
					'<div class="item-title">' +
						'<h4>Lorem ipsum dolor sit amet consectetur adipiscing elit</h4>' +
					'</div>' +
					'<div class="item-price">' +
						'<span class="item-price-old"></span>' +
						'<span class="item-price-now"></span>' + 
						'<div class="item-price-avista">' +
							'<span class="item-price-avista-money"></span>' +
							'<span class="item-price-avista-msg"></span>' +
						'</div>' +
					'</div>' +
				'</a>' +
				'<meta itemprop="productID" content=""/>' +
				'<meta itemprop="sku" content=""/>' +
				'<meta itemprop="gtin14" content="">' +
				'<meta itemprop="description" content="">' +
				'<span itemprop="brand" itemscope itemtype="http://schema.org/Organization">' +
					'<meta itemprop="name" content=""/>' +
				'</span>' +
				'<div class="item-variants">' +
					'<div class="item-variants-slider">' +
						'<div class="variants-item"></div>' +
					'</div>' +
				'</div>' +
				'<div class="item-actions">' +
					'<button type="button" class="btn-add-to-cart d-flex align-items-center justify-content-center" data-product="XXXX"><i class="icon-cart-add"></i>Adicionar</button>' +
				'</div>' +
			'</div>' +
			'</div></div>';

		var $vitrine = $('.destaque-vitrine');

		$vitrine.slick({
			autoplay: false,
			infinite: true,
			speed: 500,
			arrows: false,
			dots: true,
			slidesToShow: 5,
			slidesToScroll: 5,
	//        lazyLoad: 'ondemand',
			prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="sprite icon-arrow-left"></i></button>',
			nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="sprite icon-arrow-right"></i></button>',
			responsive: [
				{
					breakpoint: 575,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						vertical: true,
						centerMode: false,
						infinite: false,
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 1080,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				}
			]
		});

		var dateNow = new Date();
		var mouth = dateNow.getMonth() > 9 ? (dateNow.getMonth() + 1) : "0" + (dateNow.getMonth() + 1);
		var dateFormat = dateNow.getFullYear() + "-" + mouth + "-" + dateNow.getDate();

		$.get('https://apiinfra.futfanatics.app/vitrines?date='+ dateFormat +'&pos=home', function(data){
			data = data.data;
			console.log(data);

			data.forEach(function(product){

				$template = jQuery(template);

				var id = product.id;
				var link = product.url.https;
				var img = product.ProductImage[0].thumbs[180].https;
				var title = product.name;

				var pricePromo = product.promotional_price;
				var priceOld = product.price;
				var price = pricePromo != 0 ? pricePromo : product.price;
				var pricePIX = price * 0.95;

				var percentDiscount = 100 - (pricePromo/priceOld) * 100;
				percentDiscount = percentDiscount < 100 ? percentDiscount.toFixed() + "%OFF" : "";

				$template.find('.item').attr("itemid", id); 
				$template.find('.item-link').attr('href', link); //Link
				$template.find('.item-offer span').text(percentDiscount); //Oferta

				//Descrição
				$template.find('.item-image img').attr({
					'data-original' : img,
					'title' : title,
					'alt' : title
				}, link); //Image
				$template.find('.item-title h4').text(title);

				if (pricePromo > 0 && pricePromo < priceOld) {
					// Colocar Preço Antigo
					$template.find('.item-price .item-price-old').text(convertMoeda(priceOld));
				} 
				$template.find('.item-price .item-price-now').text(convertMoeda(price));
				$template.find('.item-price .item-price-avista-money').text(convertMoeda(pricePIX));

				// MetasTags
				$template.find('meta[itemprop=productID]').attr("content", id);
				$template.find('meta[itemprop=sku]').attr("content", id);
				$template.find('meta[itemprop=gtin14]').attr("content", product.ean);
				$template.find('meta[itemprop=description]').attr("content", product.description_small);
				$template.find('meta[itemprop=name]').attr("content", product.brand);

				$template.find('.item-variants-slider .variants-item').slick({
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: false,
					prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="icon-arrow-left"></i></button>',
					nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="icon-arrow-right"></i></button>'
				});

				$(product.Variant).each(function(e){
					var bt = '<div><button type="button" data-variant="' + data.id + '">' + data.tamanho + '</button></div>';
					$template.find('.item-variants-slider .variants-item').slick('slickAdd', bt).slick('setPosition');
				});

				$vitrine.slick('slickAdd', $template);
			});
		});

		function convertMoeda(float) {
			return "R$" + parseFloat(float).toFixed(2).replace('.', ',');
		}
	});
})(jQuery);