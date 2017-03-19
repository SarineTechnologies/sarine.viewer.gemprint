
/*!
sarine.viewer.gemprint - v0.11.0 -  Wednesday, March 15th, 2017, 1:25:47 PM 
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
      GEMPRINT.__super__.constructor.call(this, options);
      this.gemPrintName = options.gemPrintName, this.limitSize = options.limitSize;
      this.limitSize = this.limitSize || 250;
    }

    GEMPRINT.prototype.convertElement = function() {
      return this.element;
    };

    GEMPRINT.prototype.first_init = function() {
      var defer, _t;
      defer = $.Deferred();
      this.fullSrc = this.src.indexOf('##FILE_NAME##') !== -1 ? this.src.replace('##FILE_NAME##', this.gemPrintName) : this.src + this.gemPrintName;
      _t = this;
      this.previewSrc = this.fullSrc.indexOf('?') === -1 ? this.fullSrc + '.gif' : this.fullSrc.split('?')[0] + '.gif?' + this.fullSrc.split('?')[1];
      return this.loadImage(this.previewSrc).then(function(img) {
        var canvas, ctx, imgDimensions, imgName;
        canvas = $("<canvas>");
        imgName = img.src === _t.callbackPic || img.src.indexOf('data:image') !== -1 ? 'GEMPRINT-thumb no_stone' : 'GEMPRINT-thumb';
        ctx = canvas[0].getContext('2d');
        imgDimensions = _t.scaleImage(img);
        canvas.attr({
          width: imgDimensions.width,
          height: imgDimensions.height,
          "class": imgName
        });
        ctx.drawImage(img, 0, 0, imgDimensions.width, imgDimensions.height);
        _t.element.append(canvas);
        if (!canvas.hasClass('no_stone')) {
          canvas.on('click', (function(_this) {
            return function(e) {
              return window.open(_t.fullSrc, '_blank');
            };
          })(this));
          canvas.attr({
            'style': 'cursor:pointer;'
          });
        }
        return defer.resolve(_t);
      });
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
