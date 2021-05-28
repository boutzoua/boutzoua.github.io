(function($) {

	"use strict";

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

	function stop_videos() {
		var video = document.getElementById("video");
		if (video.paused !== true && video.ended !== true) {
			video.pause();
		}
		$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	}

	$(document).ready(function() {

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
        /* ----------------------------------------------------------- */

		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

		$(".revealator-delay1").addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		}

		/* ----------------------------------------------------------- */
		/*  BUTTONS ANIMATION
        /* ----------------------------------------------------------- */
		function checkSize() {
			if ($( document ).width() > 992) {
				var btn_hover = "";
				$(".btn").each(function() {
					var btn_text = $(this).text();
					$(this).addClass(btn_hover).empty().append("<span data-hover='" + btn_text + "'>" + btn_text + "</span>");
				});
			}
		}
		checkSize();
		window.addEventListener('resize', function () {
			checkSize();
		});

		/* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

		$(".grid figure").on('click', function() {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

		$(".nav-close").on('click', function() {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */
		  	// Your web app's Firebase configuration
		var firebaseConfig = {
			apiKey: "AIzaSyDnQRLw_I0Dv-xtLn2D4vdQ8VrP5GWIbko",
			authDomain: "send-email-b9317.firebaseapp.com",
			projectId: "send-email-b9317",
			storageBucket: "send-email-b9317.appspot.com",
			messagingSenderId: "198683175873",
			appId: "1:198683175873:web:00b6b9969c6c2f06ec5d40"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		
		// Refernece contactInfo collections
		let contactInfo = firebase.database().ref("infos");
		
		// Listen for a submit
		document.querySelector(".contactform").addEventListener("submit", submitForm);
		
		function submitForm(e) {
			e.preventDefault();
		
			//   Get input Values
			let name = document.querySelector(".name").value;
			let email = document.querySelector(".email").value;
			let subject = document.querySelector(".subject").value;
			let message = document.querySelector(".message").value;
			console.log(name, email, message);
		
			saveContactInfo(name, email, subject, message);
		
			document.querySelector(".contactform").reset();
			sendEmail(name, email, subject, message);
		}
		
		// Save infos to Firebase
		function saveContactInfo(name, email, subject, message) {
			let newContactInfo = contactInfo.push();
		
			newContactInfo.set({
			name: name,
			email: email,
			subject: subject,
			message: message,
			});
		}

		//Send Email Info
		function sendEmail(name, email, subject, message){
			Email.send({
				Host: "smtp.gmail.com",
				Username: "m.boutzoua01@gmail.com",
				Password: "mdkfzoxajulfhhda",
				To: "m.boutzoua01@gmail.com",
				From: email,
				Subject: subject,
				Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,

			})
		}
		   $(".contactform").on("submit", function() {
			const yourDataRequestFunction = async () => {
				const online = await checkOnlineStatus();
				if (online) {
					console.log("conn chaa3la")
					return true;
				}else{	
					return false;
				}
			}
			if(navigator.onLine){
				$(".output_message").text("Sending...");
				setTimeout(()=>{$(".form-inputs").css("display", "none");
				$(".box p").css("display", "none");
				$(".contactform").find(".output_message").addClass("success");
				$(".output_message").text("Message Sent!");},2000)
				setTimeout(()=>{$(".contactform").find(".output_message").removeClass("success");$(".output_message").text("")},6000)
			}else{
				$(".tabs-container").css("height", "440px");

				$(".contactform").find(".output_message").addClass("error");
				$(".output_message").text("Error Sending! check connection...");
				// setTimeout(()=>{$(".contactform").find(".output_message").removeClass("error");
				// $(".output_message").text("")},2000)
				setInterval(()=>{if(navigator.onLine){$(".contactform").find(".output_message").removeClass("error");$(".output_message").text("")}},4000)	
			}

			var form = $(this);
			$.ajax({
				url: form.attr("action"),
				method: form.attr("method"),
				data: form.serialize(),
				success: function(result) {
					if (result == "success") {
						// $(".form-inputs").css("display", "none");
						// $(".box p").css("display", "none");
						// $(".contactform").find(".output_message").addClass("success");
						// $(".output_message").text("Message Sent!");
					} else {
						$(".tabs-container").css("height", "440px");

						$(".contactform").find(".output_message").addClass("error");
						$(".output_message").text("Error Sending!");
					}
				}
			});

			return false;
		});

	});

	$(document).keyup(function(e) {

		/* ----------------------------------------------------------- */
		/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
		if (e.keyCode === 27) {
			stop_videos();
			$('.close-content').click();
			$("#navbar-collapse-toggle").removeClass('hide-header');
		}
		if ((e.keyCode === 37) || (e.keyCode === 39)) {
			stop_videos();
		}
	});


})(jQuery);
