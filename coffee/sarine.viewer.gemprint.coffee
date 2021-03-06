###!
sarine.viewer.gemprint - v0.11.0 -  Wednesday, March 22nd, 2017, 11:28:09 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###
class GEMPRINT extends Viewer
	constructor: (options) ->
		super(options)
		{@gemPrintName, @limitSize} = options
		@limitSize = @limitSize || 250

	convertElement : () ->
		@element

	first_init : ()->
		defer = $.Deferred()
		@image = window.stones[0].viewers.resources.gemprintScintillationImage
		@clickUrl =    (window.stones[0].stoneProperties.tags.filter (i) -> i.key is "GemprintURL")[0].value
		@fullSrc = @image
		_t = @
		@previewSrc = @fullSrc
		@loadImage(@previewSrc).then((img)->
			imageElement = $("<img>")
			imgName = if (img.src == _t.callbackPic || img.src.indexOf('data:image') != -1) then 'GEMPRINT-thumb no_stone' else 'GEMPRINT-thumb'
			imageElement.attr({src: img.src})
			imgDimensions = _t.scaleImage(img)
			imageElement.attr({width : imgDimensions.width, height : imgDimensions.height, class : imgName})
			_t.element.append(imageElement)

			if(!imageElement.hasClass('no_stone'))
				imageElement.on 'click', (e) => _t.initPopup(_t.clickUrl )
				imageElement.attr {'style':'cursor:pointer;'}
			defer.resolve(_t)
			)

	initPopup : (src)=>

		sliderWrap = $(".slider-wrap")
		gemPrintContainer = $('#iframe-gemprint-container')
		iframeElement = $('#iframe-gemprint')
		closeButton = $('#closeIframe')
		if (gemPrintContainer.length == 0)
			sliderHeight = $('.slider-wrap').last().height()
			gemPrintContainer = $('<div id="iframe-gemprint-container" class="slider-wrap">')
			gemPrintContainer.height(sliderHeight)
			iframeElement = $('<iframe id="iframe-gemprint" frameborder=0 scrolling=yes></iframe>')
			iframeElement.css 'width', '100%'
			iframeElement.css 'height', '100%'
			iframeElement.css 'overflow','scroll'
			closeButton = $('<a id="closeGemPrintReport">&times;</a>')
			closeButton.css 'font-size','35px'
			closeButton.css 'position','absolute'
			closeButton.css 'right','10px'
			gemPrintContainer.append closeButton
			gemPrintContainer.append iframeElement
			sliderWrap.before gemPrintContainer

		iframeElement.attr 'src', src

		sliderWrap.css 'display','none'
		gemPrintContainer.css 'display', 'block'
		closeButton.on 'click', (=>
				sliderWrap.css 'display', 'block'
				gemPrintContainer.css 'display', 'none'
				return
			)






	scaleImage : (img)=>
		imgDimensions = {}
		imgDimensions.width = img.width
		imgDimensions.height = img.height 
		if(img.width < @limitSize || img.height < @limitSize)
			return imgDimensions

		widthBigger = img.width > img.height 
		if(widthBigger)
			scale = img.width / @limitSize
			imgDimensions.width = @limitSize
			imgDimensions.height = img.height / scale
		else
			scale = img.height / @limitSize
			imgDimensions.height = @limitSize
			imgDimensions.width = img.width / scale

		return imgDimensions

	full_init : ()-> 
		defer = $.Deferred() 
		defer.resolve(@)		
		defer  
	play : () -> return 
	stop : () -> return

@GEMPRINT = GEMPRINT
 
