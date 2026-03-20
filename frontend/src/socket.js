export const connectSocket = (username, onMessage) => {
  const socket = new WebSocket(`ws://localhost:8000/ws/${username}`);
  socket.onopen = () => console.log('WebSocket connected');
  socket.onmessage = (e) => onMessage(JSON.parse(e.data));
  socket.onerror = (error) => console.error('WebSocket error:', error);
  socket.onclose = () => console.log('WebSocket closed');
  return socket;
};