import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import {WS_URL} from "../../config";

class Socket {
    constructor() {
        this.stompClient = null;
        this.connect();
    }

    connect() {
        this.stompClient = Stomp.over(new SockJS(WS_URL, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }));

        this.stompClient.connect({
            Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }, function (frame) {
            console.log('Connected: ' + frame);
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
    }

    send(message) {
        if (this.socket) {
            this.socket.send(JSON.stringify(message))
        }
    }

    on(eventName, callback) {
        if (this.socket) {
            this.socket.addEventListener(eventName, callback)
        }
    }
}

export {Socket}