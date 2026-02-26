export interface Menfess {
  _id: string;
  to: string;
  message: string;
  song: {
    title: string;
    artist: string;
    url: string; // URL lengkap Spotify
    coverUrl: string;
  };
  createdAt: string;
}
