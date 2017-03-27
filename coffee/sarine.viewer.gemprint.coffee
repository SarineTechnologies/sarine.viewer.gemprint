###!
sarine.viewer.gemprint - v0.11.0 -  Monday, March 27th, 2017, 3:38:13 PM 
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
		tags = window.stones[0].stoneProperties.tags
		if tags != null
			@clickUrlArray = tags.filter((i) ->
				i.key == 'GemprintURL'
			)
		if(@clickUrlArray?) and  @clickUrlArray.length  > 0 then @clickUrl = @clickUrlArray[0]
		if @clickUrl? then @clickUrl = @clickUrl.value
		if @image? then @previewSrc = @image



		_t = @
		if(@previewSrc?)
			@loadImage(@previewSrc).then((img)->
				imageElement = $("<img>")
				imageElement.attr({src: img.src})
				imgDimensions = _t.scaleImage(img)
				imageElement.attr({width : imgDimensions.width, height : imgDimensions.height})
				_t.element.append(imageElement)

				if(!imageElement.hasClass('no_stone'))
					imageElement.on 'click', (e) => _t.initPopup(_t.clickUrl )
					imageElement.attr {'style':'cursor:pointer;'}
				defer.resolve(_t)
			)
		else
			imageElement = $("<img>")
			imageElement.attr({ class: 'PDF-thumb no_stone'})
			imageElement.attr({src:_t.callbackPic})
			_t.element.append(imageElement);
			defer.resolve(_t)


	initPopup : (src)=>
	 _t = @
		sliderWrap = $(".slider-wrap")
		gemPrintContainer = $('#iframe-gemprint-container')
		iframeElement = $('#iframe-gemprint')
		closeButton = $('#closeIframe')
		if (gemPrintContainer.length == 0)
			gemPrintContainer = $('<div id="iframe-gemprint-container" class="slider-wrap">')
			if _t.inIframe() then gemPrintContainer.addClass('iframe-gemprint-container-hide')
			sliderHeight = $('.slider-wrap').last().height()
			gemPrintContainer.height(sliderHeight)
			iframeElement = $('<iframe id="iframe-gemprint" frameborder=0></iframe>')
			closeButton = $('<a id="closeGemPrintReport">&times;</a>')
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





	inIframe :()->
		try
			return window.self != window.top
		catch e
			return true
		return
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
 
