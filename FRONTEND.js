import 
{
   useEffect, useState
} 
from "react";
import 
{
   io 
} 
from "socket.io-client";
function App() 
{
  const [socket, setSocket] = useState();
  const [content, setContent] = useState("");
  useEffect(() => 
  {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => s.disconnect();
  }, []);
  const handleChange = (e) => {
    const newText = e.target.value;
    setContent(newText);
    socket.emit("send-changes", newText);
  };

  useEffect(() => 
  {
    if (socket == null) return;
    socket.on("receive-changes", (text) => setContent(text));
  }, [socket]);
  return (
    <div className="editor-container">
      <textarea value={content} onChange={handleChange} placeholder="Start collaborating..." />
    </div>
  );
}
