function Message({ message }) {
    return (
      <div className={"message"}>
        <div className="messageTop">
          <p className="messageText">{message.text}</p>
        </div>
      </div>
    );
  }

export default Message