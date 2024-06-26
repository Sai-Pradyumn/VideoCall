// peer.js

class PeerService {
  constructor() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });

    // Event listener for incoming tracks
    this.peer.addEventListener("track", (event) => {
      if (event.streams && event.streams[0]) {
        this.onTrack(event.streams[0]);
      }
    });
  }

  async getOffer() {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer;
  }

  async getAnswer(offer) {
    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(new RTCSessionDescription(ans));
    return ans;
  }

  async setLocalDescription(ans) {
    await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
  }

  // Method to add track to peer connection
  addTrack(track, stream) {
    const sender = this.peer.addTrack(track, stream);
    return sender;
  }

  // Event handler for incoming tracks
  onTrack(stream) {
    // Handle incoming tracks here
    console.log("Received remote track:", stream);
    // You can set this stream to the state or handle it as needed
  }
}

export default new PeerService();
