/***********************************************
 * SparkOptions Javascript
 * 
 * @author Chris Mavricos, Sevenspark http://sevenspark.com
 * @version 1.0
 * Last modified 2012-02-08
 * 
 ***********************************************/

jQuery(document).ready(function($){
	
	var DEBUG = false;
	
	$('.spark-panel').hide().first().show();
	
	$('.spark-nav ul li a').click(function(e){
		e.preventDefault();
		
		$('#current-panel-id').val( $(this).attr('href').substr(7) ); //chop off #spark-
		
		$('.spark-nav ul li a.current').removeClass('current');
		$(this).addClass('current');
		
		var $target = $( $(this).attr('href') );
		$('.spark-panel').css('minHeight', 0).stop().slideUp(function(){
			$(this).css('minHeight', '');
		});
		$target.stop().css('minHeight', 0).slideDown(function(){
			$(this).css( { height : '', padding: '', minHeight : '' } );
		});
		
	});
	$('.spark-nav ul li a[href="#spark-'+$('#current-panel-id').val()+'"]').click();
	$( '.spark-nav a[href="#spark-updates"]').click();
	
	/* Input Sliding Interface */
	$('.spark-admin-op input[type="checkbox"], #wpmega-demo .spark-admin-op input[type="radio"]')
		.each(function(k, el){
			var tog = $(el).is(':checked') ? 'on' : 'off';
			var $toggle = $('<label class="spark-toggle-onoff '+tog+'" for="'+$(el).attr('id')+
								'"><span class="spark-toggle-inner"><span class="spark-toggle-on">On</span><span class="spark-toggle-mid"></span><span class="spark-toggle-off">Off</span></span></label>');
					
			switch($(el).attr('type')){
			
				case 'checkbox':
			
					$(el).after($toggle);
					$(el).hide();
					
					$toggle.click(function(){
						
						//console.log($(el).is(':checked') ? 'checked' : 'not checked');
						
						if($(el).is(':checked')){
							//console.log('checked');
							var $this = $(this);
							$this.find('.spark-toggle-inner').animate({
								'margin-left'	:	'-51px'
							}, 'normal', function(){
								$this.removeClass('on').addClass('off');
							});
							$(el).attr('checked', false);
						}
						else{
							//console.log('not checked');
							var $this = $(this);
							$this.find('.spark-toggle-inner').animate({
								'margin-left'	:	'0px'
							}, 'normal', function(){
								$this.removeClass('off').addClass('on');
							});
							$(el).attr('checked', true);
						}
						
						return false;	//stops the label click from reversing the check, which is necessary in IE
					});
					break;
					
				case 'radio' :
					var $label = $(el).next('label');
					var labelText = $label.text();
					$label.hide();
					//console.log(labelText);
					
					$(el).after('<span class="spark-tog-label">'+labelText+'</span>');
					$(el).after($toggle);				
					$(el).hide();
					
					$toggle.click(function(){
						if($(this).prev().is(':checked')){
							//Do nothing, it's double clicking a radio button
						}
						else{
							
							var oldID = $('input[name="'+$(el).attr('name')+'"]:checked').attr('id');
							
							//turn on
							var $this = $(this);
							$this.find('.spark-toggle-inner').animate({
								'margin-left'	:	'0px'
							}, 'normal', function(){
								$this.removeClass('off').addClass('on');
							});
							//$this.prev().attr('checked', true);
							$(el).attr('checked', true);
							
							//turn off the old
							$('label[for="'+oldID+'"] .spark-toggle-inner').animate({
								'margin-left'	:	'-51px'
							}, 'normal', function(){
								$(this).parent('label').removeClass('on').addClass('off');
							})
							.siblings('input[type="radio"]').attr('checked', false);
						}
						return false;
					});
					break;
				}
			});
	
	//Image Upload
	var img_upload_id = '';
	$( '.img-upload-button' ).click(function() {
		var $imgUpload = $(this).prev( '.img-upload' );
		if( $imgUpload.length ){
			formfield = $imgUpload.attr( 'name' );
			img_upload_id = $imgUpload.attr( 'id' );

			tb_show( '', 'media-upload.php?type=image&amp;TB_iframe=true;width=700' );
		}
		return false;
	});
	
	window.send_to_editor = function(html) {
		imgurl = $('img',html).attr('src');
		$( '#'+img_upload_id ).val(imgurl);
		$( '#'+img_upload_id+'_preview' ).attr( 'src' , imgurl ).fadeIn();
		tb_remove();
	}
	
});


//fgnass.github.com/spin.js#v1.2.4
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},p.prototype={spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}},!function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");p.prototype.lines=function(a,b){function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}function k(a,d,f){h(i,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:f}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}var c=b.length+b.width,d=2*c,f=-(b.width+b.length)*2+"px",i=l(e(),{position:"absolute",top:f,left:f}),j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(a,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}else f=k(a,"animation")}(),a.Spinner=p})(window,document);
