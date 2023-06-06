import Stomp from "webstomp-client";
import SockJS from "sockjs-client";
import { WS_URL } from "../../config";

class Socket {
  constructor(func, uuid) {
    this.stompClient = null;
    this.connect(func, uuid);
  }

  connect(func, uuid) {
    this.stompClient = Stomp.over(
      new SockJS(WS_URL, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
    );

    var stomp_temp = this.stompClient;

    this.stompClient.connect(
      {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      function (frame) {
        console.log("Connected: " + frame);
        stomp_temp.subscribe("/user/customer/message", function (msg) {
          console.log(msg);
          if (msg.body) {
            var jsonBody = JSON.parse(msg.body);
            if (jsonBody.message) {
              func({
                message: jsonBody.message,
                from: null,
                time: jsonBody.date,
              });
            }
          }
        });
        stomp_temp.send(
          "/app/customer/initConsul",
          JSON.stringify({ message: "uuid", userTo: uuid })
        );
      }
    );
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.close();
      this.stompClient = null;
    }
  }

  send(message) {
    if (this.stompClient) {
      this.stompClient.send("/app/customer/send", JSON.stringify(message));
    }
  }

  on(eventName, callback) {
    if (this.stompClient) {
      this.stompClient.addEventListener(eventName, callback);
    }
  }
}

export { Socket };
