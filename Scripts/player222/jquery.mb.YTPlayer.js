
var mobile = (/iphone|ipod|android|blackberry|mini|windows phone|windowssce|palm/i.test(navigator.userAgent.toLowerCase()));
if (mobile || $(window).width() <= 751) { 
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 jquery.mb.components
 
 file: jquery.mb.YTPlayer.src.js
 last modified: 11/2/18 7:23 PM
 Version:  3.2.10
 Build:  7445
 
 Open Lab s.r.l., Florence - Italy
 email:  matteo@open-lab.com
 blog: 	http://pupunzi.open-lab.com
 site: 	http://pupunzi.com
 	http://open-lab.com
 
 Licences: MIT, GPL
 https://www.opensource.org/licenses/mit-license.php
 https://www.gnu.org/licenses/gpl.html
 
 Copyright (c) 2001-2018. Matteo Bicocchi (Pupunzi)
 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/


     
var ytp = ytp || {}

function onYouTubeIframeAPIReady()
{
	if (ytp.YTAPIReady)
		return
	ytp.YTAPIReady = true
	jQuery(document).trigger('YTAPIReady')
}

let getYTPVideoID = function (url) {
	let videoID, playlistID
	if (url.indexOf('youtu.be') > 0 || url.indexOf('youtube.com/embed') > 0) {
		videoID = url.substr(url.lastIndexOf('/') + 1, url.length)
		playlistID = videoID.indexOf('?list=') > 0 ? videoID.substr(videoID.lastIndexOf('='), videoID.length) : null
		videoID = playlistID ? videoID.substr(0, videoID.lastIndexOf('?')) : videoID
	} else
		if (url.indexOf('http') > -1) {
			//videoID = url.match( /([\/&]v\/([^&#]*))|([\\?&]v=([^&#]*))/ )[ 1 ];
			videoID = url.match(/[\\?&]v=([^&#]*)/)[1]
			playlistID = url.indexOf('list=') > 0 ? url.match(/[\\?&]list=([^&#]*)/)[1] : null
		} else {
			videoID = url.length > 15 ? null : url
			playlistID = videoID ? null : url
		}
	return {
		videoID   : videoID,
		playlistID: playlistID
	}
};

function iOSversion()
{
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
	}
}

(function (jQuery, ytp) {

	jQuery.mbYTPlayer = {
		name   : 'jquery.mb.YTPlayer',
		version: '3.2.10',
		build  : '7445',
		author : 'Matteo Bicocchi (pupunzi)',
		apiKey : '',

		/*
		 * Default options for the player
		 */
		defaults        : {
			/**
			 videoURL (string)
			 the complete Youtube video URL or the short url or the videoID
			 */
			videoURL: null,

			/**
			 containment (string)
			 default containment for the player
			 */
			containment: 'body',

			/**
			 ratio (string or number)
			 "auto", "16/9", "4/3" or number: 4/3, 16/9
			 */
			ratio: 'auto',

			/**
			 fadeOnStartTime (int)
			 fade in timing at video start
			 */
			fadeOnStartTime: 1000,

			/**
			 startAt (int)
			 start second
			 */
			startAt: 0,

			/**
			 stopAt (int)
			 stop second
			 */
			stopAt: 0,

			/**
			 autoPlay (bool)
			 on page load video should start or pause
			 */
            autoPlay: false,

			/**
			 coverImage (string)
			 The path to the image to be used as cover if the autoPlay option is set to false
			 */
			coverImage: false,

			/**
			 loop (bool or int)
			 video should loop or not; if number it will loop for the specified times
			 */
            loop: false,

			/**
			 addRaster (bool)
			 shows a raster image over the video (added via CSS)
			 You can change the raster image via CSS:
			 .YTPOverlay.raster { background: url(images/raster.png)}
			 */
			addRaster: false,

			/**
			 mask (bool or object) the key is the second and the value is the path to the image
			 Ex: mask:{ 0:'assets/mask-1.png', 5:'assets/mask-2.png', 30: false, 50:'assets/mask-3.png'}
			 */
			mask: false,

			/**
			 opacity (int)
			 0 to 1
			 */
			opacity: 1,

			/**
			 quality (string)
			 “small”, “medium”, “large”, “hd720”, “hd1080”, “highres”, "default"
			 */
            quality: 'highres',

			/**
			 vol (int)
			 0 to 100
			 */
			vol: 100,

			/**
			 mute (bool)
			 mute the video at start
			 */
			mute: true,

			/**
			 showControls (bool)
			 shows the control bar at the bottom of the containment
			 */
            showControls: false,

			/**
			 anchor (string)
			 center,top,bottom,left,right combined in pair
			 */
			anchor: 'center,center',

			/**
			 showAnnotations (bool)
			 display the annotations on video
			 */
			showAnnotations: false,

			/**
			 cc_load_policy (bool)
			 display the subtitles
			 */
			cc_load_policy: false,

			/**
			 showYTLogo (bool)
			 display the Youtube logotype inside the button bar
			 */
            showYTLogo: false,

			/**
			 useOnMobile (bool)
			 activate the player also on mobile
			 */
			useOnMobile: true,

			/**
			 playOnlyIfVisible (bool)
			 play the video only if the containment is on screen
			 */
			playOnlyIfVisible: false,

			/**
			 onScreenPercentage (bool)
			 percentage of the player height the video should stop or start when visible
			 */
			onScreenPercentage: 0,

			/**
			 stopMovieOnBlur (bool)
			 stop the video if the window loose the focus
			 */
			stopMovieOnBlur: true,

			/**
			 realfullscreen (bool)
			 the video when in full screen covers all the display
			 */
            realFullscreen: true,

			/**
			 optimizeDisplay (bool)
			 The video always fit the containment without displaying the black strips
			 */
            optimizeDisplay: false,

			/**
			 abundance (bool)
			 the abudance of the video size
			 */
			abundance: 0.3,

			/**
			 gaTrack (bool)
			 track the video plays on GA
			 */
			gaTrack: true,

			/**
			 remember_last_time (bool)
			 when the page is reloaded the video will start from the last position
			 */
			remember_last_time: false,

			/**
			 addFilters (bool or string)
			 add one or more CSS filters as object to the video
			 Ex: {sepia: 50, hue_rotate : 220}
			 */
			addFilters: false,

			/**
			 onReady (function)
			 a callback function fired once the player is ready
			 */
			onReady: function (player) {
			},

			/**
			 onReady (function)
			 a callback function fired if there's an error
			 */
			onError: function (player, err) {
			}
		},
		/**
		 *  @fontface icons
		 *  */
		controls        : {
			play    : 'P',
			pause   : 'p',
			mute    : 'M',
			unmute  : 'A',
			onlyYT  : 'O',
			showSite: 'R',
			ytLogo  : 'Y'
		},
		controlBar      : null,
		locationProtocol: 'https:',

		/**
		 * Applicable filters
		 */
		defaultFilters: {
			grayscale : { value: 0, unit: '%' },
			hue_rotate: { value: 0, unit: 'deg' },
			invert    : { value: 0, unit: '%' },
			opacity   : { value: 0, unit: '%' },
			saturate  : { value: 0, unit: '%' },
			sepia     : { value: 0, unit: '%' },
			brightness: { value: 0, unit: '%' },
			contrast  : { value: 0, unit: '%' },
			blur      : { value: 0, unit: 'px' }
		},

		/**
		 * build the player
		 * @param options
		 * @returns [players]
		 */
		buildPlayer: function (options) {

			if (!ytp.YTAPIReady && typeof window.YT === 'undefined') {
				jQuery('#YTAPI').remove()
				let tag = jQuery('<script>').attr({
					'src': 'https://www.youtube.com/iframe_api?v=' + jQuery.mbYTPlayer.version,
					'id' : 'YTAPI'
				})
				jQuery('head').prepend(tag)
			} else {
				setTimeout(function () {
					jQuery(document).trigger('YTAPIReady')
					ytp.YTAPIReady = true
				}, 100)
			}

			function isIframe()
			{
				let isIfr = false
				try {
					if (self.location.href != top.location.href) isIfr = true
				} catch (e) {
					isIfr = true
				}
				return isIfr
			}


			console.time('YTPlayerInit')
			console.time('YTPlayerStartPlay')

			return this.each(function () {
				let YTPlayer = this
				let $YTPlayer = jQuery(YTPlayer)
				$YTPlayer.hide()
				YTPlayer.loop = 0
				YTPlayer.state = 0
				YTPlayer.filters = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaultFilters)
				YTPlayer.filtersEnabled = true
				YTPlayer.id = YTPlayer.id || 'YTP_' + new Date().getTime()
				$YTPlayer.addClass('mb_YTPlayer')

				/**
				 Set properties
				 */
				let property = $YTPlayer.data('property') && typeof $YTPlayer.data('property') == 'string' ?
				  eval('(' + $YTPlayer.data('property') + ')') :
				  $YTPlayer.data('property')

				if (typeof property !== 'object')
					property = {}

				YTPlayer.opt = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaults, YTPlayer.opt, options, property)

				YTPlayer.opt.elementId = YTPlayer.id

				if (YTPlayer.opt.vol === 0) {
					YTPlayer.opt.vol = 1
					YTPlayer.opt.mute = true
				}

				/**
				 * If autoPlay is set to true and  mute is set to false
				 * Webkit browser will not auto-play
				 * Start playing after the first click
				 */
				if (YTPlayer.opt.autoPlay && YTPlayer.opt.mute == false && jQuery.mbBrowser.chrome) {
					//YTPlayer.opt.mute = true;
					jQuery(document).one('mousedown.YTPstart', function () {
						$YTPlayer.YTPPlay()
					})
					console.info('YTPlayer info: On Webkit browsers you can not autoplay the video if the audio is on.')
				}

				if (YTPlayer.opt.loop && typeof YTPlayer.opt.loop === 'boolean') {
					YTPlayer.opt.loop = 9999
				}

				/**
				 Disable fullScreen if is in an iframe or full-screen API is not available
				 */
				let fullScreenAvailable = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
				YTPlayer.opt.realFullscreen = isIframe() || !fullScreenAvailable ? false : YTPlayer.opt.realFullscreen

				/**
				 Manage annotations
				 */
				YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? '1' : '3'

				/**
				 Manage show subtitle and caption
				 */
				YTPlayer.opt.cc_load_policy = YTPlayer.opt.cc_load_policy ? '1' : '0'

				/**
				 Manage cover image
				 */
				YTPlayer.opt.coverImage = YTPlayer.opt.coverImage || YTPlayer.opt.backgroundImage

				/**
				 * todo: remove
				 Manage Opacity for IE < 10
				 */
				if (jQuery.mbBrowser.msie && jQuery.mbBrowser.version < 9)
					YTPlayer.opt.opacity = 1

				YTPlayer.opt.containment = YTPlayer.opt.containment === 'self' ? $YTPlayer : jQuery(YTPlayer.opt.containment)
				YTPlayer.isRetina = (window.retina || window.devicePixelRatio > 1)

				YTPlayer.opt.ratio = YTPlayer.opt.ratio === 'auto' ? 16 / 9 : YTPlayer.opt.ratio
				YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio)

				let origContainmentBackground = YTPlayer.opt.containment.css('background-image')
				origContainmentBackground = (origContainmentBackground == 'none') ? null : origContainmentBackground
				YTPlayer.orig_containment_background = origContainmentBackground

				if (!$YTPlayer.attr('id'))
					$YTPlayer.attr('id', 'ytp_' + new Date().getTime())

				YTPlayer.playerID = 'iframe_' + YTPlayer.id

				YTPlayer.isAlone = false
				YTPlayer.hasFocus = true
				YTPlayer.videoID = YTPlayer.opt.videoURL ?
				  getYTPVideoID(YTPlayer.opt.videoURL).videoID : $YTPlayer.attr('href') ?
					getYTPVideoID($YTPlayer.attr('href')).videoID :
					false

				/**
				 Check if it is a video list
				 */
				YTPlayer.playlistID = YTPlayer.opt.videoURL ?
				  getYTPVideoID(YTPlayer.opt.videoURL).playlistID : $YTPlayer.attr('href') ?
					getYTPVideoID($YTPlayer.attr('href')).playlistID :
					false

				let start_from_last = 0
				if (jQuery.mbCookie.get('YTPlayer_start_from' + YTPlayer.videoID))
					start_from_last = parseFloat(jQuery.mbCookie.get('YTPlayer_start_from' + YTPlayer.videoID))
				if (YTPlayer.opt.remember_last_time && start_from_last) {
					YTPlayer.start_from_last = start_from_last
					jQuery.mbCookie.remove('YTPlayer_start_from' + YTPlayer.videoID)
				}

				YTPlayer.isPlayer = $YTPlayer.is(YTPlayer.opt.containment)
				YTPlayer.isBackground = YTPlayer.opt.containment.is('body')

				if (YTPlayer.isBackground && ytp.backgroundIsInited)
					return

				/**
				 Hide the placeholder if it's not the target of the player
				 */
				if (YTPlayer.isPlayer)
					$YTPlayer.show()

				/**
				 create the overlay
				 */
				YTPlayer.overlay = jQuery('<div/>').css({
					position: 'absolute',
					top     : 0,
					left    : 0,
					width   : '100%',
					height  : '100%'
				}).addClass('YTPOverlay')

				if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
					let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
					if (bgndURL)
						YTPlayer.opt.containment.css({
							background      : bgndURL,
							backgroundSize  : 'cover',
							backgroundRepeat: 'no-repeat'
						})
				}

				/**
				 create the wrapper
				 */
				YTPlayer.wrapper = jQuery('<div/>').attr('id', 'wrapper_' + YTPlayer.id).css({
					position : 'absolute',
					zIndex   : 0,
					minWidth : '100%',
					minHeight: '100%',
					left     : 0,
					top      : 0,
					overflow : 'hidden',
					opacity  : 0
				}).addClass('mbYTP_wrapper')

				/**
				 If is an inline player toggle play if the overlay is clicked
				 */
				//if (YTPlayer.isPlayer) {
				//	YTPlayer.inlinePlayButton = jQuery('<div/>').addClass('inlinePlayButton').html(jQuery.mbYTPlayer.controls.play)
				//	$YTPlayer.append(YTPlayer.inlinePlayButton)
				//	YTPlayer.inlinePlayButton.on('click', function (e) {
				//		$YTPlayer.YTPPlay()
				//		e.stopPropagation()
				//	})

				//	if (YTPlayer.opt.autoPlay)
				//		YTPlayer.inlinePlayButton.hide()

				//	YTPlayer.overlay.on('click', function () {
				//		$YTPlayer.YTPTogglePlay()
				//	}).css({ cursor: 'pointer' })
				//}

				/**
				 create the playerBox where the YT iframe will be placed
				 */
				let playerBox = jQuery('<div/>').attr('id', YTPlayer.playerID).addClass('playerBox')
				playerBox.css({
					position: 'absolute',
					zIndex  : 0,
					width   : '100%',
					height  : '100%',
					top     : 0,
					left    : 0,
					overflow: 'hidden',
					opacity : 1
				})

				YTPlayer.wrapper.append(playerBox)
				playerBox.after(YTPlayer.overlay)

				if (YTPlayer.isPlayer) {
					YTPlayer.inlineWrapper = jQuery('<div/>').addClass('inline-YTPlayer')

					YTPlayer.inlineWrapper.css({
						position: 'relative',
						//maxWidth: YTPlayer.opt.containment.css('width')
					})

					YTPlayer.opt.containment.css({
						position     : 'relative'
						//paddingBottom: '0',
						//overflow     : 'hidden',
						//height       : '85vh'
					})
					YTPlayer.opt.containment.wrap(YTPlayer.inlineWrapper)
				}

				/**
				 Loop all the elements inside the container and check if their position is not "static"
				 */
				YTPlayer.opt.containment.children().not('script, style').each(function () {
					if (jQuery(this).css('position') == 'static')
						jQuery(this).css('position', 'relative')
				})

				if (YTPlayer.isBackground) {
					jQuery('body').css({
						boxSizing: 'border-box'
					})

					YTPlayer.wrapper.css({
						position: 'fixed',
						top     : 0,
						left    : 0,
						zIndex  : 0
					})

				} else
					if (YTPlayer.opt.containment.css('position') == 'static') {

						YTPlayer.opt.containment.css({
							position: 'relative'
						})
						$YTPlayer.show()
					}
				YTPlayer.opt.containment.prepend(YTPlayer.wrapper)

				if (!YTPlayer.isBackground) {
					YTPlayer.overlay.on('mouseenter', function () {
						if (YTPlayer.controlBar && YTPlayer.controlBar.length)
							YTPlayer.controlBar.addClass('visible')
					}).on('mouseleave', function () {
						if (YTPlayer.controlBar && YTPlayer.controlBar.length)
							YTPlayer.controlBar.removeClass('visible')
					})
				}

				if (jQuery.mbBrowser.mobile && !YTPlayer.opt.useOnMobile) {
					if (YTPlayer.opt.coverImage) {
						YTPlayer.wrapper.css({
							backgroundImage   : 'url(' + YTPlayer.opt.coverImage + ')',
							backgroundPosition: 'center center',
							backgroundSize    : 'cover',
							backgroundRepeat  : 'no-repeat',
							opacity           : 1
						})
						YTPlayer.wrapper.css({ opacity: 1 })
					}
					return $YTPlayer
				}

				/**
				 If is on device start playing on first touch
				 */
				if (jQuery.mbBrowser.mobile && YTPlayer.opt.autoPlay && YTPlayer.opt.useOnMobile)
					jQuery('body').one('touchstart', function () {
					YTPlayer.player.unMute()
						YTPlayer.player.playVideo()
					})

				jQuery(document).one('YTAPIReady', function () {
					$YTPlayer.trigger('YTAPIReady_' + YTPlayer.id)
					ytp.YTAPIReady = true
				})

				YTPlayer.isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage)

				$YTPlayer.one('YTAPIReady_' + YTPlayer.id, function () {

					let YTPlayer = this
					let $YTPlayer = jQuery(YTPlayer)

					if ((YTPlayer.isBackground && ytp.backgroundIsInited) || YTPlayer.isInit)
						return

					if (YTPlayer.isBackground)
						ytp.backgroundIsInited = true

					YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == 'undefined' ? (YTPlayer.isBackground ? true : false) : YTPlayer.opt.autoPlay
					YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100

					jQuery.mbYTPlayer.getDataFromAPI(YTPlayer)

					jQuery(YTPlayer).on('YTPChanged', function (e) {

						if (YTPlayer.isInit)
							return

						YTPlayer.isInit = true

						/** Initialize the YT player ------------------------------------
						 * Youtube player variables
						 * @type {{modestbranding: number, autoplay: number, controls: number, showinfo: number, rel: number, enablejsapi: number, version: number, playerapiid: string, origin: string, allowfullscreen: boolean, iv_load_policy: (string|*|jQuery.mbYTPlayer.opt.showAnnotations), playsinline: number}}
						 */
						let playerVars = {
							'modestbranding' : 1,
							'autoplay'       : 0,
							'controls'       : 0,
							'showinfo'       : 0,
							'rel'            : 0,
							'enablejsapi'    : 1,
							'version'        : 3,
							'playerapiid'    : YTPlayer.playerID,
							'origin'         : '*',
							'allowfullscreen': true,
							'wmode'          : 'transparent',
							'iv_load_policy' : YTPlayer.opt.showAnnotations,
							'cc_load_policy' : YTPlayer.opt.cc_load_policy,
							'playsinline'    : jQuery.mbBrowser.mobile ? 1 : 0,

							/**
							 Check if the browser can play HTML5 videos
							 */
							'html5': document.createElement('video').canPlayType ? 1 : 0
						}

						new YT.Player(YTPlayer.playerID, {
							//videoId: YTPlayer.videoID.toString(),
							playerVars: playerVars,
							events    : {
								'onReady'                : function (event) {

									YTPlayer.player = event.target

									//todo: make playlist works
									/* if (YTPlayer.playlistID && YTPlayer.apiKey) {
										YTPlayer.isList = true;
										YTPlayer.videos = [];
										YTPlayer.player.cuePlaylist({
										  listType: 'playlist',
										  list: YTPlayer.playlistID.toString(),
										  startSeconds: YTPlayer.opt.startAt,
										  endSeconds: YTPlayer.opt.stopAt,
										  suggestedQuality: YTPlayer.opt.quality
										});
									  }
									   else { */

									YTPlayer.player.loadVideoById({
										videoId         : YTPlayer.videoID.toString(),
										// startSeconds: YTPlayer.start_from_last || YTPlayer.opt.startAt,
										// endSeconds: YTPlayer.opt.stopAt,
										suggestedQuality: YTPlayer.opt.quality
									})

									/*}*/

									$YTPlayer.trigger('YTPlayerIsReady_' + YTPlayer.id)
								},
								/**
								 * on State Change
								 * @param event
								 *
								 * -1 (unstarted)
								 * 0 (ended)
								 * 1 (playing)
								 * 2 (paused)
								 * 3 (buffering)
								 * 5 (video cued)
								 */
								'onStateChange'          : function (event) {

									if (typeof event.target.getPlayerState != 'function')
										return

									let state = event.target.getPlayerState()

									if (YTPlayer.preventTrigger || YTPlayer.isStarting) {
										YTPlayer.preventTrigger = false
										return
									}

									YTPlayer.state = state
									// console.debug(YTPlayer.state);

									if (event.data == YT.PlayerState.PLAYING) {
										// console.debug('YTPlayer.opt.quality', YTPlayer.opt.quality)
										event.target.setPlaybackQuality(YTPlayer.opt.quality)
									}

									// console.debug('YTPGetVideoQuality', jQuery(YTPlayer).YTPGetVideoQuality());

									let eventType
									switch (state) {

									  /** unstarted */
										case -1:
											eventType = 'YTPUnstarted'
											break

									  /** unstarted */
										case 0:
											eventType = 'YTPRealEnd'
											break

									  /** play */
										case 1:
											eventType = 'YTPPlay'
                                            if (YTPlayer.controlBar.length) {
                                                YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.pause)
                                                 
                                            }

											if (YTPlayer.isPlayer)
												YTPlayer.inlinePlayButton.hide()

											jQuery(document).off('mousedown.YTPstart')
											break

									  /** pause */
										case 2:
											eventType = 'YTPPause'
                                            if (YTPlayer.controlBar.length) {
                                                YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)
                                                 
                                            }

											if (YTPlayer.isPlayer)
												YTPlayer.inlinePlayButton.show()
											break

									  /** buffer */
										case 3:
											YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality)
											eventType = 'YTPBuffering'
                                            if (YTPlayer.controlBar.length) { 
                                                YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)
                                                 
                                            }
											break

									  /** cued */
										case 5:
											eventType = 'YTPCued'
											break

										default:
											break
									}

									/**
									 Trigger state events
									 */
									let YTPEvent = jQuery.Event(eventType)
									YTPEvent.time = YTPlayer.currentTime
									jQuery(YTPlayer).trigger(YTPEvent)
								},
								/**
								 * onPlaybackQualityChange
								 * @param e
								 */
								'onPlaybackQualityChange': function (e) {
									let quality = e.target.getPlaybackQuality()
									let YTPQualityChange = jQuery.Event('YTPQualityChange')
									YTPQualityChange.quality = quality
									jQuery(YTPlayer).trigger(YTPQualityChange)
								},
								/**
								 * onError
								 * @param err
								 *
								 2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
								 5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
								 100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
								 101 – The owner of the requested video does not allow it to be played in embedded players.
								 150 – This error is the same as 101. It's just a 101 error in disguise!
								 */
								'onError'                : function (err) {

									if (typeof YTPlayer.opt.onError == 'function')
										YTPlayer.opt.onError($YTPlayer, err)

									switch (err.data) {
										case 2:
											console.error('video ID:: ' + YTPlayer.videoID + ': The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.')
											break
										case 5:
											console.error('video ID:: ' + YTPlayer.videoID + ': The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.')
											break
										case 100:
											console.error('video ID:: ' + YTPlayer.videoID + ': The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.')
											break
										case 101:
										case 150:
											console.error('video ID:: ' + YTPlayer.videoID + ': The owner of the requested video does not allow it to be played in embedded players.')
											break
									}

									if (YTPlayer.isList)
										jQuery(YTPlayer).YTPPlayNext()

								}
							}
						})

						$YTPlayer.on('YTPlayerIsReady_' + YTPlayer.id, function () {

							if (YTPlayer.isReady)
								return this

							YTPlayer.playerEl = YTPlayer.player.getIframe()
							jQuery(YTPlayer.playerEl).unselectable()
							$YTPlayer.optimizeDisplay()

							/**
							 * Optimize display on resize
							 */
							jQuery(window).off('resize.YTP_' + YTPlayer.id).on('resize.YTP_' + YTPlayer.id, function () {
								$YTPlayer.optimizeDisplay()
							})

							/**
							 * Set the time of the last visit progress
							 */
							if (YTPlayer.opt.remember_last_time) {
								jQuery(window).on('unload.YTP_' + YTPlayer.id, function () {
									let current_time = YTPlayer.player.getCurrentTime()
									jQuery.mbCookie.set('YTPlayer_start_from' + YTPlayer.videoID, current_time, 0)
								})
							}

							$YTPlayer.YTPCheckForState()

						})
					})
				})

				$YTPlayer.off('YTPTime.mask')
				jQuery.mbYTPlayer.applyMask(YTPlayer)

				console.timeEnd('YTPlayerInit')
			})
		},

		/**
		 * isOnScreen
		 * Check if the YTPlayer is on screen
		 * @param YTPlayer
		 * @returns {boolean}
		 */
		isOnScreen: function (YTPlayer, perc) {
			perc = perc || 10
			let playerBox = YTPlayer.wrapper
			let winTop = jQuery(window).scrollTop()
			let winBottom = winTop + jQuery(window).height()

			let margin = (playerBox.height() * perc) / 100
			let elTop = playerBox.offset().top + margin
			let elBottom = playerBox.offset().top + (playerBox.height() - margin)

			return ((elBottom <= winBottom) && (elTop >= winTop))
		},

		/**
		 * getDataFromAPI
		 * @param YTPlayer
		 */
		getDataFromAPI: function (YTPlayer) {

			YTPlayer.videoData = jQuery.mbStorage.get('YTPlayer_data_' + YTPlayer.videoID)
			if (YTPlayer.videoData) {
				setTimeout(function () {
					YTPlayer.dataReceived = true

					let YTPChanged = jQuery.Event('YTPChanged')
					YTPChanged.time = YTPlayer.currentTime
					YTPChanged.videoId = YTPlayer.videoID
					YTPChanged.opt = YTPlayer.opt
					jQuery(YTPlayer).trigger(YTPChanged)

					let YTPData = jQuery.Event('YTPData')
					YTPData.prop = {}
					for (let x in YTPlayer.videoData)
						YTPData.prop[x] = YTPlayer.videoData[x]
					jQuery(YTPlayer).trigger(YTPData)

				}, YTPlayer.opt.fadeOnStartTime)

				YTPlayer.hasData = true

			} else
				if (jQuery.mbYTPlayer.apiKey) {

					/**
					 * Get video info from API3 (needs api key)
					 * snippet,player,contentDetails,statistics,status
					 */
					jQuery.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + YTPlayer.videoID + '&key=' + jQuery.mbYTPlayer.apiKey + '&part=snippet', function (data) {
						YTPlayer.dataReceived = true

						let YTPChanged = jQuery.Event('YTPChanged')
						YTPChanged.time = YTPlayer.currentTime
						YTPChanged.videoId = YTPlayer.videoID
						jQuery(YTPlayer).trigger(YTPChanged)

						function parseYTPlayer_data(data)
						{
							YTPlayer.videoData = {}
							YTPlayer.videoData.id = YTPlayer.videoID
							YTPlayer.videoData.channelTitle = data.channelTitle
							YTPlayer.videoData.title = data.title
							YTPlayer.videoData.description = data.description.length < 400 ? data.description : data.description.substring(0, 400) + ' ...'
							YTPlayer.videoData.thumb_max = data.thumbnails.maxres ? data.thumbnails.maxres.url : null
							YTPlayer.videoData.thumb_high = data.thumbnails.high ? data.thumbnails.high.url : null
							YTPlayer.videoData.thumb_medium = data.thumbnails.medium ? data.thumbnails.medium.url : null
							jQuery.mbStorage.set('YTPlayer_data_' + YTPlayer.videoID, YTPlayer.videoData)
						}

						if (!data.items[0]) {
							YTPlayer.videoData = {}
							YTPlayer.hasData = false
						} else {
							parseYTPlayer_data(data.items[0].snippet)
							YTPlayer.hasData = true
						}

						let YTPData = jQuery.Event('YTPData')
						YTPData.prop = {}
						for (let x in YTPlayer.videoData) YTPData.prop[x] = YTPlayer.videoData[x]
						jQuery(YTPlayer).trigger(YTPData)
					})

				} else {

					setTimeout(function () {
						let YTPChanged = jQuery.Event('YTPChanged')
						YTPChanged.time = YTPlayer.currentTime
						YTPChanged.videoId = YTPlayer.videoID
						jQuery(YTPlayer).trigger(YTPChanged)
					}, 10)
					YTPlayer.videoData = null

				}

			YTPlayer.opt.ratio = YTPlayer.opt.ratio == 'auto' ? 16 / 9 : YTPlayer.opt.ratio

			if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay) { //&& ( !jQuery.mbBrowser.mobile && !jQuery.isTablet )
				YTPlayer.loading = jQuery('<div/>').addClass('loading').html('Loading').hide()
				jQuery(YTPlayer).append(YTPlayer.loading)
				YTPlayer.loading.fadeIn()
			}
		},

		/**
		 * removeStoredData
		 */
		removeStoredData: function () {
			jQuery.mbStorage.remove()
		},

		/**
		 * getVideoData
		 * @returns {*|YTPlayer.videoData}
		 */
		getVideoData: function () {
			let YTPlayer = this.get(0)
			return YTPlayer.videoData
		},

		/**
		 * getVideoID
		 * @returns {*|YTPlayer.videoID|boolean}
		 */
		getVideoID: function () {
			let YTPlayer = this.get(0)
			return YTPlayer.videoID || false
		},

		/**
		 * getPlaylistID
		 * @returns {*|YTPlayer.videoID|boolean}
		 */
		getPlaylistID  : function () {
			let YTPlayer = this.get(0)
			return YTPlayer.playlistID || false
		},
		/**
		 * setVideoQuality
		 * @param quality
		 * @returns {jQuery.mbYTPlayer}
		 */
		setVideoQuality: function (quality) {
			let YTPlayer = this.get(0)
			jQuery(YTPlayer).YTPPause()
			YTPlayer.opt.quality = quality
			YTPlayer.player.setPlaybackQuality(quality)
			jQuery(YTPlayer).YTPPlay()
			return this
		},

		/**
		 * getVideoQuality
		 * @returns {jQuery.mbYTPlayer}
		 */
		getVideoQuality: function () {
			let YTPlayer = this.get(0)
			let quality = YTPlayer.player.getPlaybackQuality()
			return quality
		},

		/**
		 * playlist
		 * @param videos -> Array or String (videoList ID)
		 * @param shuffle
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 *
		 * To retrieve a Youtube playlist the Youtube API key is required:
		 * https://console.developers.google.com/
		 * jQuery.mbYTPlayer.apiKey
		 */
		playlist: function (videos, shuffle, callback) {

			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			/*
			if (typeof videos == "String" && jQuery.mbYTPlayer.apiKey != "") {
			  function getVideoListFromYoutube(playListID, page) {
				page = page || '';
				let youtubeAPI = "https://www.googleapis.com/youtube/v3/playlistItems";
				jQuery.getJSON(youtubeAPI, {
				  part      : "snippet,contentDetails",
				  playlistId: playListID, //You have to enter the PlaylistID
				  maxResults: 50,
				  pageToken : page,
				  key       : jQuery.mbYTPlayer.apiKey //You have to enter your own YoutubeAPIKey
				}).done(function (response) {
				  CreateVideosArray(response);
				  if (response.nextPageToken) {
					page = response.nextPageToken;
					getVideoListFromYoutube(plID, page, videos);
				  } else {
					$YTPlayer.YTPlaylist(YTPlayer.videos, shuffle, callback)
				  }
				  ;
				});
			  };

			  function CreateVideosArray(response) {
				let k = response.items.length;
				for (let i = 0; i < k; i++) {
				  YTPlayer.videos.push({
					"videoURL": response.items[i].contentDetails.videoId
				  });
				}
				;
			  };

			  getVideoListFromYoutube(videos);
			  return this;
			}
			*/

			YTPlayer.isList = true

			if (shuffle)
				videos = jQuery.shuffle(videos)

			if (!YTPlayer.videoID) {
				YTPlayer.videos = videos
				YTPlayer.videoCounter = 1
				YTPlayer.videoLength = videos.length
				jQuery(YTPlayer).data('property', videos[0])
				jQuery(YTPlayer).YTPlayer()
			}

			if (typeof callback == 'function')
				jQuery(YTPlayer).on('YTPChanged', function () {
					callback(YTPlayer)
				})

			jQuery(YTPlayer).on('YTPEnd', function () {
				jQuery(YTPlayer).YTPPlayNext()
			})
			return this
		},

		/**
		 * playNext
		 * @returns {jQuery.mbYTPlayer}
		 */
		playNext: function () {
			let YTPlayer = this.get(0)
			YTPlayer.videoCounter++
			if (YTPlayer.videoCounter > YTPlayer.videoLength)
				YTPlayer.videoCounter = 1
			jQuery(YTPlayer).YTPPlayIndex(YTPlayer.videoCounter)
			return this
		},

		/**
		 * playPrev
		 * @returns {jQuery.mbYTPlayer}
		 */
		playPrev: function () {
			let YTPlayer = this.get(0)
			YTPlayer.videoCounter--
			if (YTPlayer.videoCounter <= 0)
				YTPlayer.videoCounter = YTPlayer.videoLength
			jQuery(YTPlayer).YTPPlayIndex(YTPlayer.videoCounter)
			return this
		},

		/**
		 * playIndex
		 * @param idx
		 * @returns {jQuery.mbYTPlayer}
		 */
		playIndex: function (idx) {
			let YTPlayer = this.get(0)
			if (YTPlayer.checkForStartAt) {
				clearInterval(YTPlayer.checkForStartAt)
				clearInterval(YTPlayer.getState)
			}
			YTPlayer.videoCounter = idx

			if (YTPlayer.videoCounter >= YTPlayer.videoLength)
				YTPlayer.videoCounter = YTPlayer.videoLength

			let video = YTPlayer.videos[YTPlayer.videoCounter - 1]

			jQuery(YTPlayer).YTPChangeVideo(video)
			return this
		},

		/**
		 * changeVideo
		 * @param opt
		 * @returns {jQuery.mbYTPlayer}
		 */
		changeVideo: function (opt) {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			YTPlayer.opt.startAt = 0
			YTPlayer.opt.stopAt = 0
			YTPlayer.opt.mask = false
			YTPlayer.opt.mute = true
			YTPlayer.opt.autoPlay = true
			YTPlayer.opt.addFilters = false
			YTPlayer.opt.coverImage = false

			YTPlayer.hasData = false
			YTPlayer.hasChanged = true

			YTPlayer.player.loopTime = undefined

			if (opt)
				jQuery.extend(YTPlayer.opt, opt)

			YTPlayer.videoID = getYTPVideoID(YTPlayer.opt.videoURL).videoID

			if (YTPlayer.opt.loop && typeof YTPlayer.opt.loop == 'boolean')
				YTPlayer.opt.loop = 9999

			YTPlayer.wrapper.css({
				background: 'none'
			})

			jQuery(YTPlayer.playerEl).CSSAnimate({
				opacity: 0
			}, YTPlayer.opt.fadeOnStartTime, function () {

				jQuery.mbYTPlayer.getDataFromAPI(YTPlayer)

				$YTPlayer.YTPGetPlayer().loadVideoById({
					videoId         : YTPlayer.videoID,
					// startSeconds: YTPlayer.opt.startAt,
					// endSeconds: YTPlayer.opt.stopAt,
					suggestedQuality: YTPlayer.opt.quality
				})
				$YTPlayer.YTPPause()
				$YTPlayer.optimizeDisplay()

				$YTPlayer.YTPCheckForState()
			})

			let YTPChangeVideo = jQuery.Event('YTPChangeVideo')
			YTPChangeVideo.time = YTPlayer.currentTime
			jQuery(YTPlayer).trigger(YTPChangeVideo)

			jQuery.mbYTPlayer.applyMask(YTPlayer)

			return this
		},

		/**
		 * getPlayer
		 * @returns {player}
		 */
		getPlayer: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return null

			return YTPlayer.player || null
		},

		/**
		 * playerDestroy
		 * @returns {jQuery.mbYTPlayer}
		 */
		playerDestroy: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			ytp.YTAPIReady = true
			ytp.backgroundIsInited = false
			YTPlayer.isInit = false
			YTPlayer.videoID = null
			YTPlayer.isReady = false
			YTPlayer.wrapper.remove()
			jQuery('#controlBar_' + YTPlayer.id).remove()
			clearInterval(YTPlayer.checkForStartAt)
			clearInterval(YTPlayer.getState)
			return this
		},

		/**
		 * fullscreen
		 * @param real
		 * @returns {jQuery.mbYTPlayer}
		 */
		fullscreen: function (real) {
			let YTPlayer = this.get(0)

			if (typeof real == 'undefined')
				real = eval(YTPlayer.opt.realFullscreen)

			let controls = jQuery('#controlBar_' + YTPlayer.id)
			let fullScreenBtn = controls.find('.mb_OnlyYT')
			let videoWrapper = YTPlayer.isPlayer ? YTPlayer.opt.containment : YTPlayer.wrapper

			if (real) {
				let fullscreenchange = jQuery.mbBrowser.mozilla ? 'mozfullscreenchange' : jQuery.mbBrowser.webkit ? 'webkitfullscreenchange' : 'fullscreenchange'
				jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
					let isFullScreen = RunPrefixMethod(document, 'IsFullScreen') || RunPrefixMethod(document, 'FullScreen')
					if (!isFullScreen) {
						YTPlayer.isAlone = false
						fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT)
						jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality)
						videoWrapper.removeClass('YTPFullscreen')
						videoWrapper.CSSAnimate({
							opacity: YTPlayer.opt.opacity
						}, YTPlayer.opt.fadeOnStartTime)

						videoWrapper.css({
							zIndex: 0
						})

						if (YTPlayer.isBackground) {
							jQuery('body').after(controls)
						} else {
							YTPlayer.wrapper.before(controls)
						}
						jQuery(window).resize()
						jQuery(YTPlayer).trigger('YTPFullScreenEnd')

					} else {

						jQuery(YTPlayer).YTPSetVideoQuality('default')
						jQuery(YTPlayer).trigger('YTPFullScreenStart')

					}
				})
			}
			if (!YTPlayer.isAlone) {
				function hideMouse()
				{
					YTPlayer.overlay.css({
						cursor: 'none'
					})
				}

				jQuery(document).on('mousemove.YTPlayer', function (e) {
					YTPlayer.overlay.css({
						cursor: 'auto'
					})
					clearTimeout(YTPlayer.hideCursor)
					if (!jQuery(e.target).parents().is('.mb_YTPBar'))
						YTPlayer.hideCursor = setTimeout(hideMouse, 3000)
				})

				hideMouse()

				if (real) {
					videoWrapper.css({
						opacity: 0
					})
					videoWrapper.addClass('YTPFullscreen')
					launchFullscreen(videoWrapper.get(0))

					setTimeout(function () {
						videoWrapper.CSSAnimate({
							opacity: 1
						}, YTPlayer.opt.fadeOnStartTime * 2)

						videoWrapper.append(controls)
						jQuery(YTPlayer).optimizeDisplay()
						YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, true)

					}, YTPlayer.opt.fadeOnStartTime)
				} else
					videoWrapper.css({
						zIndex: 10000
					}).CSSAnimate({
						opacity: 1
					}, YTPlayer.opt.fadeOnStartTime * 2)
				fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite)
				YTPlayer.isAlone = true
			} else {
				jQuery(document).off('mousemove.YTPlayer')
				clearTimeout(YTPlayer.hideCursor)
				YTPlayer.overlay.css({
					cursor: 'auto'
				})
				if (real) {
					cancelFullscreen()
				} else {
					videoWrapper.CSSAnimate({
						opacity: YTPlayer.opt.opacity
					}, YTPlayer.opt.fadeOnStartTime)
					videoWrapper.css({
						zIndex: 0
					})
				}
				fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT)
				YTPlayer.isAlone = false
			}

			function RunPrefixMethod(obj, method)
			{
				let pfx = ['webkit', 'moz', 'ms', 'o', '']
				let p = 0,
				  m, t
				while (p < pfx.length && !obj[m]) {
					m = method
					if (pfx[p] == '') {
						m = m.substr(0, 1).toLowerCase() + m.substr(1)
					}
					m = pfx[p] + m
					t = typeof obj[m]
					if (t != 'undefined') {
						pfx = [pfx[p]]
						return (t == 'function' ? obj[m]() : obj[m])
					}
					p++
				}
			}

			function launchFullscreen(element)
			{
				RunPrefixMethod(element, 'RequestFullScreen')
			}

			function cancelFullscreen()
			{
				if (RunPrefixMethod(document, 'FullScreen') || RunPrefixMethod(document, 'IsFullScreen')) {
					RunPrefixMethod(document, 'CancelFullScreen')
				}
			}

			return this
		},

		/**
		 * toggleLoops
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleLoops: function () {
			let YTPlayer = this.get(0)
			let data = YTPlayer.opt
			if (data.loop == 1) {
				data.loop = 0
			} else {
				if (data.startAt) {
					YTPlayer.player.seekTo(data.startAt)
				} else {
				YTPlayer.player.unMute()
					YTPlayer.player.playVideo()
				}
				data.loop = 1
			}
			return this
		},

		/**
		 * play
		 * @returns {jQuery.mbYTPlayer}
		 */
		play: function () {
			let YTPlayer = this.get(0)
			let $YTPlayer = jQuery(YTPlayer)

			if (!YTPlayer.isReady)
				return this

			setTimeout(function () {
				$YTPlayer.YTPSetAbundance(YTPlayer.opt.abundance)
			}, 300)

			YTPlayer.player.unMute()
			YTPlayer.player.playVideo()

			jQuery(YTPlayer.playerEl).css({
				opacity: 1
			})

			YTPlayer.wrapper.css({
				backgroundImage: 'none'
			})

			YTPlayer.wrapper.CSSAnimate({
				opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
			}, YTPlayer.opt.fadeOnStartTime)

			let controls = jQuery('#controlBar_' + YTPlayer.id)
			let playBtn = controls.find('.mb_YTPPlayPause')
			playBtn.html(jQuery.mbYTPlayer.controls.pause)
			YTPlayer.state = 1

			return this
		},

		/**
		 * togglePlay
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		togglePlay: function (callback) {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			if (YTPlayer.state == 1)
				this.YTPPause()
			else
				this.YTPPlay()

			if (typeof callback == 'function')
				callback(YTPlayer.state)

			return this
		},

		/**
		 * stop
		 * @returns {jQuery.mbYTPlayer}
		 */
		stop: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			let controls = jQuery('#controlBar_' + YTPlayer.id)
			let playBtn = controls.find('.mb_YTPPlayPause')
			playBtn.html(jQuery.mbYTPlayer.controls.play)
			YTPlayer.player.stopVideo()
			return this
		},

		/**
		 * pause
		 * @returns {jQuery.mbYTPlayer}
		 */
		pause: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			if (YTPlayer.opt.abundance < .2)
				this.YTPSetAbundance(.2)

			YTPlayer.player.pauseVideo()
			YTPlayer.state = 2
			return this
		},

		/**
		 * seekTo
		 * @param sec
		 * @returns {jQuery.mbYTPlayer}
		 */
		seekTo: function (sec) {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			YTPlayer.player.seekTo(sec, true)
			return this
		},

		/**
		 * setVolume
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		setVolume: function (val) {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			YTPlayer.opt.vol = val
			this.YTPUnmute()
			YTPlayer.player.setVolume(YTPlayer.opt.vol)

			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
				YTPlayer.volumeBar.updateSliderVal(val)

			return this
		},
		/**
		 * getVolume
		 * @returns {*}
		 */
		getVolume: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			return YTPlayer.player.getVolume()
		},

		/**
		 * toggleVolume
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleVolume: function () {

			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			if (YTPlayer.isMute) {
				if (!jQuery.mbBrowser.mobile)
					this.YTPSetVolume(YTPlayer.opt.vol)
				this.YTPUnmute()
			} else {
				this.YTPMute()
			}
			return this
		},

		/**
		 * mute
		 * @returns {jQuery.mbYTPlayer}
		 */
		mute: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			if (YTPlayer.isMute)
				return this
			YTPlayer.player.mute()
			YTPlayer.isMute = true
			YTPlayer.player.setVolume(0)
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length && YTPlayer.volumeBar.width() > 10) {
				YTPlayer.volumeBar.updateSliderVal(0)
			}
			let controls = jQuery('#controlBar_' + YTPlayer.id)
			let muteBtn = controls.find('.mb_YTPMuteUnmute')
			muteBtn.html(jQuery.mbYTPlayer.controls.unmute)
			jQuery(YTPlayer).addClass('isMuted')
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length) YTPlayer.volumeBar.addClass('muted')
			let YTPEvent = jQuery.Event('YTPMuted')
			YTPEvent.time = YTPlayer.currentTime

			if (!YTPlayer.preventTrigger)
				jQuery(YTPlayer).trigger(YTPEvent)

			return this
		},

		/**
		 * unmute
		 * @returns {jQuery.mbYTPlayer}
		 */
		unmute: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			// console.debug("unmute::", YTPlayer.isMute,"Vol::", YTPlayer.opt.vol)

			if (!YTPlayer.isMute)
				return this

			YTPlayer.player.unMute()
			YTPlayer.isMute = false
			jQuery(YTPlayer).YTPSetVolume(YTPlayer.opt.vol)
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
				YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol > 10 ? YTPlayer.opt.vol : 10)
			let controls = jQuery('#controlBar_' + YTPlayer.id)
			let muteBtn = controls.find('.mb_YTPMuteUnmute')
			muteBtn.html(jQuery.mbYTPlayer.controls.mute)
			jQuery(YTPlayer).removeClass('isMuted')
			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
				YTPlayer.volumeBar.removeClass('muted')
			let YTPEvent = jQuery.Event('YTPUnmuted')
			YTPEvent.time = YTPlayer.currentTime

			if (!YTPlayer.preventTrigger)
				jQuery(YTPlayer).trigger(YTPEvent)

			return this
		},

		/* FILTERS ---------------------------------------------------------------------------------------------------------*/

		/**
		 * applyFilter
		 * @param filter
		 * @param value
		 * @returns {jQuery.mbYTPlayer}
		 */
		applyFilter: function (filter, value) {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			if (!YTPlayer.isReady)
				return this

			YTPlayer.filters[filter].value = value
			if (YTPlayer.filtersEnabled)
				$YTPlayer.YTPEnableFilters()
		},

		/**
		 * applyFilters
		 * @param filters
		 * @returns {jQuery.mbYTPlayer}
		 */
		applyFilters: function (filters) {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			if (!YTPlayer.isReady) {
				jQuery(YTPlayer).on('YTPReady', function () {
					$YTPlayer.YTPApplyFilters(filters)
				})
				return this
			}

			for (let key in filters) {
				$YTPlayer.YTPApplyFilter(key, filters[key])
			}

			$YTPlayer.trigger('YTPFiltersApplied')
		},

		/**
		 * toggleFilter
		 * @param filter
		 * @param value
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleFilter: function (filter, value) {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			if (!YTPlayer.isReady)
				return this

			if (!YTPlayer.filters[filter].value)
				YTPlayer.filters[filter].value = value
			else
				YTPlayer.filters[filter].value = 0

			if (YTPlayer.filtersEnabled)
				jQuery(YTPlayer).YTPEnableFilters()

			return this
		},

		/**
		 * toggleFilters
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleFilters: function (callback) {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			if (!YTPlayer.isReady)
				return this

			if (YTPlayer.filtersEnabled) {
				jQuery(YTPlayer).trigger('YTPDisableFilters')
				jQuery(YTPlayer).YTPDisableFilters()
			} else {
				jQuery(YTPlayer).YTPEnableFilters()
				jQuery(YTPlayer).trigger('YTPEnableFilters')
			}
			if (typeof callback == 'function')
				callback(YTPlayer.filtersEnabled)

			return this
		},

		/**
		 * disableFilters
		 * @returns {jQuery.mbYTPlayer}
		 */
		disableFilters: function () {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			if (!YTPlayer.isReady)
				return this

			let iframe = jQuery(YTPlayer.playerEl)
			iframe.css('-webkit-filter', '')
			iframe.css('filter', '')
			YTPlayer.filtersEnabled = false

			return this
		},

		/**
		 * enableFilters
		 * @returns {jQuery.mbYTPlayer}
		 */
		enableFilters: function () {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			if (!YTPlayer.isReady)
				return this

			let iframe = jQuery(YTPlayer.playerEl)
			let filterStyle = ''
			for (let key in YTPlayer.filters) {
				if (YTPlayer.filters[key].value)
					filterStyle += key.replace('_', '-') + '(' + YTPlayer.filters[key].value + YTPlayer.filters[key].unit + ') '
			}
			iframe.css('-webkit-filter', filterStyle)
			iframe.css('filter', filterStyle)
			YTPlayer.filtersEnabled = true

			return this
		},

		/**
		 * removeFilter
		 * @param filter
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		removeFilter: function (filter, callback) {
			let $YTPlayer = this
			let YTPlayer = $YTPlayer.get(0)

			if (!YTPlayer.isReady)
				return this

			if (typeof filter == 'function') {
				callback = filter
				filter = null
			}

			if (!filter) {
				for (let key in YTPlayer.filters) {
					$YTPlayer.YTPApplyFilter(key, 0)
				}

				if (typeof callback == 'function')
					callback(key)

				YTPlayer.filters = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaultFilters)

			} else {
				$YTPlayer.YTPApplyFilter(filter, 0)
				if (typeof callback == 'function') callback(filter)
			}

			let YTPEvent = jQuery.Event('YTPFiltersApplied')
			$YTPlayer.trigger(YTPEvent)

			return this
		},

		/**
		 * getFilters
		 * @returns {filters}
		 */
		getFilters: function () {
			let YTPlayer = this.get(0)

			if (!YTPlayer.isReady)
				return this

			return YTPlayer.filters
		},

		/* MASK ---------------------------------------------------------------------------------------------------------*/

		/**
		 * addMask
		 * @param mask
		 * @returns {jQuery.mbYTPlayer}
		 */
		addMask: function (mask) {
			let YTPlayer = this.get(0)

			/*
				  if (!YTPlayer.isReady)
					return this;
			*/

			if (!mask)
				mask = YTPlayer.actualMask

			let tempImg = jQuery('<img/>').attr('src', mask).on('load', function () {
				YTPlayer.overlay.CSSAnimate({
					opacity: 0
				}, YTPlayer.opt.fadeOnStartTime, function () {
					YTPlayer.hasMask = true
					tempImg.remove()
					YTPlayer.overlay.css({
						backgroundImage   : 'url(' + mask + ')',
						backgroundRepeat  : 'no-repeat',
						backgroundPosition: 'center center',
						backgroundSize    : 'cover'
					})
					YTPlayer.overlay.CSSAnimate({
						opacity: 1
					}, YTPlayer.opt.fadeOnStartTime)
				})
			})

			return this
		},

		/**
		 * removeMask
		 * @returns {jQuery.mbYTPlayer}
		 */
		removeMask: function () {
			let YTPlayer = this.get(0)

			/*
				  if (!YTPlayer.isReady)
					return this;
			*/

			YTPlayer.overlay.CSSAnimate({
				opacity: 0
			}, YTPlayer.opt.fadeOnStartTime, function () {
				YTPlayer.hasMask = false
				YTPlayer.overlay.css({
					backgroundImage   : '',
					backgroundRepeat  : '',
					backgroundPosition: '',
					backgroundSize    : ''
				})
				YTPlayer.overlay.CSSAnimate({
					opacity: 1
				}, YTPlayer.opt.fadeOnStartTime)
			})

			return this
		},

		/**
		 * Apply mask
		 * @param YTPlayer
		 */
		applyMask: function (YTPlayer) {
			let $YTPlayer = jQuery(YTPlayer)

			/*
				  if (!YTPlayer.isReady)
					return this;
			*/

			$YTPlayer.off('YTPTime.mask')

			if (YTPlayer.opt.mask) {
				if (typeof YTPlayer.opt.mask == 'string') {

					$YTPlayer.YTPAddMask(YTPlayer.opt.mask)
					YTPlayer.actualMask = YTPlayer.opt.mask

				} else
					if (typeof YTPlayer.opt.mask == 'object') {

						console.debug(YTPlayer.opt.mask)

						for (let time in YTPlayer.opt.mask) {

							if (YTPlayer.opt.mask[time])
								img = jQuery('<img/>').attr('src', YTPlayer.opt.mask[time])

						}

						if (YTPlayer.opt.mask[0])
							$YTPlayer.YTPAddMask(YTPlayer.opt.mask[0])

						$YTPlayer.on('YTPTime.mask', function (e) {

							for (let time in YTPlayer.opt.mask) {
								if (e.time == time)
									if (!YTPlayer.opt.mask[time]) {
										$YTPlayer.YTPRemoveMask()
									} else {
										$YTPlayer.YTPAddMask(YTPlayer.opt.mask[time])
										YTPlayer.actualMask = YTPlayer.opt.mask[time]
									}
							}
						})
					}
			}
		},

		/**
		 * toggleMask
		 * @returns {jQuery.mbYTPlayer}
		 */
		toggleMask: function () {
			let YTPlayer = this.get(0)

			/*
				  if (!YTPlayer.isReady)
					return this;
			*/

			let $YTPlayer = jQuery(YTPlayer)
			if (YTPlayer.hasMask)
				$YTPlayer.YTPRemoveMask()
			else
				$YTPlayer.YTPAddMask()
			return this
		},

		/* CONTROLS --------------------------------------------------------------------------------------------------------*/

		/**
		 * manageProgress
		 * @returns {{totalTime: number, currentTime: number}}
		 */
		manageProgress: function () {
			let YTPlayer = this.get(0)
			let controls = jQuery('#controlBar_' + YTPlayer.id)
			let progressBar = controls.find('.mb_YTPProgress')
			let loadedBar = controls.find('.mb_YTPLoaded')
			let timeBar = controls.find('.mb_YTPseekbar')
			let totW = progressBar.outerWidth()
			let currentTime = Math.floor(YTPlayer.player.getCurrentTime())
			let totalTime = Math.floor(YTPlayer.player.getDuration())
			let timeW = (currentTime * totW) / totalTime
			let startLeft = 0
			let loadedW = YTPlayer.player.getVideoLoadedFraction() * 100
			loadedBar.css({
				left : startLeft,
				width: loadedW + '%'
			})
			timeBar.css({
				left : 0,
				width: timeW
			})
			return {
				totalTime  : totalTime,
				currentTime: currentTime
			}
		},

		/**
		 * buildControls
		 * @param YTPlayer
		 */
		buildControls: function (YTPlayer) {

			jQuery('#controlBar_' + YTPlayer.id).remove()
			if (!YTPlayer.opt.showControls) {
				YTPlayer.controlBar = false
				return
			}

			// @YTPlayer.opt.printUrl: is deprecated; use YTPlayer.opt.showYTLogo
			YTPlayer.opt.showYTLogo = YTPlayer.opt.showYTLogo || YTPlayer.opt.printUrl
			if (jQuery('#controlBar_' + YTPlayer.id).length)
				return
			YTPlayer.controlBar = jQuery('<div/>').attr('id', 'controlBar_' + YTPlayer.id).addClass('mb_YTPBar').css({
				whiteSpace: 'noWrap',
				position  : YTPlayer.isBackground ? 'fixed' : 'absolute',
				zIndex    : YTPlayer.isBackground ? 10000 : 1000
			}).hide().on('click', function (e) {
				e.stopPropagation()
			})
			let buttonBar = jQuery('<div/>').addClass('buttonBar')
			/**
			 *  play/pause button
			 * */
			let playpause = jQuery('<span>' + jQuery.mbYTPlayer.controls.play + '</span>').addClass('mb_YTPPlayPause ytpicon').on('click', function (e) {
				e.stopPropagation()
                jQuery(YTPlayer).YTPTogglePlay()
                 
			})
			/**
			 *  mute/unmute button
			 * */
			let MuteUnmute = jQuery('<span>' + jQuery.mbYTPlayer.controls.mute + '</span>').addClass('mb_YTPMuteUnmute ytpicon').on('click', function (e) {
				e.stopPropagation()
				jQuery(YTPlayer).YTPToggleVolume()
			})
			/**
			 *  volume bar
			 * */
			let volumeBar = jQuery('<div/>').addClass('mb_YTPVolumeBar').css({
				display: 'inline-block'
			})
			YTPlayer.volumeBar = volumeBar

			/**
			 * time elapsed
			 * */
			let idx = jQuery('<span/>').addClass('mb_YTPTime')
			let vURL = YTPlayer.opt.videoURL ? YTPlayer.opt.videoURL : ''
			if (vURL.indexOf('http') < 0) vURL = 'https://www.youtube.com/watch?v=' + YTPlayer.opt.videoURL
			let movieUrl = jQuery('<span/>').html(jQuery.mbYTPlayer.controls.ytLogo).addClass('mb_YTPUrl ytpicon').attr('title', 'view on YouTube').on('click', function () {
				window.open(vURL, 'viewOnYT')
			})
			let onlyVideo = jQuery('<span/>').html(jQuery.mbYTPlayer.controls.onlyYT).addClass('mb_OnlyYT ytpicon').on('click', function (e) {
				e.stopPropagation()
				jQuery(YTPlayer).YTPFullscreen(YTPlayer.opt.realFullscreen)
			})
			let progressBar = jQuery('<div/>').addClass('mb_YTPProgress').css('position', 'absolute').on('click', function (e) {
				e.stopPropagation()
				timeBar.css({
					width: (e.clientX - timeBar.offset().left)
				})
				YTPlayer.timeW = e.clientX - timeBar.offset().left
				YTPlayer.controlBar.find('.mb_YTPLoaded').css({
					width: 0
				})
				let totalTime = Math.floor(YTPlayer.player.getDuration())
				YTPlayer.goto = (timeBar.outerWidth() * totalTime) / progressBar.outerWidth()
				YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), true)
				YTPlayer.controlBar.find('.mb_YTPLoaded').css({
					width: 0
				})
			})
			let loadedBar = jQuery('<div/>').addClass('mb_YTPLoaded').css('position', 'absolute')
			let timeBar = jQuery('<div/>').addClass('mb_YTPseekbar').css('position', 'absolute')
			progressBar.append(loadedBar).append(timeBar)
			buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx)

			if (YTPlayer.opt.showYTLogo) {
				buttonBar.append(movieUrl)
			}

			/**
			 * Full screen button
			 */
			if (YTPlayer.isBackground || (eval(YTPlayer.opt.realFullscreen) && !YTPlayer.isBackground))
				buttonBar.append(onlyVideo)

			YTPlayer.controlBar.append(buttonBar).append(progressBar)

			if (!YTPlayer.isBackground) {
				YTPlayer.controlBar.addClass('inlinePlayer')
				YTPlayer.wrapper.before(YTPlayer.controlBar)
			} else {
				jQuery('body').after(YTPlayer.controlBar)
			}

			/**
			 * Volume slider
			 */
			volumeBar.simpleSlider({
				initialval : YTPlayer.opt.vol,
				scale      : 100,
				orientation: 'h',
				callback   : function (el) {

					if (el.value == 0) {
						jQuery(YTPlayer).YTPMute()
					} else {
						jQuery(YTPlayer).YTPUnmute()
					}
					YTPlayer.player.setVolume(el.value)
					if (!YTPlayer.isMute)
						YTPlayer.opt.vol = el.value

					// console.debug(jQuery(YTPlayer).YTPGetVolume())
				}

			})
		},

		/* MANAGE PLAYER STATE ------------------------------------------------------------------------------------------*/

		/**
		 * checkForState
		 */
		checkForState: function () {
			let YTPlayer = this.get(0)
			let $YTPlayer = jQuery(YTPlayer)

			clearInterval(YTPlayer.getState)
			let interval = 100
			//Checking if player has been removed from the scene
			if (!jQuery.contains(document, YTPlayer)) {
				$YTPlayer.YTPPlayerDestroy()
				clearInterval(YTPlayer.getState)
				clearInterval(YTPlayer.checkForStartAt)
				return
			}

			jQuery.mbYTPlayer.checkForStart(YTPlayer)

			YTPlayer.getState = setInterval(function () {
				let $YTPlayer = jQuery(YTPlayer)

				if (!YTPlayer.isReady)
					return

				let prog = jQuery(YTPlayer).YTPManageProgress()

				let stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0
				stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0

				if (YTPlayer.currentTime != prog.currentTime) {
					let YTPEvent = jQuery.Event('YTPTime')
					YTPEvent.time = YTPlayer.currentTime
					jQuery(YTPlayer).trigger(YTPEvent)
				}

				YTPlayer.currentTime = prog.currentTime
				YTPlayer.totalTime = YTPlayer.player.getDuration()
				if (YTPlayer.player.getVolume() == 0) $YTPlayer.addClass('isMuted')
				else $YTPlayer.removeClass('isMuted')

				if (YTPlayer.opt.showControls)
					if (prog.totalTime) {
						YTPlayer.controlBar.find('.mb_YTPTime').html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + ' / ' + jQuery.mbYTPlayer.formatTime(prog.totalTime))
					} else {
						YTPlayer.controlBar.find('.mb_YTPTime').html('-- : -- / -- : --')
					}

				/**
				 * Manage video pause on window blur
				 */
				if (eval(YTPlayer.opt.stopMovieOnBlur)) {
					if (!document.hasFocus()) {
						if (YTPlayer.state == 1) {
							YTPlayer.hasFocus = false
							YTPlayer.preventTrigger = true
							$YTPlayer.YTPPause()
						}
					} else
						if (document.hasFocus() && !YTPlayer.hasFocus && !(YTPlayer.state == -1 || YTPlayer.state == 0)) {
							YTPlayer.hasFocus = true
							YTPlayer.preventTrigger = true
							$YTPlayer.YTPPlay()
						}
				}

				/**
				 * Manage video pause if not on screen
				 */
				if (YTPlayer.opt.playOnlyIfVisible) {
					let isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage)
					if (!isOnScreen && YTPlayer.state == 1) {
						YTPlayer.isOnScreen = false
						$YTPlayer.YTPPause()
					} else
						if (isOnScreen && !YTPlayer.isOnScreen) {
							YTPlayer.isOnScreen = true
							YTPlayer.player.unMute()
							YTPlayer.player.playVideo()
						}
				}

				if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact) {
					YTPlayer.controlBar.addClass('compact')
					YTPlayer.isCompact = true
					if (!YTPlayer.isMute && YTPlayer.volumeBar) YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)
				} else
					if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact) {
						YTPlayer.controlBar.removeClass('compact')
						YTPlayer.isCompact = false

						if (!YTPlayer.isMute && YTPlayer.volumeBar)
							YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)
					}
				// the video is ended
				if (YTPlayer.player.getPlayerState() > 0 && ((parseFloat(YTPlayer.player.getDuration() - (YTPlayer.opt.fadeOnStartTime / 1000)) < YTPlayer.player.getCurrentTime()) || (stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) >= stopAt))) {

					if (YTPlayer.isEnded)
						return

					YTPlayer.isEnded = true

					setTimeout(function () {
						YTPlayer.isEnded = false
					}, 1000)

					if (YTPlayer.isList) {
						if (!YTPlayer.opt.loop || (YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1)) {
							YTPlayer.player.loopTime = undefined
							clearInterval(YTPlayer.getState)
							let YTPEnd = jQuery.Event('YTPEnd')
							YTPEnd.time = YTPlayer.currentTime
							jQuery(YTPlayer).trigger(YTPEnd)
							return
						}
					} else
						if (!YTPlayer.opt.loop || (YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1)) {
							YTPlayer.player.loopTime = undefined

							YTPlayer.state = 2

							if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
								let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
								if (bgndURL)
									YTPlayer.opt.containment.css({
										background      : bgndURL,
										backgroundSize  : 'cover',
										backgroundRepeat: 'no-repeat'
									})
							}

							jQuery(YTPlayer).YTPPause()
							YTPlayer.wrapper.CSSAnimate({
								opacity: 0
							}, YTPlayer.opt.fadeOnStartTime, function () {

								if (YTPlayer.controlBar.length)
									YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)

								let YTPEnd = jQuery.Event('YTPEnd')
								YTPEnd.time = YTPlayer.currentTime
								jQuery(YTPlayer).trigger(YTPEnd)
								YTPlayer.player.seekTo(YTPlayer.opt.startAt, true)

								if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
									let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
									if (bgndURL)
										YTPlayer.opt.containment.css({
											background      : bgndURL,
											backgroundSize  : 'cover',
											backgroundRepeat: 'no-repeat'
										})
								}

							})
							return
						}

					YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1
					YTPlayer.opt.startAt = YTPlayer.opt.startAt || 1
					YTPlayer.preventTrigger = true
					YTPlayer.state = 2
					//YTPlayer.player.pauseVideo();
					YTPlayer.player.seekTo(YTPlayer.opt.startAt, true)
					YTPlayer.player.unMute()
					//YTPlayer.player.playVideo();
				}
			}, interval)
		},

		/**
		 * checkForStart
		 * @param YTPlayer
		 */
		checkForStart: function (YTPlayer) {
			let $YTPlayer = jQuery(YTPlayer)

			/* If the player has been removed from scene destroy it */
			if (!jQuery.contains(document, YTPlayer)) {
				$YTPlayer.YTPPlayerDestroy()
				return
			}

			/* CREATE CONTROL BAR */
			jQuery.mbYTPlayer.buildControls(YTPlayer)

			if (YTPlayer.overlay)
				if (YTPlayer.opt.addRaster) {
					let classN = YTPlayer.opt.addRaster == 'dot' ? 'raster-dot' : 'raster'
					YTPlayer.overlay.addClass(YTPlayer.isRetina ? classN + ' retina' : classN)
				} else {
					YTPlayer.overlay.removeClass(function (index, classNames) {
						// change the list into an array
						let current_classes = classNames.split(' '),
						  // array of classes which are to be removed
						  classes_to_remove = []
						jQuery.each(current_classes, function (index, class_name) {
							// if the classname begins with bg add it to the classes_to_remove array
							if (/raster.*/.test(class_name)) {
								classes_to_remove.push(class_name)
							}
						})
						classes_to_remove.push('retina')
						// turn the array back into a string
						return classes_to_remove.join(' ')
					})
				}

			YTPlayer.preventTrigger = true
			YTPlayer.state = 2
			YTPlayer.preventTrigger = true

			////YTPlayer.player.mute()
			YTPlayer.player.unMute()
			YTPlayer.player.playVideo()
			YTPlayer.isStarting = true

			let startAt = YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1

			YTPlayer.preventTrigger = true
			YTPlayer.checkForStartAt = setInterval(function () {

				YTPlayer.player.mute()
				YTPlayer.player.seekTo(startAt, true)

				let canPlayVideo = YTPlayer.player.getVideoLoadedFraction() >= startAt / YTPlayer.player.getDuration()
				if (YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo) {
					YTPlayer.start_from_last = null

					YTPlayer.preventTrigger = true
					$YTPlayer.YTPPause()

					clearInterval(YTPlayer.checkForStartAt)

					if (typeof YTPlayer.opt.onReady == 'function')
						YTPlayer.opt.onReady(YTPlayer)

					YTPlayer.isReady = true

					$YTPlayer.YTPRemoveFilter()

					if (YTPlayer.opt.addFilters) {
						$YTPlayer.YTPApplyFilters(YTPlayer.opt.addFilters)
					} else {
						$YTPlayer.YTPApplyFilters()
					}
					$YTPlayer.YTPEnableFilters()
					let YTPready = jQuery.Event('YTPReady')
					YTPready.time = YTPlayer.currentTime
					$YTPlayer.trigger(YTPready)

					YTPlayer.state = 2

					if (!YTPlayer.opt.mute) {

						if (YTPlayer.opt.autoPlay) {
							console.debug('To make the video \'auto-play\' you must mute the audio according with the latest vendor policy')
							YTPlayer.player.mute()
						}

						YTPlayer.player.unMute()

					} else {
						$YTPlayer.YTPMute()
					}

					if (typeof _gaq != 'undefined' && eval(YTPlayer.opt.gaTrack))
						_gaq.push(['_trackEvent', 'YTPlayer', 'Play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString())])
					else
						if (typeof ga != 'undefined' && eval(YTPlayer.opt.gaTrack))
							ga('send', 'event', 'YTPlayer', 'play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()))

					if (YTPlayer.opt.autoPlay) {

						let YTPStart = jQuery.Event('YTPStart')
						YTPStart.time = YTPlayer.currentTime
						jQuery(YTPlayer).trigger(YTPStart)

						YTPlayer.isStarting = false

						/* Fix for Safari freeze */
						if (jQuery.mbBrowser.os.name == 'mac' && jQuery.mbBrowser.safari) {
							jQuery('body').one('mousedown.YTPstart', function () {
								$YTPlayer.YTPPlay()
							})
						}
						$YTPlayer.YTPPlay()

						console.timeEnd('YTPlayerStartPlay')


					} else {

						YTPlayer.preventTrigger = true
						$YTPlayer.YTPPause()

						if (YTPlayer.start_from_last)
							YTPlayer.player.seekTo(startAt, true)

						setTimeout(function () {
							YTPlayer.preventTrigger = true
							$YTPlayer.YTPPause()

							if (!YTPlayer.isPlayer) {
								if (!YTPlayer.opt.coverImage) {
									jQuery(YTPlayer.playerEl).CSSAnimate({
										opacity: 1
									}, YTPlayer.opt.fadeOnStartTime)
									YTPlayer.wrapper.CSSAnimate({
										opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
									}, YTPlayer.opt.fadeOnStartTime)
								} else {
									YTPlayer.wrapper.css({ opacity: 0 })
									setTimeout(function () {
										if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
											let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
											if (bgndURL)
												YTPlayer.wrapper.css({
													background      : bgndURL,
													backgroundSize  : 'cover',
													backgroundRepeat: 'no-repeat'
												})
										}
									}, YTPlayer.opt.fadeOnStartTime)
								}
							}
							YTPlayer.isStarting = false
						}, 500)

						if (YTPlayer.controlBar.length)
							YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)
					}

					if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay && (YTPlayer.loading && YTPlayer.loading.length)) {
						YTPlayer.loading.html('Ready')
						setTimeout(function () {
							YTPlayer.loading.fadeOut()
						}, 100)
					}

					if (YTPlayer.controlBar && YTPlayer.controlBar.length)
						YTPlayer.controlBar.slideDown(1000)
				}

				if (jQuery.mbBrowser.os.name == 'mac' && jQuery.mbBrowser.safari) {
				YTPlayer.player.unMute()
					YTPlayer.player.playVideo()
					if (startAt >= 0)
						YTPlayer.player.seekTo(startAt, true)
				}

			}, 100)

			return $YTPlayer
		},

		/* TIME METHODS -------------------------------------------------------------------------------------------*/

		/**
		 * getTime
		 * @returns {string} time
		 */
		getTime: function () {
			let YTPlayer = this.get(0)
			return jQuery.mbYTPlayer.formatTime(YTPlayer.currentTime)
		},

		/**
		 * getTotalTime
		 * @returns {string} total time
		 */
		getTotalTime: function (format) {
			let YTPlayer = this.get(0)
			return jQuery.mbYTPlayer.formatTime(YTPlayer.totalTime)
		},

		/**
		 * formatTime
		 * @param s
		 * @returns {string}
		 */
		formatTime: function (s) {
			let min = Math.floor(s / 60)
			let sec = Math.floor(s - (60 * min))
			return (min <= 9 ? '0' + min : min) + ' : ' + (sec <= 9 ? '0' + sec : sec)
		},

		/* PLAYER POSITION AND SIZE OPTIMIZATION-------------------------------------------------------------------------------------------*/

		/**
		 * setAnchor
		 * @param anchor
		 */
		setAnchor: function (anchor) {
			let $YTplayer = this
			$YTplayer.optimizeDisplay(anchor)
		},

		/**
		 * getAnchor
		 * @param anchor
		 */
		getAnchor: function () {
			let YTPlayer = this.get(0)
			return YTPlayer.opt.anchor
		},

		/**
		 * setAbundance
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		setAbundance: function (val, updateOptions) {
			let YTPlayer = this.get(0)
			let $YTPlayer = this
			if (updateOptions)
				YTPlayer.opt.abundance = val
			$YTPlayer.optimizeDisplay(YTPlayer.opt.anchor, val)
			return $YTPlayer
		},

		/**
		 * getAbundance
		 * @returns {*}
		 */
		getAbundance: function () {
			let YTPlayer = this.get(0)
			return YTPlayer.opt.abundance
		},

		/**
		 *
		 * @param opt
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		setOption: function (opt, val) {
			let YTPlayer = this.get(0)
			let $YTPlayer = this
			YTPlayer.opt[opt] = val
			return $YTPlayer
		}
	}


	/**
	 * optimizeDisplay
	 * @param anchor
	 * can be center, top, bottom, right, left; (default is center,center)
	 */
	jQuery.fn.optimizeDisplay = function (anchor, abundanceX) {
		let YTPlayer = this.get(0)
		let vid = {}
		let el = YTPlayer.wrapper
		let iframe = jQuery(YTPlayer.playerEl)

		YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor

		// console.debug(YTPlayer.opt.anchor);

		YTPlayer.opt.anchor = typeof YTPlayer.opt.anchor != 'undefined ' ? YTPlayer.opt.anchor : 'center,center'
		let YTPAlign = YTPlayer.opt.anchor.split(',')
		let ab = abundanceX ? abundanceX : YTPlayer.opt.abundance

		if (YTPlayer.opt.optimizeDisplay) {
			let abundance = el.height() * ab
			let win = {}
			win.width = el.outerWidth()
			win.height = el.outerHeight() + abundance

			YTPlayer.opt.ratio = YTPlayer.opt.ratio === 'auto' ? 16 / 9 : YTPlayer.opt.ratio
			YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio)

			vid.width = win.width + abundance
			vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio)
			vid.marginTop = Math.ceil(-((vid.height - win.height + abundance) / 2))
			vid.marginLeft = -(abundance / 2)
			let lowest = vid.height < win.height

			if (lowest) {
				vid.height = win.height + abundance
				vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio)
				vid.marginTop = -(abundance / 2)
				vid.marginLeft = Math.ceil(-((vid.width - win.width) / 2))
			}

			for (let a in YTPAlign) {
				if (YTPAlign.hasOwnProperty(a)) {
					let al = YTPAlign[a].replace(/ /g, '')

					switch (al) {
						case 'top':
							vid.marginTop = -abundance
							break
						case 'bottom':
							vid.marginTop = Math.ceil(-(vid.height - win.height) - (abundance / 2))
							break
						case 'left':
							vid.marginLeft = -(abundance)
							break
						case 'right':
							vid.marginLeft = Math.ceil(-(vid.width - win.width) + (abundance / 2))
							break
					}

				}
			}

		} else {
			vid.width = '100%'
			vid.height = '100%'
			vid.marginTop = 0
			vid.marginLeft = 0
		}

		iframe.css({
			width     : vid.width,
			height    : vid.height,
			marginTop : vid.marginTop,
			marginLeft: vid.marginLeft,
			maxWidth  : 'initial'
		})


	}


	/* UTILITIES -----------------------------------------------------------------------------------------------------------------------*/

	/**
	 * shuffle
	 * @param arr
	 * @returns {Array|string|Blob|*}
	 *
	 */
	jQuery.shuffle = function (arr) {
		let newArray = arr.slice()
		let len = newArray.length
		let i = len
		while (i--) {
			let p = parseInt(Math.random() * len)
			let t = newArray[i]
			newArray[i] = newArray[p]
			newArray[p] = t
		}
		return newArray
	}

	/**
	 * Unselectable
	 * @returns {*}
	 */
	jQuery.fn.unselectable = function () {
		return this.each(function () {
			jQuery(this).css({
				'-moz-user-select'   : 'none',
				'-webkit-user-select': 'none',
				'user-select'        : 'none'
			}).attr('unselectable', 'on')
		})
	}

	/* EXTERNAL METHODS -----------------------------------------------------------------------------------------------------------------------*/

	jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer
	jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer

	jQuery.fn.YTPCheckForState = jQuery.mbYTPlayer.checkForState

	jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer
	jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID
	jQuery.fn.YTPGetPlaylistID = jQuery.mbYTPlayer.getPlaylistID
	jQuery.fn.YTPChangeVideo = jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeVideo
	jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy

	jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play
	jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay
	jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop
	jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause
	jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo

	jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist
	jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext
	jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev
	jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex

	jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute
	jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute
	jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume
	jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume
	jQuery.fn.YTPGetVolume = jQuery.mbYTPlayer.getVolume

	jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData
	jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen
	jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops
	jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress

	jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality
	jQuery.fn.YTPGetVideoQuality = jQuery.mbYTPlayer.getVideoQuality

	jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter
	jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters
	jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter
	jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters
	jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter
	jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters
	jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters
	jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters

	jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime
	jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime

	jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask
	jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask
	jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask

	jQuery.fn.YTPGetAbundance = jQuery.mbYTPlayer.getAbundance
	jQuery.fn.YTPSetAbundance = jQuery.mbYTPlayer.setAbundance

	jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor
	jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor

	jQuery.fn.YTPSetOption = jQuery.mbYTPlayer.setOption

})(jQuery, ytp)
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.browser.min.js                                                                                                                   _
 _ last modified: 24/05/17 19.56                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matbicoc@gmail.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2017. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

