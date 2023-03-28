import { QWebChannel } from 'qwebchannel'
var getParam = function(queryField) {
	var url = window.location.href;
	queryField = queryField.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig, "\\$&");

	var regex = new RegExp("[?&]" + queryField + "(=([^&#]*)|&|#|$)", "i"),
		results = regex.exec(url);

	if (!results)
		return null;

	if (!results[2])
		return '';

	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var origin = getParam('totvstec_remote_origin');
if ((origin === null) || (origin === '')) {
	origin = '*'
}


window.onmessage = function(event) {
	var data = event.data;

	if ((origin !== '*') && (event.origin !== origin)) {
		console.log('unexpected origin', event.origin, origin);
		return;
	}

	if ((data.type ? data.type : '').toUpperCase() !== 'MS_WEBENGINERUNJAVASCRIPT') {
		console.log('unexpected message type');
		return;
	}

	eval(data.value);
}


var twebchannel = {
	// Versao
	version: "1.0.4",

	// Porta do WebSocket
	internalPort: 0,

	// Defines do OpenSettings e TestDevice
	BLUETOOTH_FEATURE: 1,
	NFC_FEATURE: 2,
	WIFI_FEATURE: 3,
	LOCATION_FEATURE: 4,
	CONNECTED_WIFI: 5,
	CONNECTED_MOBILE: 6,

	connect: function(callback) {
		var port = getParam('totvstec_websocket_port'),
			remoteType = getParam('totvstec_remote_type'),
			threadId = getParam('totvstec_threadId');

		this.init(port, remoteType, threadId, callback);
	},

	init: function(port, remoteType, threadId, callback) {
		this.internalPort = Number(port);
		this.remoteType = Number(remoteType);
		this.threadId = threadId;

		var fireEvent = function() {
			var event = new CustomEvent('twebchannelready');

			document.dispatchEvent(event);

			if (typeof callback === 'function')
				callback();
		};

		if (this.remoteType !== 5) {
			this.connectWS(fireEvent);
		}
		else {
			this.connectMessageChannel(fireEvent);
		}
	},

	jsToAdvpl: function(key, value) {
		//console.log('not connected');

		if (this.remoteType !== 5) {
			window.dialog.jsToAdvpl(key, value);
		}
		else {
			this.sendMessageChannel(key, value);
		}
	},

	advplToJs: function(key, value) {
		console.log('not connected',key,value);
	},

	// Conecta WebSocket e prepara mensageria global
	connectWS: function(callback) {
		var baseUrl = "ws://127.0.0.1:" + this.internalPort,
			socket = new WebSocket(baseUrl);

		socket.onclose = function() { console.error("WebChannel closed"); };
		socket.onerror = function(error) { console.error("WebChannel error: " + error); };
		socket.onopen = function() {
			new QWebChannel(socket, function(channel) {
				window.dialog = channel.objects.mainDialog;

				// Carrega mensageria global [CSS, JavaScript]
				window.dialog.advplToJs.connect(twebchannel.onReceiveAdvplToJs.bind(twebchannel));

				// Executa callback
				if (typeof callback === 'function')
					callback();
			});
		};
	},


	onReceiveAdvplToJs: function(key, value) {
		this.advplToJs(key, value);
	},

	connectMessageChannel: function(callback) {
		this.channel = new MessageChannel();

		this.channel.port1.onmessage = function(event) {
			var data = event.data,
				messageType = (data.type || 'UNDEFINED').toUpperCase();

			switch (messageType) {
				case 'CONNECTED':
					window.dialog = window.dialog || {};
					window.dialog.jsToAdvpl = twebchannel.sendMessageChannel.bind(twebchannel);

					if (typeof callback === 'function')
						callback();

					//this.queue.setMaxPendingPromises(1);

					break;
				case 'DISCONNECTED':
					console.log("received a DISCONNECTED message.", event);

					break;
				case 'EXEC':
					twebchannel.onReceiveAdvplToJs(
						data.value.type,
						data.value.content
					);

					break;
				case 'RETURN':
					//console.log("received a RETURN message.", event);

					break;
				default:
					console.error("invalid message: " + messageType, event);

					break;
			}
		};

		window.parent.postMessage({
			type: 'CONNECT',
			port: this.internalPort,
			threadId: this.threadId
		}, origin, [this.channel.port2]);
	},

	sendMessageChannel: function(key, value) {
		var message = {
			type: key,
			content: value,
			port: this.internalPort
		};

		this.channel.port1.postMessage(message);
	}

};