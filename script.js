const board = document.getElementById('bingo-board');
const generateBoardButton = document.getElementById('generate-board');
const startChatButton = document.getElementById('start-chat');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');

function generateBingoBoard() {
  board.innerHTML = '';
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  numbers.forEach((number) => {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.textContent = number;
    cell.addEventListener('click', () => cell.classList.toggle('selected'));
    board.appendChild(cell);
  });
}

generateBoardButton.addEventListener('click', generateBingoBoard);

// WebRTC voice chat setup
let localStream;
let peerConnection;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

startChatButton.addEventListener('click', async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  peerConnection = new RTCPeerConnection(config);
  localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // Signal the offer to the server (placeholder)
  console.log('Offer:', offer);

  // Simulate receiving an answer (replace with server communication)
  peerConnection.onicecandidate = ({ candidate }) => {
    if (candidate) console.log('Candidate:', candidate);
  };
});