var nAgt=navigator.userAgent;jQuery.browser=jQuery.browser||{};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.safari=!1;jQuery.browser.chrome=!1;jQuery.browser.androidStock=!1;jQuery.browser.msie=!1;jQuery.browser.edge=!1;jQuery.browser.ua=nAgt;function isTouchSupported(){var a=nAgt.msMaxTouchPoints,e="ontouchstart"in document.createElement("div");return a||e?!0:!1}
var getOS=function(){var a={version:"Unknown version",name:"Unknown OS"};-1!=navigator.appVersion.indexOf("Win")&&(a.name="Windows");-1!=navigator.appVersion.indexOf("Mac")&&0>navigator.appVersion.indexOf("Mobile")&&(a.name="Mac");-1!=navigator.appVersion.indexOf("Linux")&&(a.name="Linux");/Mac OS X/.test(nAgt)&&!/Mobile/.test(nAgt)&&(a.version=/Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1],a.version=a.version.replace(/_/g,".").substring(0,5));/Windows/.test(nAgt)&&(a.version="Unknown.Unknown");/Windows NT 5.1/.test(nAgt)&&
(a.version="5.1");/Windows NT 6.0/.test(nAgt)&&(a.version="6.0");/Windows NT 6.1/.test(nAgt)&&(a.version="6.1");/Windows NT 6.2/.test(nAgt)&&(a.version="6.2");/Windows NT 10.0/.test(nAgt)&&(a.version="10.0");/Linux/.test(nAgt)&&/Linux/.test(nAgt)&&(a.version="Unknown.Unknown");a.name=a.name.toLowerCase();a.major_version="Unknown";a.minor_version="Unknown";"Unknown.Unknown"!=a.version&&(a.major_version=parseFloat(a.version.split(".")[0]),a.minor_version=parseFloat(a.version.split(".")[1]));return a};
jQuery.browser.os=getOS();jQuery.browser.hasTouch=isTouchSupported();jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;
if(-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",
		jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){jQuery.browser.msie=!0;jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Edge"))?(jQuery.browser.edge=!0,jQuery.browser.name="Microsoft Edge",jQuery.browser.fullVersion=nAgt.substring(verOffset+5)):-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=
		!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1<nAgt.indexOf("mozilla/5.0")&&-1<nAgt.indexOf("android ")&&-1<nAgt.indexOf("applewebkit")&&!(-1<nAgt.indexOf("chrome"))?(verOffset=nAgt.indexOf("Chrome"),jQuery.browser.webkit=!0,jQuery.browser.androidStock=!0,jQuery.browser.name="androidStock",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name=
		"Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=
		!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));
