
/*!
sarine.viewer.gemprint - v0.11.0 -  Sunday, October 1st, 2017, 3:58:17 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var GEMPRINT,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  GEMPRINT = (function(_super) {
    __extends(GEMPRINT, _super);

    function GEMPRINT(options) {
      this.scaleImage = __bind(this.scaleImage, this);
      this.initPopup = __bind(this.initPopup, this);
      GEMPRINT.__super__.constructor.call(this, options);
      this.gemPrintName = options.gemPrintName, this.limitSize = options.limitSize;
      this.limitSize = this.limitSize || 250;
    }

    GEMPRINT.prototype.convertElement = function() {
      return this.element;
    };

    GEMPRINT.prototype.first_init = function() {
      var defer, imageElement, tags, _t;
      defer = $.Deferred();
      this.image = window.stones[0].viewers.resources.gemprintScintillationImage;
      tags = window.stones[0].stoneProperties.tags;
      if (tags !== null) {
        this.clickUrlArray = tags.filter(function(i) {
          return i.key === 'GemprintURL';
        });
      }
      if ((this.clickUrlArray != null) && this.clickUrlArray.length > 0) {
        this.clickUrl = this.clickUrlArray[0];
      }
      if (this.clickUrl != null) {
        this.clickUrl = this.clickUrl.value;
      }
      if (this.image != null) {
        this.previewSrc = this.image;
      }
      _t = this;
      if ((this.previewSrc != null)) {
        return this.loadImage(this.previewSrc).then(function(img) {
          var imageElement, imgDimensions;
          imageElement = $("<img>");
          imageElement.attr({
            src: img.src
          });
          imgDimensions = _t.scaleImage(img);
          imageElement.attr({
            width: imgDimensions.width,
            height: imgDimensions.height
          });
          _t.element.append(imageElement);
          if (!imageElement.hasClass('no_stone')) {
            imageElement.on('click', (function(_this) {
              return function(e) {
                return _t.initPopup(_t.clickUrl);
              };
            })(this));
            imageElement.attr({
              'style': 'cursor:pointer;'
            });
          }
          return defer.resolve(_t);
        });
      } else {
        imageElement = $("<img>");
        imageElement.attr({
          "class": 'PDF-thumb no_stone'
        });
        imageElement.attr({
          src: _t.callbackPic
        });
        _t.element.append(imageElement);
        return defer.resolve(_t);
      }
    };

    GEMPRINT.prototype.initPopup = function(src) {
      var closeButton, gemPrintContainer, iframeElement, sliderHeight, sliderWrap, _t;
      _t = this;
      sliderWrap = $(".slider-wrap");
      gemPrintContainer = $('#iframe-gemprint-container');
      iframeElement = $('#iframe-gemprint');
      closeButton = $('#closeIframe');
      if (gemPrintContainer.length === 0) {
        gemPrintContainer = $('<div id="iframe-gemprint-container" class="slider-wrap">');
        if (_t.inIframe()) {
          gemPrintContainer.addClass('iframe-gemprint-container-hide');
        }
        sliderHeight = $('.slider-wrap').last().height();
        gemPrintContainer.height(sliderHeight);
        iframeElement = $('<iframe id="iframe-gemprint" frameborder=0></iframe>');
        closeButton = $('<a id="closeGemPrintReport">&times;</a>');
        gemPrintContainer.append(closeButton);
        gemPrintContainer.append(iframeElement);
        sliderWrap.before(gemPrintContainer);
      }
      iframeElement.attr('src', src);
      sliderWrap.css('display', 'none');
      gemPrintContainer.css('display', 'block');
      return closeButton.on('click', ((function(_this) {
        return function() {
          sliderWrap.css('display', 'block');
          gemPrintContainer.css('display', 'none');
        };
      })(this)));
    };

    GEMPRINT.prototype.inIframe = function() {
      var e;
      try {
        return window.self !== window.top;
      } catch (_error) {
        e = _error;
        return true;
      }
    };

    GEMPRINT.prototype.scaleImage = function(img) {
      var imgDimensions, scale, widthBigger;
      imgDimensions = {};
      imgDimensions.width = img.width;
      imgDimensions.height = img.height;
      if (img.width < this.limitSize || img.height < this.limitSize) {
        return imgDimensions;
      }
      widthBigger = img.width > img.height;
      if (widthBigger) {
        scale = img.width / this.limitSize;
        imgDimensions.width = this.limitSize;
        imgDimensions.height = img.height / scale;
      } else {
        scale = img.height / this.limitSize;
        imgDimensions.height = this.limitSize;
        imgDimensions.width = img.width / scale;
      }
      return imgDimensions;
    };

    GEMPRINT.prototype.full_init = function() {
      var defer;
      defer = $.Deferred();
      defer.resolve(this);
      return defer;
    };

    GEMPRINT.prototype.play = function() {};

    GEMPRINT.prototype.stop = function() {};

    return GEMPRINT;

  })(Viewer);

  this.GEMPRINT = GEMPRINT;

}).call(this);
