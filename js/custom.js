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

		// $(".grid figure").on('click', function() {
		// 	$("#navbar-collapse-toggle").addClass('hide-header');
		// });

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
		// const firebaseConfig = {
		// 	apiKey: "AIzaSyAwoTXZUAi7yDLDj2w9jSTmTVI_epeB8co",
		// 	authDomain: "mustaphaport-6dee7.firebaseapp.com",
		// 	projectId: "mustaphaport-6dee7",
		// 	storageBucket: "mustaphaport-6dee7.appspot.com",
		// 	messagingSenderId: "437671133745",
		// 	appId: "1:437671133745:web:f3b15036edf6665c740b10"
		// };
		// // Initialize Firebase
		// firebase.initializeApp(firebaseConfig);
		//
		// // Refernece contactInfo collections
		// var contactInfo = firebase.database().ref("infos");

		function submitForm(e) {
			e.preventDefault();
		
			//   Get input Values
			let name = document.querySelector(".name").value;
			let email = document.querySelector(".email").value;
			let subject = document.querySelector(".subject").value;
			let message = document.querySelector(".message").value;
			console.log(name, email, message);

			// saveMessage(name, email, subject, message);

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
		function saveMessage(name, email, subject, message){
			contactInfo
				.add({
					name: name,
					email: email,
					subject: subject,
					message: message,
				})
				.then(function (docRef) {
					console.log("Document written with ID: ", docRef.id);
					console.log(email);
				})
				.catch(function (error) {
					console.error("Error adding docum	ent: ", error);
				});
		}

		//Send Email Info
		function sendEmail(name, email, subject, message){

		}

		// Listen for a submit
		document.querySelector(".contactform").addEventListener("submit", function(e){
			e.preventDefault(); // Prevent the default form submission
			if (navigator.onLine) {

				try {
					// Send the email or perform your desired action here
					// You can call your sendEmail function here
					//   Get input Values
					let name = document.querySelector(".name").value;
					let email = document.querySelector(".email").value;
					let subject = document.querySelector(".subject").value;
					let message = document.querySelector(".message").value;
					console.log(name, email, message);

					// saveMessage(name, email, subject, message);

					document.querySelector(".contactform").reset();
					Email.send({
						Host : "smtp.elasticemail.com",
						Username : "stoph.boutzoua@gmail.com",
						Password : "218287FA0B66A8A95C3E446F2CEF920586A8",
						To: "stoph.boutzoua@gmail.com",
						From: "stoph.boutzoua@gmail.com",
						Subject: subject,
						Body: `**Name: ${name} <br/> **Email: ${email} <br/> **Message: <br/> <br/>${message}`,

					}).then(
						message => alert(message)
					);
					// Display "Sending..." message
					$(".output_message").text("Sending...");

					// Display success message
					$(".form-inputs").css("display", "none");
					$(".box p").css("display", "none");
					$(".contactform").find(".output_message").addClass("success");
					$(".output_message").text("Message Sent!");
				} catch (error) {
					// Handle any errors here
					console.error("Error sending message:", error);
					$(".contactform").find(".output_message").addClass("error");
					$(".output_message").text("Error Sending! Please try again later.");
				} finally {
					// Clear the message after a delay
					setTimeout(() => {
						$(".contactform").find(".output_message").removeClass("success error");
						$(".output_message").text("");
					}, 4000); // Adjust the delay as needed
				}
			} else {
				// User is offline, display error message
				$(".tabs-container").css("height", "440px");
				$(".contactform").find(".output_message").addClass("error");
				$(".output_message").text("Error Sending! Check your internet connection...");

				// Check for online status every 4 seconds
				setInterval(() => {
					if (navigator.onLine) {
						$(".contactform").find(".output_message").removeClass("error");
						$(".output_message").text("");
					}
				}, 4000);
			}
		});
		//
		//    $(".contactform").on("submit", function() {
		// 	// const yourDataRequestFunction = async () => {
		// 	// 	const online = await checkOnlineStatus();
		// 	// 	if (online) {
		// 	// 		console.log("conn chaa3la")
		// 	// 		return true;
		// 	// 	}else{
		// 	// 		return false;
		// 	// 	}
		// 	// }
		//
		//
		// 	var form = $(this);
		// 	$.ajax({
		// 		url: form.attr("action"),
		// 		method: form.attr("method"),
		// 		data: form.serialize(),
		// 		success: function(result) {
		// 			if (result == "success") {
		// 				// $(".form-inputs").css("display", "none");
		// 				// $(".box p").css("display", "none");
		// 				// $(".contactform").find(".output_message").addClass("success");
		// 				// $(".output_message").text("Message Sent!");
		// 			} else {
		// 				$(".tabs-container").css("height", "440px");
		//
		// 				$(".contactform").find(".output_message").addClass("error");
		// 				$(".output_message").text("Error Sending!");
		// 			}
		// 		}
		// 	});
		//
		// 	return false;
		// });

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
