$(document).ready(function() {

	function view() {

		var that = this;

		that.userName = ko.observable('');
		that.message = ko.observable('');
		that.messageID = ko.observable(0);
		that.chatContent = ko.observable('');
		that.requestingXHR = ko.observable(null);
		
		var doRequest = false;

		that.joinChat = function() {
			if (that.userName().trim() != '') {
				doRequest = true;
				requestMessages();
			}
		}

		function requestMessages() {
			if (!doRequest) {
				return;
			}
			var form = $("#join");
			that.requestingXHR($.ajax({
                url : form.attr("action"),
                type : "GET",
                data : form.serialize(),
                cache: false,
				success : function(messages) {
					for ( var i = 0; i < messages.length; i++) {
						that.chatContent(that.chatContent() + messages[i] + "\n");
						that.messageID(that.messageID() + 1);
					}
				},
				error : function(xhr) {
					if (xhr.status = 503) {
						resetUI();
						console.error("Request dropped down. 503");
					}
				},
				complete : requestMessages
			}));
			$('#message').focus();
		}

		that.postMessages = function() {
			if (that.message().trim() != '') {

                var form = $("#post");
				$.ajax({url : form.attr("action"), type : "POST",
				  data : "message=" + that.userName() +" >| " + $("#post input[name=message]").val(),
					error : function(xhr) {
						console.error("Post message failure");
					}
				});

				that.message('');
			}
		}

		that.leaveChat = function() {
			that.requestingXHR(null);
			resetUI();
			this.userName('');
		}

		function resetUI() {
			doRequest = false;
			that.requestingXHR(null);
			that.message('');
			that.messageID(0);
			that.chatContent('');
		}
		
	}

	//ko run
	ko.applyBindings(new view());
	
});