-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));
jQuery.browser.version=jQuery.browser.majorVersion;jQuery.browser.android=/Android/i.test(nAgt);jQuery.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt);jQuery.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt);jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt);jQuery.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt);jQuery.browser.kindle=/Kindle|Silk/i.test(nAgt);
jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile||jQuery.browser.kindle;jQuery.isMobile=jQuery.browser.mobile;jQuery.isTablet=jQuery.browser.mobile&&765<jQuery(window).width();jQuery.isAndroidDefault=jQuery.browser.android&&!/chrome/i.test(nAgt);jQuery.mbBrowser=jQuery.browser;
jQuery.browser.versionCompare=function(a,e){if("stringstring"!=typeof a+typeof e)return!1;for(var c=a.split("."),d=e.split("."),b=0,f=Math.max(c.length,d.length);b<f;b++){if(c[b]&&!d[b]&&0<parseInt(c[b])||parseInt(c[b])>parseInt(d[b]))return 1;if(d[b]&&!c[b]&&0<parseInt(d[b])||parseInt(c[b])<parseInt(d[b]))return-1}return 0};
;
/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.CSSAnimate.min.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matbicoc@gmail.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 26/03/14 21.40
 *  *****************************************************************************
 */

jQuery.support.CSStransition=function(){var d=(document.body||document.documentElement).style;return void 0!==d.transition||void 0!==d.WebkitTransition||void 0!==d.MozTransition||void 0!==d.MsTransition||void 0!==d.OTransition}();function uncamel(d){return d.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function setUnit(d,a){return"string"!==typeof d||d.match(/^[\-0-9\.]+jQuery/)?""+d+a:d}
function setFilter(d,a,b){var c=uncamel(a),g=jQuery.browser.mozilla?"":jQuery.CSS.sfx;d[g+"filter"]=d[g+"filter"]||"";b=setUnit(b>jQuery.CSS.filters[a].max?jQuery.CSS.filters[a].max:b,jQuery.CSS.filters[a].unit);d[g+"filter"]+=c+"("+b+") ";delete d[a]}
jQuery.CSS={name:"mb.CSSAnimate",author:"Matteo Bicocchi",version:"2.0.0",transitionEnd:"transitionEnd",sfx:"",filters:{blur:{min:0,max:100,unit:"px"},brightness:{min:0,max:400,unit:"%"},contrast:{min:0,max:400,unit:"%"},grayscale:{min:0,max:100,unit:"%"},hueRotate:{min:0,max:360,unit:"deg"},invert:{min:0,max:100,unit:"%"},saturate:{min:0,max:400,unit:"%"},sepia:{min:0,max:100,unit:"%"}},normalizeCss:function(d){var a=jQuery.extend(!0,{},d);jQuery.browser.webkit||jQuery.browser.opera?jQuery.CSS.sfx=
		"-webkit-":jQuery.browser.mozilla?jQuery.CSS.sfx="-moz-":jQuery.browser.msie&&(jQuery.CSS.sfx="-ms-");jQuery.CSS.sfx="";for(var b in a){"transform"===b&&(a[jQuery.CSS.sfx+"transform"]=a[b],delete a[b]);"transform-origin"===b&&(a[jQuery.CSS.sfx+"transform-origin"]=d[b],delete a[b]);"filter"!==b||jQuery.browser.mozilla||(a[jQuery.CSS.sfx+"filter"]=d[b],delete a[b]);"blur"===b&&setFilter(a,"blur",d[b]);"brightness"===b&&setFilter(a,"brightness",d[b]);"contrast"===b&&setFilter(a,"contrast",d[b]);"grayscale"===
b&&setFilter(a,"grayscale",d[b]);"hueRotate"===b&&setFilter(a,"hueRotate",d[b]);"invert"===b&&setFilter(a,"invert",d[b]);"saturate"===b&&setFilter(a,"saturate",d[b]);"sepia"===b&&setFilter(a,"sepia",d[b]);if("x"===b){var c=jQuery.CSS.sfx+"transform";a[c]=a[c]||"";a[c]+=" translateX("+setUnit(d[b],"px")+")";delete a[b]}"y"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" translateY("+setUnit(d[b],"px")+")",delete a[b]);"z"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" translateZ("+
		setUnit(d[b],"px")+")",delete a[b]);"rotate"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotate("+setUnit(d[b],"deg")+")",delete a[b]);"rotateX"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotateX("+setUnit(d[b],"deg")+")",delete a[b]);"rotateY"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotateY("+setUnit(d[b],"deg")+")",delete a[b]);"rotateZ"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotateZ("+setUnit(d[b],"deg")+")",delete a[b]);"scale"===b&&
