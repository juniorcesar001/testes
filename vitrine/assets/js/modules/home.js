(function($){

    $('.destaque-vitrine .variants-item').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		infinite: false,
		prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="icon-arrow-left"></i></button>',
		nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="icon-arrow-right"></i></button>'
	});

	var template =
		'<div>' +
		'<div class="item" itemscope itemtype="http://schema.org/Product" itemid="XXXXX">' +
			'<a class="item-link" href="#">' + 
				'<div class="item-offer">' +
					'<span>35%OFF</span>' +
					'<i class="icon-vitrine-check"></i>' +
				'</div>' +
				'<div class="item-image">' + 
					'<img itemprop="image"  data-original="XXXXX" class="lazy img-fluid" src="img/foto-thumb.png" alt="XXXX" title="XXXXX">' +
				'</div>' +
				'<div class="item-title">' +
					'<h4>Lorem ipsum dolor sit amet consectetur adipiscing elit</h4>' +
				'</div>' +
				'<div class="item-price">' +
					'<span class="item-price-old">R$000,00</span>' +
					'<span class="item-price-now">R$000,00</span>' + 
					'<div class="item-price-avista">' +
						'<span class="item-price-avista-money">R$ 00,00</span>' +
						'<span class="item-price-avista-msg"> á vista com desconto via PIX</span>' +
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
		'</div>';

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
		nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="sprite icon-arrow-right"></i></button>'
	});

	$.get('http://localhost/futfanatics/api-infra/vitrines?ids=&pos=home&date=2022-03-15', function(data){
		data = data.data;
		console.log(data);

		data.forEach(function(product){

			$template = jQuery(template);

			var id = product.id;
			var link = product.url.https;
			var img = product.ProductImage[0].thumbs[180].https;
			var title = product.name;
			var pricePromo = product.promotional_price;
			var price = product.price;
			var pricePIX = pricePromo > 0 ? (pricePromo * 0.95) : (price * 0.95);
			var percentDiscount = Math.trunc(100 - (pricePromo/price) * 100);
			percentDiscount = percentDiscount < 100 ? percentDiscount + "%OFF" : "";
			var payment = product.payment_option;

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
			$template.find('.item-price .item-price-old').text(pricePromo > 0 ? "R$" + pricePromo : "");
			$template.find('.item-price .item-price-now').text("R$" + (pricePromo > 0 ? pricePromo : price ) );
			$template.find('.item-price .item-price-avista-money').text("R$" + pricePIX.toFixed(2));
			// MetasTags
			$template.find('meta[itemprop=productID]').attr("content", id);
			$template.find('meta[itemprop=sku]').attr("content", id);
			$template.find('meta[itemprop=gtin14]').attr("content", product.ean);
			$template.find('meta[itemprop=description]').attr("content", product.description_small);
			$template.find('meta[itemprop=name]').attr("content", product.brand);
			
			// Slide de Variações
			$template.find('.item-variants-slider .variants-item').slick({
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: false,
				prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="icon-arrow-left"></i></button>',
				nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="icon-arrow-right"></i></button>'
			});

			product.Variant.forEach(function(data){
				var bt = '<button type="button" data-variant="' + data.id + '">' + data.tamanho + '</button>';
				$template.find('.item-variants-slider .variants-item').slick('slickAdd', bt);
			});
			
			//$template.find('.btn-add-to-cart').attr("data-product", product.id);
			console.log($vitrine);

			$vitrine.slick('slickAdd', $template);



		});
	});

})(jQuery);