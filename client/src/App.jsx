import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

const YOU = "you";
const BOT = "bot";
function App() {
  const inputRef = useRef();
  const [QnA, setQnA] = useState([
    // { from: YOU, value: "FROM ME" },
    // { from: BOT, value: ["1 message from BOT", "2 message from BOT"] },
    // { from: YOU, value: ["1 message from YOU", "2 message from YOU"] },
  ]); // {from : 'you', value : "" ,} ,{from : 'bot' , value : "" ,}

  const [loanding, setLoanding] = useState(false);
  const updateQnA = (from, value) => {
    setQnA((QnA) => [...QnA, { from, value }]);
  };
  const handleSend = () => {
    const question = inputRef.current.value;
    updateQnA(YOU, question);

    setLoanding(true);

    axios
      .post("http://localhost:3000/chat", {
        question,
      })
      .then((response) => {
        updateQnA(BOT, response.data.answer);
      })
      .finally(() => {
        setLoanding(false);
      });
  };

  const renderContent = (QnA) => {
    const value = QnA.value;

    if (Array.isArray(value)) {
      return value.map((v) => <p className="message-text">{v}</p>);
    }
    return <p className="message-text">{value}</p>;
  };
  return (
    <main class="container">
      <div class="chats">
        {QnA.map((QnA) => {
          if (QnA.from === YOU) {
            return (
              <div class="send chat">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
                  alt=""
                  class="avtar"
                />
                <p>{renderContent(QnA)}</p>
              </div>
            );
          }
          return (
            <div class="recieve chat">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
                alt=""
                class="avtar"
              />
              <p>{renderContent(QnA)}</p>
            </div>
          );
        })}

        {loanding && (
          <div class="recieve chat">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt=""
              class="avtar"
            />
            <p>Typing...</p>
          </div>
        )}
      </div>

      <div class="chat-input">
        <input
          type="text"
          ref={inputRef}
          class="form-control col"
          placeholder="Type Something"
        />
        <button
          disabled={loanding}
          class="btn btn-success"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </main>
  );
}

export default App;