(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scale("+setUnit(d[b],"")+")",delete a[b]);"scaleX"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scaleX("+setUnit(d[b],"")+")",delete a[b]);"scaleY"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scaleY("+setUnit(d[b],"")+")",delete a[b]);"scaleZ"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scaleZ("+setUnit(d[b],"")+")",delete a[b]);"skew"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" skew("+setUnit(d[b],
		"deg")+")",delete a[b]);"skewX"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" skewX("+setUnit(d[b],"deg")+")",delete a[b]);"skewY"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" skewY("+setUnit(d[b],"deg")+")",delete a[b]);"perspective"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" perspective("+setUnit(d[b],"px")+")",delete a[b])}return a},getProp:function(d){var a=[],b;for(b in d)0>a.indexOf(b)&&a.push(uncamel(b));return a.join(",")},animate:function(d,a,b,c,g){return this.each(function(){function n(){e.called=
		!0;e.CSSAIsRunning=!1;h.off(jQuery.CSS.transitionEnd+"."+e.id);clearTimeout(e.timeout);h.css(jQuery.CSS.sfx+"transition","");"function"==typeof g&&g.apply(e);"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null)}var e=this,h=jQuery(this);e.id=e.id||"CSSA_"+(new Date).getTime();var k=k||{type:"noEvent"};if(e.CSSAIsRunning&&e.eventType==k.type&&!jQuery.browser.msie&&9>=jQuery.browser.version)e.CSSqueue=function(){h.CSSAnimate(d,a,b,c,g)};else if(e.CSSqueue=null,e.eventType=k.type,0!==h.length&&
		d){d=jQuery.normalizeCss(d);e.CSSAIsRunning=!0;"function"==typeof a&&(g=a,a=jQuery.fx.speeds._default);"function"==typeof b&&(c=b,b=0);"string"==typeof b&&(g=b,b=0);"function"==typeof c&&(g=c,c="cubic-bezier(0.65,0.03,0.36,0.72)");if("string"==typeof a)for(var l in jQuery.fx.speeds)if(a==l){a=jQuery.fx.speeds[l];break}else a=jQuery.fx.speeds._default;a||(a=jQuery.fx.speeds._default);"string"===typeof g&&(c=g,g=null);if(jQuery.support.CSStransition){var f={"default":"ease","in":"ease-in",out:"ease-out",
	"in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",
	easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};
	f[c]&&(c=f[c]);h.off(jQuery.CSS.transitionEnd+"."+e.id);f=jQuery.CSS.getProp(d);var m={};jQuery.extend(m,d);m[jQuery.CSS.sfx+"transition-property"]=f;m[jQuery.CSS.sfx+"transition-duration"]=a+"ms";m[jQuery.CSS.sfx+"transition-delay"]=b+"ms";m[jQuery.CSS.sfx+"transition-timing-function"]=c;setTimeout(function(){h.one(jQuery.CSS.transitionEnd+"."+e.id,n);h.css(m)},1);e.timeout=setTimeout(function(){e.called||!g?(e.called=!1,e.CSSAIsRunning=!1):(h.css(jQuery.CSS.sfx+"transition",""),g.apply(e),e.CSSAIsRunning=
			!1,"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null))},a+b+10)}else{for(f in d)"transform"===f&&delete d[f],"filter"===f&&delete d[f],"transform-origin"===f&&delete d[f],"auto"===d[f]&&delete d[f],"x"===f&&(k=d[f],l="left",d[l]=k,delete d[f]),"y"===f&&(k=d[f],l="top",d[l]=k,delete d[f]),"-ms-transform"!==f&&"-ms-filter"!==f||delete d[f];h.delay(b).animate(d,a,g)}}})}};jQuery.fn.CSSAnimate=jQuery.CSS.animate;jQuery.normalizeCss=jQuery.CSS.normalizeCss;
jQuery.fn.css3=function(d){return this.each(function(){var a=jQuery(this),b=jQuery.normalizeCss(d);a.css(b)})};
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.simpleSlider.min.js                                                                                                              _
 _ last modified: 09/05/17 19.31                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2017. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/


var nAgt=navigator.userAgent;jQuery.browser=jQuery.browser||{};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.safari=!1;jQuery.browser.chrome=!1;jQuery.browser.androidStock=!1;jQuery.browser.msie=!1;jQuery.browser.edge=!1;jQuery.browser.ua=nAgt;function isTouchSupported(){var a=nAgt.msMaxTouchPoints,e="ontouchstart"in document.createElement("div");return a||e?!0:!1}
var getOS=function(){var a={version:"Unknown version",name:"Unknown OS"};-1!=navigator.appVersion.indexOf("Win")&&(a.name="Windows");-1!=navigator.appVersion.indexOf("Mac")&&0>navigator.appVersion.indexOf("Mobile")&&(a.name="Mac");-1!=navigator.appVersion.indexOf("Linux")&&(a.name="Linux");/Mac OS X/.test(nAgt)&&!/Mobile/.test(nAgt)&&(a.version=/Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1],a.version=a.version.replace(/_/g,".").substring(0,5));/Windows/.test(nAgt)&&(a.version="Unknown.Unknown");/Windows NT 5.1/.test(nAgt)&&
(a.version="5.1");/Windows NT 6.0/.test(nAgt)&&(a.version="6.0");/Windows NT 6.1/.test(nAgt)&&(a.version="6.1");/Windows NT 6.2/.test(nAgt)&&(a.version="6.2");/Windows NT 10.0/.test(nAgt)&&(a.version="10.0");/Linux/.test(nAgt)&&/Linux/.test(nAgt)&&(a.version="Unknown.Unknown");a.name=a.name.toLowerCase();a.major_version="Unknown";a.minor_version="Unknown";"Unknown.Unknown"!=a.version&&(a.major_version=parseFloat(a.version.split(".")[0]),a.minor_version=parseFloat(a.version.split(".")[1]));return a};
jQuery.browser.os=getOS();jQuery.browser.hasTouch=isTouchSupported();jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;
if(-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",
		jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){jQuery.browser.msie=!0;jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Edge"))?(jQuery.browser.edge=!0,jQuery.browser.name="Microsoft Edge",jQuery.browser.fullVersion=nAgt.substring(verOffset+5)):-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=
		!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1<nAgt.indexOf("mozilla/5.0")&&-1<nAgt.indexOf("android ")&&-1<nAgt.indexOf("applewebkit")&&!(-1<nAgt.indexOf("chrome"))?(verOffset=nAgt.indexOf("Chrome"),jQuery.browser.webkit=!0,jQuery.browser.androidStock=!0,jQuery.browser.name="androidStock",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name=
		"Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=
		!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));
-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));
jQuery.browser.version=jQuery.browser.majorVersion;jQuery.browser.android=/Android/i.test(nAgt);jQuery.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt);jQuery.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt);jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt);jQuery.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt);jQuery.browser.kindle=/Kindle|Silk/i.test(nAgt);
jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile||jQuery.browser.kindle;jQuery.isMobile=jQuery.browser.mobile;jQuery.isTablet=jQuery.browser.mobile&&765<jQuery(window).width();jQuery.isAndroidDefault=jQuery.browser.android&&!/chrome/i.test(nAgt);jQuery.mbBrowser=jQuery.browser;
jQuery.browser.versionCompare=function(a,e){if("stringstring"!=typeof a+typeof e)return!1;for(var c=a.split("."),d=e.split("."),b=0,f=Math.max(c.length,d.length);b<f;b++){if(c[b]&&!d[b]&&0<parseInt(c[b])||parseInt(c[b])>parseInt(d[b]))return 1;if(d[b]&&!c[b]&&0<parseInt(d[b])||parseInt(c[b])<parseInt(d[b]))return-1}return 0};

(function(b){b.simpleSlider={defaults:{initialval:0,scale:100,orientation:"h",readonly:!1,callback:!1},events:{start:b.browser.mobile?"touchstart":"mousedown",end:b.browser.mobile?"touchend":"mouseup",move:b.browser.mobile?"touchmove":"mousemove"},init:function(c){return this.each(function(){var a=this,d=b(a);d.addClass("simpleSlider");a.opt={};b.extend(a.opt,b.simpleSlider.defaults,c);b.extend(a.opt,d.data());var e="h"==a.opt.orientation?"horizontal":"vertical";e=b("<div/>").addClass("level").addClass(e);
	d.prepend(e);a.level=e;d.css({cursor:"default"});"auto"==a.opt.scale&&(a.opt.scale=b(a).outerWidth());d.updateSliderVal();a.opt.readonly||(d.on(b.simpleSlider.events.start,function(c){b.browser.mobile&&(c=c.changedTouches[0]);a.canSlide=!0;d.updateSliderVal(c);"h"==a.opt.orientation?d.css({cursor:"col-resize"}):d.css({cursor:"row-resize"});b.browser.mobile||(c.preventDefault(),c.stopPropagation())}),b(document).on(b.simpleSlider.events.move,function(c){b.browser.mobile&&(c=c.changedTouches[0]);a.canSlide&&
	(b(document).css({cursor:"default"}),d.updateSliderVal(c),b.browser.mobile||(c.preventDefault(),c.stopPropagation()))}).on(b.simpleSlider.events.end,function(){b(document).css({cursor:"auto"});a.canSlide=!1;d.css({cursor:"auto"})}))})},updateSliderVal:function(c){var a=this.get(0);if(a.opt){a.opt.initialval="number"==typeof a.opt.initialval?a.opt.initialval:a.opt.initialval(a);var d=b(a).outerWidth(),e=b(a).outerHeight();a.x="object"==typeof c?c.clientX+document.body.scrollLeft-this.offset().left:
				"number"==typeof c?c*d/a.opt.scale:a.opt.initialval*d/a.opt.scale;a.y="object"==typeof c?c.clientY+document.body.scrollTop-this.offset().top:"number"==typeof c?(a.opt.scale-a.opt.initialval-c)*e/a.opt.scale:a.opt.initialval*e/a.opt.scale;a.y=this.outerHeight()-a.y;a.scaleX=a.x*a.opt.scale/d;a.scaleY=a.y*a.opt.scale/e;a.outOfRangeX=a.scaleX>a.opt.scale?a.scaleX-a.opt.scale:0>a.scaleX?a.scaleX:0;a.outOfRangeY=a.scaleY>a.opt.scale?a.scaleY-a.opt.scale:0>a.scaleY?a.scaleY:0;a.outOfRange="h"==a.opt.orientation?
		a.outOfRangeX:a.outOfRangeY;a.value="undefined"!=typeof c?"h"==a.opt.orientation?a.x>=this.outerWidth()?a.opt.scale:0>=a.x?0:a.scaleX:a.y>=this.outerHeight()?a.opt.scale:0>=a.y?0:a.scaleY:"h"==a.opt.orientation?a.scaleX:a.scaleY;"h"==a.opt.orientation?a.level.width(Math.floor(100*a.x/d)+"%"):a.level.height(Math.floor(100*a.y/e));"function"==typeof a.opt.callback&&a.opt.callback(a)}}};b.fn.simpleSlider=b.simpleSlider.init;b.fn.updateSliderVal=b.simpleSlider.updateSliderVal})(jQuery);
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.storage.min.js                                                                                                                   _
 _ last modified: 24/05/15 16.08                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

(function(d){d.mbCookie={set:function(a,c,f,b){"object"==typeof c&&(c=JSON.stringify(c));b=b?"; domain="+b:"";var e=new Date,d="";0<f&&(e.setTime(e.getTime()+864E5*f),d="; expires="+e.toGMTString());document.cookie=a+"="+c+d+"; path=/"+b},get:function(a){a+="=";for(var c=document.cookie.split(";"),d=0;d<c.length;d++){for(var b=c[d];" "==b.charAt(0);)b=b.substring(1,b.length);if(0==b.indexOf(a))try{return JSON.parse(b.substring(a.length,b.length))}catch(e){return b.substring(a.length,b.length)}}return null},
	remove:function(a){d.mbCookie.set(a,"",-1)}};d.mbStorage={set:function(a,c){"object"==typeof c&&(c=JSON.stringify(c));localStorage.setItem(a,c)},get:function(a){if(localStorage[a])try{return JSON.parse(localStorage[a])}catch(c){return localStorage[a]}else return null},remove:function(a){a?localStorage.removeItem(a):localStorage.clear()}}})(jQuery);

} else {
     
/*___________________________________________________________________________________________________________________________________________________
_ jquery.mb.components                                                                                                                             _
_                                                                                                                                                  _
_ file: jquery.mb.YTPlayer.src.js                                                                                                                  _
_ last modified: 05/01/16 17.43                                                                                                                    _
_                                                                                                                                                  _
_ Open Lab s.r.l., Florence - Italy                                                                                                                _
_                                                                                                                                                  _
_ email: matteo@open-lab.com                                                                                                                       _
_ site: http://pupunzi.com                                                                                                                         _
_       http://open-lab.com                                                                                                                        _
_ blog: http://pupunzi.open-lab.com                                                                                                                _
_ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
_                                                                                                                                                  _
_ Licences: MIT, GPL                                                                                                                               _
_    http://www.opensource.org/licenses/mit-license.php                                                                                            _
_    http://www.gnu.org/licenses/gpl.html                                                                                                          _
_                                                                                                                                                  _
_ Copyright (c) 2001-2016. Matteo Bicocchi (Pupunzi);                                                                                              _
___________________________________________________________________________________________________________________________________________________*/
var ytp = ytp || {};

function onYouTubeIframeAPIReady() {
    if (ytp.YTAPIReady) return;
    ytp.YTAPIReady = true;
    jQuery(document).trigger("YTAPIReady");
}

var getYTPVideoID = function (url) {
    var videoID, playlistID;
    if (url.indexOf("youtu.be") > 0) {
        videoID = url.substr(url.lastIndexOf("/") + 1, url.length);
        playlistID = videoID.indexOf("?list=") > 0 ? videoID.substr(videoID.lastIndexOf("="), videoID.length) : null;
        videoID = playlistID ? videoID.substr(0, videoID.lastIndexOf("?")) : videoID;
    } else if (url.indexOf("http") > -1) {
        //videoID = url.match( /([\/&]v\/([^&#]*))|([\\?&]v=([^&#]*))/ )[ 1 ];
        videoID = url.match(/[\\?&]v=([^&#]*)/)[1];
        playlistID = url.indexOf("list=") > 0 ? url.match(/[\\?&]list=([^&#]*)/)[1] : null;
    } else {
        videoID = url.length > 15 ? null : url;
        playlistID = videoID ? null : url;
    }
    return {
        videoID: videoID,
        playlistID: playlistID
    };
};

(function (jQuery, ytp) {

    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "3.0.8",
        build: "5878",
        author: "Matteo Bicocchi",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto", // "auto", "16/9", "4/3"
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: false,
            vol: 50, // 1 to 100
            addRaster: false,
            mask: true,
            opacity: 1,
            quality: "hd1080", //or â€œsmallâ€, â€œmediumâ€, â€œlargeâ€, â€œhd720â€, â€œhd1080â€, â€œhighresâ€
            mute: true,
            loop: true,
            showControls: true,
            showAnnotations: false,
            showYTLogo: false,
            stopMovieOnBlur: false,
            realfullscreen: true,
            mobileFallbackImage: null,
            gaTrack: false,
            optimizeDisplay: true,
            align: "center,center", // top,bottom,left,right
            onReady: function (player) { }
        },
        /**
        *  @fontface icons
        *  */
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y"
        },
        controlBar: null,
        loading: null,
        locationProtocol: "https:",
        filters: {
            grayscale: {
                value: 0,
                unit: "%"
            },
            hue_rotate: {
                value: 0,
                unit: "deg"
            },
            invert: {
                value: 0,
                unit: "%"
            },
            opacity: {
                value: 0,
                unit: "%"
            },
            saturate: {
                value: 0,
                unit: "%"
            },
            sepia: {
                value: 0,
                unit: "%"
            },
            brightness: {
                value: 0,
                unit: "%"
            },
            contrast: {
                value: 0,
                unit: "%"
            },
            blur: {
                value: 0,
                unit: "px"
            }
        },
        /**
        *
        * @param options
        * @returns [players]
        */
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this;
                var $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0;
                YTPlayer.opt = {};
                YTPlayer.state = {};
                YTPlayer.filters = jQuery.mbYTPlayer.filters;
                YTPlayer.filtersEnabled = true;
                YTPlayer.id = YTPlayer.id || "YTP_" + new Date().getTime();
                $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && typeof $YTPlayer.data("property") == "string" ? eval('(' + $YTPlayer.data("property") + ')') : $YTPlayer.data("property");
                if (typeof property != "undefined" && typeof property.vol != "undefined") property.vol = property.vol === 0 ? property.vol = 1 : property.vol;

                jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property);

                if (!YTPlayer.hasChanged) {
                    YTPlayer.defaultOpt = {};
                    jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options);
                }

                if (YTPlayer.opt.loop == "true")
                    YTPlayer.opt.loop = 9999;

                YTPlayer.isRetina = (window.retina || window.devicePixelRatio > 1);
                var isIframe = function () {
                    var isIfr = false;
                    try {
                        if (self.location.href != top.location.href) isIfr = true;
                    } catch (e) {
                        isIfr = true;
                    }
                    return isIfr;
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe());
                if (!YTPlayer.canGoFullScreen) YTPlayer.opt.realfullscreen = false;
                if (!$YTPlayer.attr("id")) $YTPlayer.attr("id", "video_" + new Date().getTime());
                var playerID = "mbYTP_" + YTPlayer.id;
                YTPlayer.isAlone = false;
                YTPlayer.hasFocus = true;
                var videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : false;
                var playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : false;
                YTPlayer.videoID = videoID;
                YTPlayer.playlistID = playlistID;
                YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? '0' : '3';

                var playerVars = {
                    'modestbranding': 1,
                    'autoplay': 0,
                    'controls': 0,
                    'showinfo': 0,
                    'rel': 0,
                    'enablejsapi': 1,
                    'version': 3,
                    'playerapiid': playerID,
                    'origin': '*',
                    'allowfullscreen': true,
                    'wmode': 'transparent',
                    'iv_load_policy': YTPlayer.opt.showAnnotations
                };

                if (document.createElement('video').canPlayType) jQuery.extend(playerVars, {
                    'html5': 1
                });
                if (jQuery.browser.msie && jQuery.browser.version < 9) this.opt.opacity = 1;

                YTPlayer.isSelf = YTPlayer.opt.containment == "self";
                YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = YTPlayer.opt.containment == "self" ? jQuery(this) : jQuery(YTPlayer.opt.containment);
                YTPlayer.isBackground = YTPlayer.opt.containment.is("body");

                if (YTPlayer.isBackground && ytp.backgroundIsInited)
                    return;

                var isPlayer = YTPlayer.opt.containment.is(jQuery(this));

                YTPlayer.canPlayOnMobile = isPlayer && jQuery(this).children().length === 0;
                YTPlayer.isPlayer = false;

                if (!isPlayer) {
                    $YTPlayer.hide();
                } else {
                    YTPlayer.isPlayer = true;
                }

                var overlay = jQuery("<div/>").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }).addClass("YTPOverlay");

                if (YTPlayer.isPlayer) {
                    overlay.on("click", function () {
                        //$YTPlayer.YTPTogglePlay();
                    })
                }

                var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + playerID);
                wrapper.css({
                    position: "absolute",
                    zIndex: 0,
                    minWidth: "100%",
                    minHeight: "100%",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                    opacity: 0
                });

                var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
                playerBox.css({
                    position: "absolute",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden"
                });

                wrapper.append(playerBox);

                YTPlayer.opt.containment.children().not("script, style").each(function () {
                    if (jQuery(this).css("position") == "static") jQuery(this).css("position", "relative");
                });
                if (YTPlayer.isBackground) {
                    jQuery("body").css({
                        boxSizing: "border-box"
                    });

                    wrapper.css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 0
                    });

                    $YTPlayer.hide();

                } else if (YTPlayer.opt.containment.css("position") == "static")
                    YTPlayer.opt.containment.css({
                        position: "relative"
                    });

                YTPlayer.opt.containment.prepend(wrapper);
                YTPlayer.wrapper = wrapper;

                playerBox.css({
                    opacity: 1
                });

                if (!jQuery.browser.mobile) {
                    playerBox.after(overlay);
                    YTPlayer.overlay = overlay;
                }

                if (!YTPlayer.isBackground) {
                    overlay.on("mouseenter", function () {
                        if (YTPlayer.controlBar.length)
                            YTPlayer.controlBar.addClass("visible");
                    }).on("mouseleave", function () {
                        if (YTPlayer.controlBar.length)
                            YTPlayer.controlBar.removeClass("visible");
                    });
                }

                if (!ytp.YTAPIReady) {
                    jQuery("#YTAPI").remove();
                    var tag = jQuery("<script></script>").attr({
                        "src": jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                        "id": "YTAPI"
                    });
                    jQuery("head").prepend(tag);
                } else {
                    setTimeout(function () {
                        jQuery(document).trigger("YTAPIReady");
                    }, 100)
                }

                if (jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) {

                    if (YTPlayer.opt.mobileFallbackImage) {
                        YTPlayer.opt.containment.css({
                            //backgroundImage: "url(" + YTPlayer.opt.mobileFallbackImage + ")",
                            //backgroundPosition: "center center",
                            //backgroundSize: "cover",
                            //backgroundRepeat: "no-repeat"
                        })
                    };

                    $YTPlayer.remove();
                    jQuery(document).trigger("YTPUnavailable");
                    return;
                }

                jQuery(document).on("YTAPIReady", function () {
                    if ((YTPlayer.isBackground && ytp.backgroundIsInited) || YTPlayer.isInit) return;
                    if (YTPlayer.isBackground) {
                        ytp.backgroundIsInited = true;
                    }

                    YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == "undefined" ? (YTPlayer.isBackground ? true : false) : YTPlayer.opt.autoPlay;
                    YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100;
                    jQuery.mbYTPlayer.getDataFromAPI(YTPlayer);
                    jQuery(YTPlayer).on("YTPChanged", function () {

                        if (YTPlayer.isInit)
                            return;

                        YTPlayer.isInit = true;

                        //if is mobile && isPlayer fallback to the default YT player
                        if (jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                            // Try to adjust the player dimention
                            if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                                YTPlayer.opt.containment.css({
                                    maxWidth: "100%"
                                });
                                var h = YTPlayer.opt.containment.outerWidth() * .563;
                                YTPlayer.opt.containment.css({
                                    maxHeight: h
                                });
                            }
                            new YT.Player(playerID, {
                                videoId: YTPlayer.videoID.toString(),
                                width: '100%',
                                height: h,
                                playerVars: playerVars,
                                events: {
                                    'onReady': function (event) {
                                        YTPlayer.player = event.target;
                                        playerBox.css({
                                            opacity: 1
                                        });
                                        YTPlayer.wrapper.css({
                                            opacity: 1
                                        });
                                    }
                                }
                            });
                            return;
                        }

                        new YT.Player(playerID, {
                            videoId: YTPlayer.videoID.toString(),
                            playerVars: playerVars,
                            events: {
                                'onReady': function (event) {
                                    YTPlayer.player = event.target;
                                    if (YTPlayer.isReady) return;
                                    YTPlayer.isReady = YTPlayer.isPlayer && !YTPlayer.opt.autoPlay ? false : true;
                                    YTPlayer.playerEl = YTPlayer.player.getIframe();

                                    jQuery(YTPlayer.playerEl).unselectable();

                                    $YTPlayer.optimizeDisplay();
                                    YTPlayer.videoID = videoID;
                                    jQuery(window).off("resize.YTP_" + YTPlayer.id).on("resize.YTP_" + YTPlayer.id, function () {
                                        $YTPlayer.optimizeDisplay();
                                    });

                                    jQuery.mbYTPlayer.checkForState(YTPlayer);
                                },
                                /**
                                *
                                * @param event
                                *
                                * -1 (unstarted)
                                * 0 (ended)
                                * 1 (playing)
                                * 2 (paused)
                                * 3 (buffering)
                                * 5 (video cued).
                                *
                                *
                                */
                                'onStateChange': function (event) {
                                    if (typeof event.target.getPlayerState != "function") return;
                                    var state = event.target.getPlayerState();

                                    if (YTPlayer.preventTrigger) {
                                        YTPlayer.preventTrigger = false;
                                        return
                                    }

                                    /*
                                    if( YTPlayer.state == state )
                                    return;
                                    */

                                    YTPlayer.state = state;

                                    var eventType;
                                    switch (state) {
                                        case -1: //----------------------------------------------- unstarted
                                            eventType = "YTPUnstarted";
                                            break;
                                        case 0: //------------------------------------------------ ended
                                            eventType = "YTPEnd";
                                            break;
                                        case 1: //------------------------------------------------ play
                                            eventType = "YTPPlay";
                                            if (YTPlayer.controlBar.length)
                                            {
                                                YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause);
                                                 
                                            }
                                            if (typeof _gaq != "undefined" && eval(YTPlayer.opt.gaTrack)) _gaq.push(['_trackEvent', 'YTPlayer', 'Play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString())]);
                                            if (typeof ga != "undefined" && eval(YTPlayer.opt.gaTrack)) ga('send', 'event', 'YTPlayer', 'play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()));
                                            break;
                                        case 2: //------------------------------------------------ pause
                                            eventType = "YTPPause";
                                            if (YTPlayer.controlBar.length) {
                                                YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                 
                                            }
                                            break;
                                        case 3: //------------------------------------------------ buffer
                                            YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality);
                                            eventType = "YTPBuffering";
                                            if (YTPlayer.controlBar.length)
                                            {
                                                YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                 
                                            }
                                            break;
                                        case 5: //------------------------------------------------ cued
                                            eventType = "YTPCued";
                                            break;
                                        default:
                                            break;
                                    }

                                    // Trigger state events
                                    var YTPEvent = jQuery.Event(eventType);
                                    YTPEvent.time = YTPlayer.currentTime;
                                    if (YTPlayer.canTrigger) jQuery(YTPlayer).trigger(YTPEvent);
                                },
                                /**
                                *
                                * @param e
                                */
                                'onPlaybackQualityChange': function (e) {
                                    var quality = e.target.getPlaybackQuality();
                                    var YTPQualityChange = jQuery.Event("YTPQualityChange");
                                    YTPQualityChange.quality = quality;
                                    jQuery(YTPlayer).trigger(YTPQualityChange);
                                },
                                /**
                                *
                                * @param err
                                */
                                'onError': function (err) {

                                    if (err.data == 150) {
                                        console.log("Embedding this video is restricted by Youtube.");
                                        if (YTPlayer.isPlayList) jQuery(YTPlayer).playNext();
                                    }

                                    if (err.data == 2 && YTPlayer.isPlayList)
                                        jQuery(YTPlayer).playNext();

                                    if (typeof YTPlayer.opt.onError == "function")
                                        YTPlayer.opt.onError($YTPlayer, err);
                                }
                            }
                        });
                    });
                });

                $YTPlayer.off("YTPTime.mask");

                jQuery.mbYTPlayer.applyMask(YTPlayer);

            });
        },
        /**
        *
        * @param YTPlayer
        */
        getDataFromAPI: function (YTPlayer) {
            YTPlayer.videoData = jQuery.mbStorage.get("YTPlayer_data_" + YTPlayer.videoID);
            jQuery(YTPlayer).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
                if (YTPlayer.hasData) {

                    if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay) {
                        var bgndURL = YTPlayer.videoData.thumb_max || YTPlayer.videoData.thumb_high || YTPlayer.videoData.thumb_medium;
                        YTPlayer.opt.containment.css({
                            //background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
                            //backgroundSize: "cover"
                        });
                        //YTPlayer.opt.backgroundUrl = bgndURL;
                    }
                }
            });

            if (YTPlayer.videoData) {

                setTimeout(function () {
                    YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
                    YTPlayer.dataReceived = true;
                    jQuery(YTPlayer).trigger("YTPChanged");
                    var YTPData = jQuery.Event("YTPData");
                    YTPData.prop = {};
                    for (var x in YTPlayer.videoData) YTPData.prop[x] = YTPlayer.videoData[x];
                    jQuery(YTPlayer).trigger(YTPData);
                }, 500);

                YTPlayer.hasData = true;
            } else if (jQuery.mbYTPlayer.apiKey) {
                // Get video info from API3 (needs api key)
                // snippet,player,contentDetails,statistics,status
                jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + YTPlayer.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (data) {
                    YTPlayer.dataReceived = true;
                    jQuery(YTPlayer).trigger("YTPChanged");

                    function parseYTPlayer_data(data) {
                        YTPlayer.videoData = {};
                        YTPlayer.videoData.id = YTPlayer.videoID;
                        YTPlayer.videoData.channelTitle = data.channelTitle;
                        YTPlayer.videoData.title = data.title;
                        YTPlayer.videoData.description = data.description.length < 400 ? data.description : data.description.substring(0, 400) + " ...";
                        YTPlayer.videoData.aspectratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
                        YTPlayer.opt.ratio = YTPlayer.videoData.aspectratio;
                        YTPlayer.videoData.thumb_max = data.thumbnails.maxres ? data.thumbnails.maxres.url : null;
                        YTPlayer.videoData.thumb_high = data.thumbnails.high ? data.thumbnails.high.url : null;
                        YTPlayer.videoData.thumb_medium = data.thumbnails.medium ? data.thumbnails.medium.url : null;
                        jQuery.mbStorage.set("YTPlayer_data_" + YTPlayer.videoID, YTPlayer.videoData);
                    }
                    parseYTPlayer_data(data.items[0].snippet);
                    YTPlayer.hasData = true;
                    var YTPData = jQuery.Event("YTPData");
                    YTPData.prop = {};
                    for (var x in YTPlayer.videoData) YTPData.prop[x] = YTPlayer.videoData[x];
                    jQuery(YTPlayer).trigger(YTPData);
                });
            } else {
                setTimeout(function () {
                    jQuery(YTPlayer).trigger("YTPChanged");
                }, 50);
                if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay) {
                    var bgndURL = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + YTPlayer.videoID + "/hqdefault.jpg";
                    YTPlayer.opt.containment.css({
                        //background: "rgba(0,0,0,0.5) url(" + bgndURL + ") center center",
                        //backgroundSize: "cover"
                    });
                    //YTPlayer.opt.backgroundUrl = bgndURL;
                }
                YTPlayer.videoData = null;
                YTPlayer.opt.ratio = YTPlayer.opt.ratio == "auto" ? "16/9" : YTPlayer.opt.ratio;
            }
            if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay && !jQuery.browser.mobile) {
                YTPlayer.loading = jQuery("<div/>").addClass("loading").html("Loading").hide();
                jQuery(YTPlayer).append(YTPlayer.loading);
                YTPlayer.loading.fadeIn();
            }
        },
        /**
        *
        */
        removeStoredData: function () {
            jQuery.mbStorage.remove();
        },
        /**
        *
        * @returns {*|YTPlayer.videoData}
        */
        getVideoData: function () {
            var YTPlayer = this.get(0);
            return YTPlayer.videoData;
        },
        /**
        *
        * @returns {*|YTPlayer.videoID|boolean}
        */
        getVideoID: function () {
            var YTPlayer = this.get(0);
            return YTPlayer.videoID || false;
        },
        /**
        *
        * @param quality
        */
        setVideoQuality: function (quality) {
            var YTPlayer = this.get(0);
            //if( !jQuery.browser.chrome )
            YTPlayer.player.setPlaybackQuality(quality);
        },
        /**
        *
        * @param videos
        * @param shuffle
        * @param callback
        * @param loopList
        * @returns {jQuery.mbYTPlayer}
        */
        playlist: function (videos, shuffle, callback, loopList) {
            var $YTPlayer = this;
            var YTPlayer = $YTPlayer.get(0);
            YTPlayer.isPlayList = true;
            if (shuffle) videos = jQuery.shuffle(videos);
            if (!YTPlayer.videoID) {
                YTPlayer.videos = videos;
                YTPlayer.videoCounter = 0;
                YTPlayer.videoLength = videos.length;
                jQuery(YTPlayer).data("property", videos[0]);
                jQuery(YTPlayer).mb_YTPlayer();
            }
            if (typeof callback == "function") jQuery(YTPlayer).one("YTPChanged", function () {
                callback(YTPlayer);
            });
            jQuery(YTPlayer).on("YTPEnd", function () {
                loopList = typeof loopList == "undefined" ? true : loopList;
                jQuery(YTPlayer).playNext(loopList);
            });
            return $YTPlayer;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        playNext: function (loopList) {
            var YTPlayer = this.get(0);

            if (YTPlayer.checkForStartAt) {
                clearTimeout(YTPlayer.checkForStartAt);
                clearInterval(YTPlayer.getState);
            }

            YTPlayer.videoCounter++;
            if (YTPlayer.videoCounter >= YTPlayer.videoLength && loopList)
                YTPlayer.videoCounter = 0;

            if (YTPlayer.videoCounter < YTPlayer.videoLength)
                jQuery(YTPlayer).changeMovie(YTPlayer.videos[YTPlayer.videoCounter]);
            else
                YTPlayer.videoCounter--;

            return this;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        playPrev: function () {
            var YTPlayer = this.get(0);

            if (YTPlayer.checkForStartAt) {
                clearInterval(YTPlayer.checkForStartAt);
                clearInterval(YTPlayer.getState);
            }

            YTPlayer.videoCounter--;
            if (YTPlayer.videoCounter < 0) YTPlayer.videoCounter = YTPlayer.videoLength - 1;
            jQuery(YTPlayer).changeMovie(YTPlayer.videos[YTPlayer.videoCounter]);
            return this;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        playIndex: function (idx) {
            var YTPlayer = this.get(0);

            idx = idx - 1;

            if (YTPlayer.checkForStartAt) {
                clearInterval(YTPlayer.checkForStartAt);
                clearInterval(YTPlayer.getState);
            }

            YTPlayer.videoCounter = idx;
            if (YTPlayer.videoCounter >= YTPlayer.videoLength - 1)
                YTPlayer.videoCounter = YTPlayer.videoLength - 1;
            jQuery(YTPlayer).changeMovie(YTPlayer.videos[YTPlayer.videoCounter]);
            return this;
        },
        /**
        *
        * @param opt
        */
        changeMovie: function (opt) {

            var $YTPlayer = this;
            var YTPlayer = $YTPlayer.get(0);
            YTPlayer.opt.startAt = 0;
            YTPlayer.opt.stopAt = 0;
            YTPlayer.opt.mask = false;
            YTPlayer.opt.mute = true;
            YTPlayer.hasData = false;
            YTPlayer.hasChanged = true;
            YTPlayer.player.loopTime = undefined;

            if (opt)
                jQuery.extend(YTPlayer.opt, opt); //YTPlayer.defaultOpt,
            YTPlayer.videoID = getYTPVideoID(YTPlayer.opt.videoURL).videoID;

            if (YTPlayer.opt.loop == "true")
                YTPlayer.opt.loop = 9999;

            jQuery(YTPlayer.playerEl).CSSAnimate({
                opacity: 0
            }, 200, function () {

                var YTPChangeMovie = jQuery.Event("YTPChangeMovie");
                YTPChangeMovie.time = YTPlayer.currentTime;
                YTPChangeMovie.videoId = YTPlayer.videoID;
                jQuery(YTPlayer).trigger(YTPChangeMovie);

                jQuery(YTPlayer).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + YTPlayer.videoID), 1, YTPlayer.opt.quality);
                jQuery(YTPlayer).optimizeDisplay();

                jQuery.mbYTPlayer.checkForState(YTPlayer);
                jQuery.mbYTPlayer.getDataFromAPI(YTPlayer);

            });

            jQuery.mbYTPlayer.applyMask(YTPlayer);
        },
        /**
        *
        * @returns {player}
        */
        getPlayer: function () {
            return jQuery(this).get(0).player;
        },

        playerDestroy: function () {
            var YTPlayer = this.get(0);
            ytp.YTAPIReady = true;
            ytp.backgroundIsInited = false;
            YTPlayer.isInit = false;
            YTPlayer.videoID = null;
            var playerBox = YTPlayer.wrapper;
            playerBox.remove();
            jQuery("#controlBar_" + YTPlayer.id).remove();
            clearInterval(YTPlayer.checkForStartAt);
            clearInterval(YTPlayer.getState);
            return this;
        },

        /**
        *
        * @param real
        * @returns {jQuery.mbYTPlayer}
        */
        fullscreen: function (real) {
            var YTPlayer = this.get(0);
            if (typeof real == "undefined") real = YTPlayer.opt.realfullscreen;
            real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id);
            var fullScreenBtn = controls.find(".mb_OnlyYT");
            var videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            //var videoWrapper = YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
                    var isFullScreen = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
                    if (!isFullScreen) {
                        YTPlayer.isAlone = false;
                        fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT);
                        jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality);
                        videoWrapper.removeClass("YTPFullscreen");
                        videoWrapper.CSSAnimate({
                            opacity: YTPlayer.opt.opacity
                        }, 500);
                        videoWrapper.css({
                            zIndex: 0
                        });
                        if (YTPlayer.isBackground) {
                            jQuery("body").after(controls);
                        } else {
                            YTPlayer.wrapper.before(controls);
                        }
                        jQuery(window).resize();
                        jQuery(YTPlayer).trigger("YTPFullScreenEnd");
                    } else {
                        jQuery(YTPlayer).YTPSetVideoQuality("default");
                        jQuery(YTPlayer).trigger("YTPFullScreenStart");
                    }
                });
            }
            if (!YTPlayer.isAlone) {
                function hideMouse() {
                    YTPlayer.overlay.css({
                        cursor: "none"
                    });
                }
                jQuery(document).on("mousemove.YTPlayer", function (e) {
                    YTPlayer.overlay.css({
                        cursor: "auto"
                    });
                    clearTimeout(YTPlayer.hideCursor);
                    if (!jQuery(e.target).parents().is(".mb_YTPBar")) YTPlayer.hideCursor = setTimeout(hideMouse, 3000);
                });
                hideMouse();
                if (real) {
                    videoWrapper.css({
                        opacity: 0
                    });
                    videoWrapper.addClass("YTPFullscreen");
                    launchFullscreen(videoWrapper.get(0));
                    setTimeout(function () {
                        videoWrapper.CSSAnimate({
                            opacity: 1
                        }, 1000);
                        YTPlayer.wrapper.append(controls);
                        jQuery(YTPlayer).optimizeDisplay();
                        YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, true);
                    }, 500)
                } else videoWrapper.css({
                    zIndex: 10000
                }).CSSAnimate({
                    opacity: 1
                }, 1000);
                fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite);
                YTPlayer.isAlone = true;
            } else {
                jQuery(document).off("mousemove.YTPlayer");
                clearTimeout(YTPlayer.hideCursor);
                YTPlayer.overlay.css({
                    cursor: "auto"
                });
                if (real) {
                    cancelFullscreen();
                } else {
                    videoWrapper.CSSAnimate({
                        opacity: YTPlayer.opt.opacity
                    }, 500);
                    videoWrapper.css({
                        zIndex: 0
                    });
                }
                fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT);
                YTPlayer.isAlone = false;
            }

            function RunPrefixMethod(obj, method) {
                var pfx = ["webkit", "moz", "ms", "o", ""];
                var p = 0,
					m, t;
                while (p < pfx.length && !obj[m]) {
                    m = method;
                    if (pfx[p] == "") {
                        m = m.substr(0, 1).toLowerCase() + m.substr(1);
                    }
                    m = pfx[p] + m;
                    t = typeof obj[m];
                    if (t != "undefined") {
                        pfx = [pfx[p]];
                        return (t == "function" ? obj[m]() : obj[m]);
                    }
                    p++;
                }
            }

            function launchFullscreen(element) {
                RunPrefixMethod(element, "RequestFullScreen");
            }

            function cancelFullscreen() {
                if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
                    RunPrefixMethod(document, "CancelFullScreen");
                }
            }
            return this;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        toggleLoops: function () {
            var YTPlayer = this.get(0);
            var data = YTPlayer.opt;
            if (data.loop == 1) {
                data.loop = 0;
            } else {
                if (data.startAt) {
                    YTPlayer.player.seekTo(data.startAt);
                } else {
				YTPlayer.player.unMute();
                    YTPlayer.player.playVideo();
                }
                data.loop = 1;
            }
            return this;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        play: function () {
            var YTPlayer = this.get(0);
            if (!YTPlayer.isReady)
                return this;

				YTPlayer.player.unMute();
            YTPlayer.player.playVideo();
            YTPlayer.wrapper.CSSAnimate({
                opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
            }, 2000);

            jQuery(YTPlayer.playerEl).CSSAnimate({
                opacity: 1
            }, 1000);

            var controls = jQuery("#controlBar_" + YTPlayer.id);
            var playBtn = controls.find(".mb_YTPPlaypause");
            playBtn.html(jQuery.mbYTPlayer.controls.pause);
            YTPlayer.state = 1;

            jQuery(YTPlayer).css("background-image", "none");
            return this;
        },
        /**
        *
        * @param callback
        * @returns {jQuery.mbYTPlayer}
        */
        togglePlay: function (callback) {
            var YTPlayer = this.get(0);
            if (YTPlayer.state == 1)
                this.YTPPause();
            else
                this.YTPPlay();

            if (typeof callback == "function")
                callback(YTPlayer.state);

            return this;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        stop: function () {
            var YTPlayer = this.get(0);
            var controls = jQuery("#controlBar_" + YTPlayer.id);
            var playBtn = controls.find(".mb_YTPPlaypause");
            playBtn.html(jQuery.mbYTPlayer.controls.play);
            YTPlayer.player.stopVideo();
            return this;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        pause: function () {
            var YTPlayer = this.get(0);
            YTPlayer.player.pauseVideo();
            YTPlayer.state = 2;
            return this;
        },
        /**
        *
        * @param val
        * @returns {jQuery.mbYTPlayer}
        */
        seekTo: function (val) {
            var YTPlayer = this.get(0);
            YTPlayer.player.seekTo(val, true);
            return this;
        },
        /**
        *
        * @param val
        * @returns {jQuery.mbYTPlayer}
        */
        setVolume: function (val) {
            var YTPlayer = this.get(0);
            if (!val && !YTPlayer.opt.vol && YTPlayer.player.getVolume() == 0) jQuery(YTPlayer).YTPUnmute();
            else if ((!val && YTPlayer.player.getVolume() > 0) || (val && YTPlayer.opt.vol == val)) {
                if (!YTPlayer.isMute) jQuery(YTPlayer).YTPMute();
                else jQuery(YTPlayer).YTPUnmute();
            } else {
                YTPlayer.opt.vol = val;
                YTPlayer.player.setVolume(YTPlayer.opt.vol);
                if (YTPlayer.volumeBar && YTPlayer.volumeBar.length) YTPlayer.volumeBar.updateSliderVal(val)
            }
            return this;
        },
        /**
        *
        * @returns {boolean}
        */
        toggleVolume: function () {
            var YTPlayer = this.get(0);
            if (!YTPlayer) return;
            if (YTPlayer.player.isMuted()) {
                jQuery(YTPlayer).YTPUnmute();
                return true;
            } else {
                jQuery(YTPlayer).YTPMute();
                return false;
            }
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        mute: function () {
            var YTPlayer = this.get(0);
            if (YTPlayer.isMute) return;
            YTPlayer.player.mute();
            YTPlayer.isMute = true;
            YTPlayer.player.setVolume(0);
            if (YTPlayer.volumeBar && YTPlayer.volumeBar.length && YTPlayer.volumeBar.width() > 10) {
                YTPlayer.volumeBar.updateSliderVal(0);
            }
            var controls = jQuery("#controlBar_" + YTPlayer.id);
            var muteBtn = controls.find(".mb_YTPMuteUnmute");
            muteBtn.html(jQuery.mbYTPlayer.controls.unmute);
            jQuery(YTPlayer).addClass("isMuted");
            if (YTPlayer.volumeBar && YTPlayer.volumeBar.length) YTPlayer.volumeBar.addClass("muted");
            var YTPEvent = jQuery.Event("YTPMuted");
            YTPEvent.time = YTPlayer.currentTime;
            if (YTPlayer.canTrigger) jQuery(YTPlayer).trigger(YTPEvent);
            return this;
        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        unmute: function () {
            var YTPlayer = this.get(0);
            if (!YTPlayer.isMute) return;
            YTPlayer.player.unMute();
            YTPlayer.isMute = false;
            YTPlayer.player.setVolume(YTPlayer.opt.vol);
            if (YTPlayer.volumeBar && YTPlayer.volumeBar.length) YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol > 10 ? YTPlayer.opt.vol : 10);
            var controls = jQuery("#controlBar_" + YTPlayer.id);
            var muteBtn = controls.find(".mb_YTPMuteUnmute");
            muteBtn.html(jQuery.mbYTPlayer.controls.mute);
            jQuery(YTPlayer).removeClass("isMuted");
            if (YTPlayer.volumeBar && YTPlayer.volumeBar.length) YTPlayer.volumeBar.removeClass("muted");
            var YTPEvent = jQuery.Event("YTPUnmuted");
            YTPEvent.time = YTPlayer.currentTime;
            if (YTPlayer.canTrigger) jQuery(YTPlayer).trigger(YTPEvent);
            return this;
        },
        /**
        * FILTERS
        *
        *
        * @param filter
        * @param value
        * @returns {jQuery.mbYTPlayer}
        */
        applyFilter: function (filter, value) {
            return this.each(function () {
                var YTPlayer = this;
                YTPlayer.filters[filter].value = value;
                if (YTPlayer.filtersEnabled)
                    jQuery(YTPlayer).YTPEnableFilters();
            });
        },
        /**
        *
        * @param filters
        * @returns {jQuery.mbYTPlayer}
        */
        applyFilters: function (filters) {
            return this.each(function () {
                var YTPlayer = this;
                if (!YTPlayer.isReady) {
                    jQuery(YTPlayer).on("YTPReady", function () {
                        jQuery(YTPlayer).YTPApplyFilters(filters);
                    });
                    return;
                }

                for (var key in filters)
                    jQuery(YTPlayer).YTPApplyFilter(key, filters[key]);

                jQuery(YTPlayer).trigger("YTPFiltersApplied");
            });
        },
        /**
        *
        * @param filter
        * @param value
        * @returns {*}
        */
        toggleFilter: function (filter, value) {
            return this.each(function () {
                var YTPlayer = this;
                if (!YTPlayer.filters[filter].value) YTPlayer.filters[filter].value = value;
                else YTPlayer.filters[filter].value = 0;
                if (YTPlayer.filtersEnabled) jQuery(this).YTPEnableFilters();
            });
        },
        /**
        *
        * @param callback
        * @returns {*}
        */
        toggleFilters: function (callback) {
            return this.each(function () {
                var YTPlayer = this;
                if (YTPlayer.filtersEnabled) {
                    jQuery(YTPlayer).trigger("YTPDisableFilters");
                    jQuery(YTPlayer).YTPDisableFilters();
                } else {
                    jQuery(YTPlayer).YTPEnableFilters();
                    jQuery(YTPlayer).trigger("YTPEnableFilters");
                }
                if (typeof callback == "function")
                    callback(YTPlayer.filtersEnabled);
            })
        },
        /**
        *
        * @returns {*}
        */
        disableFilters: function () {
            return this.each(function () {
                var YTPlayer = this;
                var iframe = jQuery(YTPlayer.playerEl);
                iframe.css("-webkit-filter", "");
                iframe.css("filter", "");
                YTPlayer.filtersEnabled = false;
            })
        },
        /**
        *
        * @returns {*}
        */
        enableFilters: function () {
            return this.each(function () {
                var YTPlayer = this;
                var iframe = jQuery(YTPlayer.playerEl);
                var filterStyle = "";
                for (var key in YTPlayer.filters) {
                    if (YTPlayer.filters[key].value)
                        filterStyle += key.replace("_", "-") + "(" + YTPlayer.filters[key].value + YTPlayer.filters[key].unit + ") ";
                }
                iframe.css("-webkit-filter", filterStyle);
                iframe.css("filter", filterStyle);
                YTPlayer.filtersEnabled = true;
            });
        },
        /**
        *
        * @param filter
        * @param callback
        * @returns {*}
        */
        removeFilter: function (filter, callback) {
            return this.each(function () {
                var YTPlayer = this;
                if (typeof filter == "function") {
                    callback = filter;
                    filter = null;
                }
                if (!filter)
                    for (var key in YTPlayer.filters) {
                        jQuery(this).YTPApplyFilter(key, 0);
                        if (typeof callback == "function") callback(key);
                    } else {
                    jQuery(this).YTPApplyFilter(filter, 0);
                    if (typeof callback == "function") callback(filter);
                }
            });

        },
        /**
        *
        * @returns {*}
        */
        getFilters: function () {
            var YTPlayer = this.get(0);
            return YTPlayer.filters;
        },
        /**
        * MASK
        *
        *
        * @param mask
        * @returns {jQuery.mbYTPlayer}
        */
        addMask: function (mask) {
            var YTPlayer = this.get(0);
            var overlay = YTPlayer.overlay;

            if (!mask) {
                mask = YTPlayer.actualMask;
            }

            var tempImg = jQuery("<img/>").attr("src", mask).on("load", function () {

                overlay.CSSAnimate({
                    opacity: 0
                }, 500, function () {

                    YTPlayer.hasMask = true;

                    tempImg.remove();

                    overlay.css({
                        //backgroundImage: "url(" + mask + ")",
                        //backgroundRepeat: "no-repeat",
                        //backgroundPosition: "center center",
                        //backgroundSize: "cover"
                    });

                    overlay.CSSAnimate({
                        opacity: 1
                    }, 500);

                });

            });

            return this;

        },
        /**
        *
        * @returns {jQuery.mbYTPlayer}
        */
        removeMask: function () {
            var YTPlayer = this.get(0);
            var overlay = YTPlayer.overlay;
            overlay.CSSAnimate({
                opacity: 0
            }, 500, function () {

                YTPlayer.hasMask = false;

                overlay.css({
                    backgroundImage: "",
                    backgroundRepeat: "",
                    backgroundPosition: "",
                    backgroundSize: ""
                });
                overlay.CSSAnimate({
                    opacity: 1
                }, 500);

            });

            return this;

        },
        /**
        *
        * @param YTPlayer
        */
        applyMask: function (YTPlayer) {
            var $YTPlayer = jQuery(YTPlayer);
            $YTPlayer.off("YTPTime.mask");

            if (YTPlayer.opt.mask) {

                if (typeof YTPlayer.opt.mask == "string") {
                    $YTPlayer.YTPAddMask(YTPlayer.opt.mask);

                    YTPlayer.actualMask = YTPlayer.opt.mask;

                } else if (typeof YTPlayer.opt.mask == "object") {

                    for (var time in YTPlayer.opt.mask) {
                        if (YTPlayer.opt.mask[time])
                            var img = jQuery("<img/>").attr("src", YTPlayer.opt.mask[time]);
                    }

                    if (YTPlayer.opt.mask[0])
                        $YTPlayer.YTPAddMask(YTPlayer.opt.mask[0]);

                    $YTPlayer.on("YTPTime.mask", function (e) {
                        for (var time in YTPlayer.opt.mask) {
                            if (e.time == time)
                                if (!YTPlayer.opt.mask[time]) {
                                    $YTPlayer.YTPRemoveMask();
                                } else {

                                    $YTPlayer.YTPAddMask(YTPlayer.opt.mask[time]);
                                    YTPlayer.actualMask = YTPlayer.opt.mask[time];
                                }

                        }
                    });

                }


            }
        },
        /**
        *
        */
        toggleMask: function () {
            var YTPlayer = this.get(0);
            var $YTPlayer = $(YTPlayer);
            if (YTPlayer.hasMask)
                $YTPlayer.YTPRemoveMask();
            else
                $YTPlayer.YTPAddMask();

            return this;
        },
        /**
        *
        * @returns {{totalTime: number, currentTime: number}}
        */
        manageProgress: function () {
            var YTPlayer = this.get(0);
            var controls = jQuery("#controlBar_" + YTPlayer.id);
            var progressBar = controls.find(".mb_YTPProgress");
            var loadedBar = controls.find(".mb_YTPLoaded");
            var timeBar = controls.find(".mb_YTPseekbar");
            var totW = progressBar.outerWidth();
            var currentTime = Math.floor(YTPlayer.player.getCurrentTime());
            var totalTime = Math.floor(YTPlayer.player.getDuration());
            var timeW = (currentTime * totW) / totalTime;
            var startLeft = 0;
            var loadedW = YTPlayer.player.getVideoLoadedFraction() * 100;
            loadedBar.css({
                left: startLeft,
                width: loadedW + "%"
            });
            timeBar.css({
                left: 0,
                width: timeW
            });
            return {
                totalTime: totalTime,
                currentTime: currentTime
            };
        },
        /**
        *
        * @param YTPlayer
        */
        buildControls: function (YTPlayer) {
            var data = YTPlayer.opt;
            // @data.printUrl: is deprecated; use data.showYTLogo
            data.showYTLogo = data.showYTLogo || data.printUrl;

            if (jQuery("#controlBar_" + YTPlayer.id).length)
                return;
            YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                whiteSpace: "noWrap",
                position: YTPlayer.isBackground ? "fixed" : "absolute",
                zIndex: YTPlayer.isBackground ? 10000 : 1000
            }).hide();
            var buttonBar = jQuery("<div/>").addClass("buttonBar");
            /* play/pause button*/
            var playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
                if (YTPlayer.player.getPlayerState() == 1) jQuery(YTPlayer).YTPPause();
                else jQuery(YTPlayer).YTPPlay();
            });
            /* mute/unmute button*/
            var MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
                if (YTPlayer.player.getVolume() == 0) {
                    jQuery(YTPlayer).YTPUnmute();
                } else {
                    jQuery(YTPlayer).YTPMute();
                }
            });
            /* volume bar*/
            var volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({
                display: "inline-block"
            });
            YTPlayer.volumeBar = volumeBar;
            /* time elapsed */
            var idx = jQuery("<span/>").addClass("mb_YTPTime");
            var vURL = data.videoURL ? data.videoURL : "";
            if (vURL.indexOf("http") < 0) vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL;
            var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                window.open(vURL, "viewOnYT")
            });
            var onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                jQuery(YTPlayer).YTPFullscreen(data.realfullscreen);
            });
            var progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (e) {
                timeBar.css({
                    width: (e.clientX - timeBar.offset().left)
                });
                YTPlayer.timeW = e.clientX - timeBar.offset().left;
                YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                    width: 0
                });
                var totalTime = Math.floor(YTPlayer.player.getDuration());
                YTPlayer.goto = (timeBar.outerWidth() * totalTime) / progressBar.outerWidth();
                YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), true);
                YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                    width: 0
                });
            });
            var loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute");
            var timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
            progressBar.append(loadedBar).append(timeBar);
            buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx);
            if (data.showYTLogo) {
                buttonBar.append(movieUrl);
            }
            if (YTPlayer.isBackground || (eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground)) buttonBar.append(onlyVideo);
            YTPlayer.controlBar.append(buttonBar).append(progressBar);
            if (!YTPlayer.isBackground) {
                YTPlayer.controlBar.addClass("inlinePlayer");
                YTPlayer.wrapper.before(YTPlayer.controlBar);
            } else {
                jQuery("body").after(YTPlayer.controlBar);
            }
            volumeBar.simpleSlider({
                initialval: YTPlayer.opt.vol,
                scale: 100,
                orientation: "h",
                callback: function (el) {
                    if (el.value == 0) {
                        jQuery(YTPlayer).YTPMute();
                    } else {
                        jQuery(YTPlayer).YTPUnmute();
                    }
                    YTPlayer.player.setVolume(el.value);
                    if (!YTPlayer.isMute) YTPlayer.opt.vol = el.value;
                }
            });
        },
        /**
        *
        * @param YTPlayer
        */
        checkForState: function (YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 100 : 400;
            clearInterval(YTPlayer.getState);
            //Checking if player has been removed from scene
            if (!jQuery.contains(document, YTPlayer)) {
                jQuery(YTPlayer).YTPPlayerDestroy();
                clearInterval(YTPlayer.getState);
                clearInterval(YTPlayer.checkForStartAt);
                return;
            }

            jQuery.mbYTPlayer.checkForStart(YTPlayer);

            YTPlayer.getState = setInterval(function () {
                var prog = jQuery(YTPlayer).YTPManageProgress();
                var $YTPlayer = jQuery(YTPlayer);
                var data = YTPlayer.opt;
                var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
                var stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0;
                if (YTPlayer.currentTime != prog.currentTime) {

                    var YTPEvent = jQuery.Event("YTPTime");
                    YTPEvent.time = YTPlayer.currentTime;
                    jQuery(YTPlayer).trigger(YTPEvent);

                }
                YTPlayer.currentTime = prog.currentTime;
                YTPlayer.totalTime = YTPlayer.player.getDuration();
                if (YTPlayer.player.getVolume() == 0) $YTPlayer.addClass("isMuted");
                else $YTPlayer.removeClass("isMuted");

                if (YTPlayer.opt.showControls)
                    if (prog.totalTime) {
                        YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime));
                    } else {
                        YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --");
                    }

                if (eval(YTPlayer.opt.stopMovieOnBlur)) {
                    if (!document.hasFocus()) {
                        if (YTPlayer.state == 1) {
                            YTPlayer.hasFocus = false;
                            $YTPlayer.YTPPause();
                        }
                    } else if (document.hasFocus() && !YTPlayer.hasFocus && !(YTPlayer.state == -1 || YTPlayer.state == 0)) {
                        YTPlayer.hasFocus = true;
                        $YTPlayer.YTPPlay();
                    }
                }

                if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact) {
                    YTPlayer.controlBar.addClass("compact");
                    YTPlayer.isCompact = true;
                    if (!YTPlayer.isMute && YTPlayer.volumeBar) YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol);
                } else if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact) {
                    YTPlayer.controlBar.removeClass("compact");
                    YTPlayer.isCompact = false;
                    if (!YTPlayer.isMute && YTPlayer.volumeBar) YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol);
                }
                if (YTPlayer.player.getPlayerState() == 1 && (parseFloat(YTPlayer.player.getDuration() - 1.5) < YTPlayer.player.getCurrentTime() || (stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt))) {
                    if (YTPlayer.isEnded) return;
                    YTPlayer.isEnded = true;
                    setTimeout(function () {
                        YTPlayer.isEnded = false
                    }, 1000);

                    if (YTPlayer.isPlayList) {

                        if (!data.loop || (data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1)) {

                            YTPlayer.player.loopTime = undefined;
                            clearInterval(YTPlayer.getState);
                            var YTPEnd = jQuery.Event("YTPEnd");
                            YTPEnd.time = YTPlayer.currentTime;
                            jQuery(YTPlayer).trigger(YTPEnd);
                            //YTPlayer.state = 0;

                            return;
                        }

                    } else if (!data.loop || (data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1)) {

                        YTPlayer.player.loopTime = undefined;
                        YTPlayer.preventTrigger = true;
                        YTPlayer.state = 2;
                        jQuery(YTPlayer).YTPPause();

                        YTPlayer.wrapper.CSSAnimate({
                            opacity: 0
                        }, 500, function () {

                            if (YTPlayer.controlBar.length)
                                YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);

                            var YTPEnd = jQuery.Event("YTPEnd");
                            YTPEnd.time = YTPlayer.currentTime;
                            jQuery(YTPlayer).trigger(YTPEnd);

                            YTPlayer.player.seekTo(startAt, true);
                            if (!YTPlayer.isBackground) {
                                YTPlayer.opt.containment.css({
                                    //background: "rgba(0,0,0,0.5) url(" + YTPlayer.opt.backgroundUrl + ") center center",
                                    //backgroundSize: "cover"
                                });
                            }
                        });

                        return;

                    }

                    YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1;
                    startAt = startAt || 1;
                    YTPlayer.preventTrigger = true;
                    YTPlayer.state = 2;
                    jQuery(YTPlayer).YTPPause();
                    YTPlayer.player.seekTo(startAt, true);
                    $YTPlayer.YTPPlay();


                }
            }, interval);
        },
        /**
        *
        * @returns {string} time
        */
        getTime: function () {
            var YTPlayer = this.get(0);
            return jQuery.mbYTPlayer.formatTime(YTPlayer.currentTime);
        },
        /**
        *
        * @returns {string} total time
        */
        getTotalTime: function () {
            var YTPlayer = this.get(0);
            return jQuery.mbYTPlayer.formatTime(YTPlayer.totalTime);
        },
        /**
        *
        * @param YTPlayer
        */
        checkForStart: function (YTPlayer) {

            var $YTPlayer = jQuery(YTPlayer);

            //Checking if player has been removed from scene
            if (!jQuery.contains(document, YTPlayer)) {
                jQuery(YTPlayer).YTPPlayerDestroy();
                return
            }

            /*
            if( jQuery.browser.chrome )
            YTPlayer.opt.quality = "default";
            */

            YTPlayer.preventTrigger = true;
            YTPlayer.state = 2
            jQuery(YTPlayer).YTPPause();

            jQuery(YTPlayer).muteYTPVolume();
            jQuery("#controlBar_" + YTPlayer.id).remove();

            YTPlayer.controlBar = false;

            if (YTPlayer.opt.showControls)
                jQuery.mbYTPlayer.buildControls(YTPlayer);

            if (YTPlayer.opt.addRaster) {

                var classN = YTPlayer.opt.addRaster == "dot" ? "raster-dot" : "raster";
                YTPlayer.overlay.addClass(YTPlayer.isRetina ? classN + " retina" : classN);

            } else {

                YTPlayer.overlay.removeClass(function (index, classNames) {
                    // change the list into an array
                    var current_classes = classNames.split(" "),
                    // array of classes which are to be removed
						classes_to_remove = [];
                    jQuery.each(current_classes, function (index, class_name) {
                        // if the classname begins with bg add it to the classes_to_remove array
                        if (/raster.*/.test(class_name)) {
                            classes_to_remove.push(class_name);
                        }
                    });
                    classes_to_remove.push("retina");
                    // turn the array back into a string
                    return classes_to_remove.join(" ");
                })

            }

            var startAt = YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
			YTPlayer.player.unMute();
            YTPlayer.player.playVideo();
            YTPlayer.player.seekTo(startAt, true);

            YTPlayer.checkForStartAt = setInterval(function () {

                jQuery(YTPlayer).YTPMute();

                var canPlayVideo = YTPlayer.player.getVideoLoadedFraction() >= startAt / YTPlayer.player.getDuration();

                if (YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo) {

                    //YTPlayer.player.playVideo();
                    //console.timeEnd( "checkforStart" );

                    clearInterval(YTPlayer.checkForStartAt);

                    if (typeof YTPlayer.opt.onReady == "function")
                        YTPlayer.opt.onReady(YTPlayer);

                    YTPlayer.isReady = true;
                    var YTPready = jQuery.Event("YTPReady");
                    YTPready.time = YTPlayer.currentTime;
                    jQuery(YTPlayer).trigger(YTPready);


                    YTPlayer.preventTrigger = true;
                    YTPlayer.state = 2;
                    jQuery(YTPlayer).YTPPause();

                    if (!YTPlayer.opt.mute) jQuery(YTPlayer).YTPUnmute();
                    YTPlayer.canTrigger = true;

                    if (YTPlayer.opt.autoPlay) {


                        var YTPStart = jQuery.Event("YTPStart");
                        YTPStart.time = YTPlayer.currentTime;
                        jQuery(YTPlayer).trigger(YTPStart);

                        $YTPlayer.css("background-image", "none");
                        jQuery(YTPlayer.playerEl).CSSAnimate({
                            opacity: 1
                        }, 1000);

                        $YTPlayer.YTPPlay();

                        YTPlayer.wrapper.CSSAnimate({
                            opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                        }, 1000);

                        /* Fix for Safari freeze */
                        if (jQuery.browser.safari) {

                            YTPlayer.safariPlay = setInterval(function () {

                                if (YTPlayer.state != 1)
                                    $YTPlayer.YTPPlay();
                                else
                                    clearInterval(YTPlayer.safariPlay)
                            }, 10)
                        }
                        $YTPlayer.on("YTPReady", function () {
                            $YTPlayer.YTPPlay();
                        });

                    } else {

                        //$YTPlayer.YTPPause();
                        YTPlayer.player.pauseVideo();
                        if (!YTPlayer.isPlayer) {
                            jQuery(YTPlayer.playerEl).CSSAnimate({
                                opacity: 1
                            }, 500);

                            YTPlayer.wrapper.CSSAnimate({
                                opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                            }, 500);
                        }

                        if (YTPlayer.controlBar.length)
                            YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);

                    }

                    if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay && (YTPlayer.loading && YTPlayer.loading.length)) {
                        YTPlayer.loading.html("Ready");
                        setTimeout(function () {
                            YTPlayer.loading.fadeOut();
                        }, 100)
                    }

                    if (YTPlayer.controlBar && YTPlayer.controlBar.length)
                        YTPlayer.controlBar.slideDown(1000);

                } else if (jQuery.browser.safari) {
				YTPlayer.player.unMute();
                    YTPlayer.player.playVideo();
                    if (startAt >= 0) YTPlayer.player.seekTo(startAt, true);
                }

            }, 1);

        },
        /**
        *
        * @param align
        */
        setAlign: function (align) {
            var $YTplayer = this;

            $YTplayer.optimizeDisplay(align);
        },
        /**
        *
        * @param align
        */
        getAlign: function () {
            var YTPlayer = this.get(0);
            return YTPlayer.opt.align;
        },
        /**
        *
        * @param s
        * @returns {string}
        */
        formatTime: function (s) {
            var min = Math.floor(s / 60);
            var sec = Math.floor(s - (60 * min));
            return (min <= 9 ? "0" + min : min) + " : " + (sec <= 9 ? "0" + sec : sec);
        }
    };

    /**
    *
    * @param align
    * can be center, top, bottom, right, left; (default is center,center)
    */
    jQuery.fn.optimizeDisplay = function (align) {
        var YTPlayer = this.get(0);
        var playerBox = jQuery(YTPlayer.playerEl);
        var vid = {};

        YTPlayer.opt.align = align || YTPlayer.opt.align;

        YTPlayer.opt.align = typeof YTPlayer.opt.align != "undefined " ? YTPlayer.opt.align : "center,center";
        var YTPAlign = YTPlayer.opt.align.split(",");

        //data.optimizeDisplay = YTPlayer.isPlayer ? false : data.optimizeDisplay;

        if (YTPlayer.opt.optimizeDisplay) {
            var win = {};
            var el = YTPlayer.wrapper;

            win.width = el.outerWidth();
            win.height = el.outerHeight();

            vid.width = win.width;
            vid.height = YTPlayer.opt.ratio == "16/9" ? Math.ceil(win.width * (9 / 16)) : Math.ceil(win.width * (3 / 4));

            vid.width = win.width;
            vid.height = YTPlayer.opt.ratio == "16/9" ? Math.ceil(win.width * (9 / 16)) : Math.ceil(win.width * (3 / 4));

            vid.marginTop = -((vid.height - win.height) / 2);
            vid.marginLeft = 0;

            var lowest = vid.height < win.height;

            if (lowest) {

                vid.height = win.height;
                vid.width = YTPlayer.opt.ratio == "16/9" ? Math.floor(win.height * (16 / 9)) : Math.floor(win.height * (4 / 3));

                vid.marginTop = 0;
                vid.marginLeft = -((vid.width - win.width) / 2);

            }

            for (var a in YTPAlign) {

                var al = YTPAlign[a].trim();

                switch (al) {

                    case "top":
                        vid.marginTop = lowest ? -((vid.height - win.height) / 2) : 0;
                        break;

                    case "bottom":
                        vid.marginTop = lowest ? 0 : -(vid.height - win.height);
                        break;

                    case "left":
                        vid.marginLeft = 0;
                        break;

                    case "right":
                        vid.marginLeft = lowest ? -(vid.width - win.width) : 0;
                        break;

                    default:
                        break;
                }

            }

        } else {
            vid.width = "100%";
            vid.height = "100%";
            vid.marginTop = 0;
            vid.marginLeft = 0;
        }

        playerBox.css({
            width: vid.width,
            height: vid.height,
            marginTop: vid.marginTop,
            marginLeft: vid.marginLeft
        });

    };
    /**
    *
    * @param arr
    * @returns {Array|string|Blob|*}
    *
    */
    jQuery.shuffle = function (arr) {
        var newArray = arr.slice();
        var len = newArray.length;
        var i = len;
        while (i--) {
            var p = parseInt(Math.random() * len);
            var t = newArray[i];
            newArray[i] = newArray[p];
            newArray[p] = t;
        }
        return newArray;
    };

    jQuery.fn.unselectable = function () {
        return this.each(function () {
            jQuery(this).css({
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).attr("unselectable", "on");
        });
    };


    /* Exposed public method */
    jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer;
    jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer;
    jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID;
    jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie;
    jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy;

    jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play;
    jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay;
    jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop;
    jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause;
    jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo;

    jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist;
    jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext;
    jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev;
    jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex;

    jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute;
    jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute;
    jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume;
    jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume;

    jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData;
    jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen;
    jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops;
    jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
    jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress;

    jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter;
    jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters;
    jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter;
    jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters;
    jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter;
    jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters;
    jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters;
    jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters;

    jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime;
    jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime;

    jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask;
    jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask;
    jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask;

    jQuery.fn.YTPSetAlign = jQuery.mbYTPlayer.setAlign;
    jQuery.fn.YTPGetAlign = jQuery.mbYTPlayer.getAlign;


    /**
    *
    * @deprecated
    * todo: Above methods will be removed with version 3.5.0
    *
    **/
    jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer;
    jQuery.fn.playNext = jQuery.mbYTPlayer.playNext;
    jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev;
    jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie;
    jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID;
    jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer;
    jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy;
    jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen;
    jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls;
    jQuery.fn.playYTP = jQuery.mbYTPlayer.play;
    jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops;
    jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop;
    jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause;
    jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo;
    jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute;
    jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute;
    jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume;
    jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality;
    jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress;
    jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData;


})(jQuery, ytp);
;
/*
* ******************************************************************************
*  jquery.mb.components
*  file: jquery.mb.CSSAnimate.min.js
*
*  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
*  Open lab srl, Firenze - Italy
*  email: matteo@open-lab.com
*  site: 	http://pupunzi.com
*  blog:	http://pupunzi.open-lab.com
* 	http://open-lab.com
*
*  Licences: MIT, GPL
*  http://www.opensource.org/licenses/mit-license.php
*  http://www.gnu.org/licenses/gpl.html
*
*  last modified: 26/03/14 21.40
*  *****************************************************************************
*/

function uncamel(e) { return e.replace(/([A-Z])/g, function (e) { return "-" + e.toLowerCase() }) } function setUnit(e, t) { return "string" != typeof e || e.match(/^[\-0-9\.]+jQuery/) ? "" + e + t : e } function setFilter(e, t, r) { var i = uncamel(t), n = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx; e[n + "filter"] = e[n + "filter"] || "", r = setUnit(r > jQuery.CSS.filters[t].max ? jQuery.CSS.filters[t].max : r, jQuery.CSS.filters[t].unit), e[n + "filter"] += i + "(" + r + ") ", delete e[t] } jQuery.support.CSStransition = function () { var e = document.body || document.documentElement, t = e.style; return void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition } (), jQuery.CSS = { name: "mb.CSSAnimate", author: "Matteo Bicocchi", version: "2.0.0", transitionEnd: "transitionEnd", sfx: "", filters: { blur: { min: 0, max: 100, unit: "px" }, brightness: { min: 0, max: 400, unit: "%" }, contrast: { min: 0, max: 400, unit: "%" }, grayscale: { min: 0, max: 100, unit: "%" }, hueRotate: { min: 0, max: 360, unit: "deg" }, invert: { min: 0, max: 100, unit: "%" }, saturate: { min: 0, max: 400, unit: "%" }, sepia: { min: 0, max: 100, unit: "%"} }, normalizeCss: function (e) { var t = jQuery.extend(!0, {}, e); jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-"); for (var r in t) { "transform" === r && (t[jQuery.CSS.sfx + "transform"] = t[r], delete t[r]), "transform-origin" === r && (t[jQuery.CSS.sfx + "transform-origin"] = e[r], delete t[r]), "filter" !== r || jQuery.browser.mozilla || (t[jQuery.CSS.sfx + "filter"] = e[r], delete t[r]), "blur" === r && setFilter(t, "blur", e[r]), "brightness" === r && setFilter(t, "brightness", e[r]), "contrast" === r && setFilter(t, "contrast", e[r]), "grayscale" === r && setFilter(t, "grayscale", e[r]), "hueRotate" === r && setFilter(t, "hueRotate", e[r]), "invert" === r && setFilter(t, "invert", e[r]), "saturate" === r && setFilter(t, "saturate", e[r]), "sepia" === r && setFilter(t, "sepia", e[r]); var i = ""; "x" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateX(" + setUnit(e[r], "px") + ")", delete t[r]), "y" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateY(" + setUnit(e[r], "px") + ")", delete t[r]), "z" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " translateZ(" + setUnit(e[r], "px") + ")", delete t[r]), "rotate" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotate(" + setUnit(e[r], "deg") + ")", delete t[r]), "rotateX" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateX(" + setUnit(e[r], "deg") + ")", delete t[r]), "rotateY" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateY(" + setUnit(e[r], "deg") + ")", delete t[r]), "rotateZ" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " rotateZ(" + setUnit(e[r], "deg") + ")", delete t[r]), "scale" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scale(" + setUnit(e[r], "") + ")", delete t[r]), "scaleX" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleX(" + setUnit(e[r], "") + ")", delete t[r]), "scaleY" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleY(" + setUnit(e[r], "") + ")", delete t[r]), "scaleZ" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " scaleZ(" + setUnit(e[r], "") + ")", delete t[r]), "skew" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skew(" + setUnit(e[r], "deg") + ")", delete t[r]), "skewX" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skewX(" + setUnit(e[r], "deg") + ")", delete t[r]), "skewY" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " skewY(" + setUnit(e[r], "deg") + ")", delete t[r]), "perspective" === r && (i = jQuery.CSS.sfx + "transform", t[i] = t[i] || "", t[i] += " perspective(" + setUnit(e[r], "px") + ")", delete t[r]) } return t }, getProp: function (e) { var t = []; for (var r in e) t.indexOf(r) < 0 && t.push(uncamel(r)); return t.join(",") }, animate: function (e, t, r, i, n) { return this.each(function () { function s() { u.called = !0, u.CSSAIsRunning = !1, a.off(jQuery.CSS.transitionEnd + "." + u.id), clearTimeout(u.timeout), a.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof n && n.apply(u), "function" == typeof u.CSSqueue && (u.CSSqueue(), u.CSSqueue = null) } var u = this, a = jQuery(this); u.id = u.id || "CSSA_" + (new Date).getTime(); var o = o || { type: "noEvent" }; if (u.CSSAIsRunning && u.eventType == o.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void (u.CSSqueue = function () { a.CSSAnimate(e, t, r, i, n) }); if (u.CSSqueue = null, u.eventType = o.type, 0 !== a.length && e) { if (e = jQuery.normalizeCss(e), u.CSSAIsRunning = !0, "function" == typeof t && (n = t, t = jQuery.fx.speeds._default), "function" == typeof r && (i = r, r = 0), "string" == typeof r && (n = r, r = 0), "function" == typeof i && (n = i, i = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof t) for (var f in jQuery.fx.speeds) { if (t == f) { t = jQuery.fx.speeds[f]; break } t = jQuery.fx.speeds._default } if (t || (t = jQuery.fx.speeds._default), "string" == typeof n && (i = n, n = null), !jQuery.support.CSStransition) { for (var c in e) { if ("transform" === c && delete e[c], "filter" === c && delete e[c], "transform-origin" === c && delete e[c], "auto" === e[c] && delete e[c], "x" === c) { var S = e[c], l = "left"; e[l] = S, delete e[c] } if ("y" === c) { var S = e[c], l = "top"; e[l] = S, delete e[c] } ("-ms-transform" === c || "-ms-filter" === c) && delete e[c] } return void a.delay(r).animate(e, t, n) } var y = { "default": "ease", "in": "ease-in", out: "ease-out", "in-out": "ease-in-out", snap: "cubic-bezier(0,1,.5,1)", easeOutCubic: "cubic-bezier(.215,.61,.355,1)", easeInOutCubic: "cubic-bezier(.645,.045,.355,1)", easeInCirc: "cubic-bezier(.6,.04,.98,.335)", easeOutCirc: "cubic-bezier(.075,.82,.165,1)", easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)", easeInExpo: "cubic-bezier(.95,.05,.795,.035)", easeOutExpo: "cubic-bezier(.19,1,.22,1)", easeInOutExpo: "cubic-bezier(1,0,0,1)", easeInQuad: "cubic-bezier(.55,.085,.68,.53)", easeOutQuad: "cubic-bezier(.25,.46,.45,.94)", easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)", easeInQuart: "cubic-bezier(.895,.03,.685,.22)", easeOutQuart: "cubic-bezier(.165,.84,.44,1)", easeInOutQuart: "cubic-bezier(.77,0,.175,1)", easeInQuint: "cubic-bezier(.755,.05,.855,.06)", easeOutQuint: "cubic-bezier(.23,1,.32,1)", easeInOutQuint: "cubic-bezier(.86,0,.07,1)", easeInSine: "cubic-bezier(.47,0,.745,.715)", easeOutSine: "cubic-bezier(.39,.575,.565,1)", easeInOutSine: "cubic-bezier(.445,.05,.55,.95)", easeInBack: "cubic-bezier(.6,-.28,.735,.045)", easeOutBack: "cubic-bezier(.175, .885,.32,1.275)", easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)" }; y[i] && (i = y[i]), a.off(jQuery.CSS.transitionEnd + "." + u.id); var m = jQuery.CSS.getProp(e), d = {}; jQuery.extend(d, e), d[jQuery.CSS.sfx + "transition-property"] = m, d[jQuery.CSS.sfx + "transition-duration"] = t + "ms", d[jQuery.CSS.sfx + "transition-delay"] = r + "ms", d[jQuery.CSS.sfx + "transition-timing-function"] = i, setTimeout(function () { a.one(jQuery.CSS.transitionEnd + "." + u.id, s), a.css(d) }, 1), u.timeout = setTimeout(function () { return u.called || !n ? (u.called = !1, void (u.CSSAIsRunning = !1)) : (a.css(jQuery.CSS.sfx + "transition", ""), n.apply(u), u.CSSAIsRunning = !1, void ("function" == typeof u.CSSqueue && (u.CSSqueue(), u.CSSqueue = null))) }, t + r + 10) } }) } }, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (e) { return this.each(function () { var t = jQuery(this), r = jQuery.normalizeCss(e); t.css(r) }) };
; /*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.browser.min.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 26/03/14 21.43
 *  *****************************************************************************
 */

var nAgt = navigator.userAgent; if (!jQuery.browser) { jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.ua = nAgt, jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10); var nameOffset, verOffset, ix; if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident") || -1 != nAgt.indexOf("Edge")) { jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer"; var start = nAgt.indexOf("rv:") + 3, end = start + 4; jQuery.browser.fullVersion = nAgt.substring(start, end) } else-1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : nAgt.indexOf("mozilla/5.0") > -1 && nAgt.indexOf("android ") > -1 && nAgt.indexOf("applewebkit") > -1 && !(nAgt.indexOf("chrome") > -1) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName)); -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion } jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765, jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt);
; /*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.simpleSlider.min.js                                                                                                              _
 _ last modified: 16/05/15 23.45                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

!function (e) { var t = (/iphone|ipod|ipad|android|ie|blackberry|fennec/.test(navigator.userAgent.toLowerCase()), "ontouchstart" in window || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof DocumentTouch || !1); e.simpleSlider = { defaults: { initialval: 0, scale: 100, orientation: "h", readonly: !1, callback: !1 }, events: { start: t ? "touchstart" : "mousedown", end: t ? "touchend" : "mouseup", move: t ? "touchmove" : "mousemove" }, init: function (o) { return this.each(function () { var a = this, l = e(a); l.addClass("simpleSlider"), a.opt = {}, e.extend(a.opt, e.simpleSlider.defaults, o), e.extend(a.opt, l.data()); var i = "h" == a.opt.orientation ? "horizontal" : "vertical", n = e("<div/>").addClass("level").addClass(i); l.prepend(n), a.level = n, l.css({ cursor: "default" }), "auto" == a.opt.scale && (a.opt.scale = e(a).outerWidth()), l.updateSliderVal(), a.opt.readonly || (l.on(e.simpleSlider.events.start, function (e) { t && (e = e.changedTouches[0]), a.canSlide = !0, l.updateSliderVal(e), l.css({ cursor: "col-resize" }), e.preventDefault(), e.stopPropagation() }), e(document).on(e.simpleSlider.events.move, function (o) { t && (o = o.changedTouches[0]), a.canSlide && (e(document).css({ cursor: "default" }), l.updateSliderVal(o), o.preventDefault(), o.stopPropagation()) }).on(e.simpleSlider.events.end, function () { e(document).css({ cursor: "auto" }), a.canSlide = !1, l.css({ cursor: "auto" }) })) }) }, updateSliderVal: function (t) { function o(e, t) { return Math.floor(100 * e / t) } var a = this, l = a.get(0); if (l.opt) { l.opt.initialval = "number" == typeof l.opt.initialval ? l.opt.initialval : l.opt.initialval(l); var i = e(l).outerWidth(), n = e(l).outerHeight(); l.x = "object" == typeof t ? t.clientX + document.body.scrollLeft - a.offset().left : "number" == typeof t ? t * i / l.opt.scale : l.opt.initialval * i / l.opt.scale, l.y = "object" == typeof t ? t.clientY + document.body.scrollTop - a.offset().top : "number" == typeof t ? (l.opt.scale - l.opt.initialval - t) * n / l.opt.scale : l.opt.initialval * n / l.opt.scale, l.y = a.outerHeight() - l.y, l.scaleX = l.x * l.opt.scale / i, l.scaleY = l.y * l.opt.scale / n, l.outOfRangeX = l.scaleX > l.opt.scale ? l.scaleX - l.opt.scale : l.scaleX < 0 ? l.scaleX : 0, l.outOfRangeY = l.scaleY > l.opt.scale ? l.scaleY - l.opt.scale : l.scaleY < 0 ? l.scaleY : 0, l.outOfRange = "h" == l.opt.orientation ? l.outOfRangeX : l.outOfRangeY, "undefined" != typeof t ? l.value = "h" == l.opt.orientation ? l.x >= a.outerWidth() ? l.opt.scale : l.x <= 0 ? 0 : l.scaleX : l.y >= a.outerHeight() ? l.opt.scale : l.y <= 0 ? 0 : l.scaleY : l.value = "h" == l.opt.orientation ? l.scaleX : l.scaleY, "h" == l.opt.orientation ? l.level.width(o(l.x, i) + "%") : l.level.height(o(l.y, n)), "function" == typeof l.opt.callback && l.opt.callback(l) } } }, e.fn.simpleSlider = e.simpleSlider.init, e.fn.updateSliderVal = e.simpleSlider.updateSliderVal } (jQuery);
; /*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.storage.min.js                                                                                                                   _
 _ last modified: 24/05/15 16.08                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

    !function (a) { a.mbCookie = { set: function (a, b, c, d) { b = JSON.stringify(b), c || (c = 7), d = d ? "; domain=" + d : ""; var f, e = new Date; e.setTime(e.getTime() + 1e3 * 60 * 60 * 24 * c), f = "; expires=" + e.toGMTString(), document.cookie = a + "=" + b + f + "; path=/" + d }, get: function (a) { for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) { for (var e = c[d]; " " == e.charAt(0);) e = e.substring(1, e.length); if (0 == e.indexOf(b)) return JSON.parse(e.substring(b.length, e.length)) } return null }, remove: function (b) { a.mbCookie.set(b, "", -1) } }, a.mbStorage = { set: function (a, b) { b = JSON.stringify(b), localStorage.setItem(a, b) }, get: function (a) { return localStorage[a] ? JSON.parse(localStorage[a]) : null }, remove: function (a) { a ? localStorage.removeItem(a) : localStorage.clear() } } }(jQuery);
}