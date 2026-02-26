export interface SpotifyResult {
  id: string;
  text: string; // Format: "Judul Lagu - Nama Artis"
  coverUrl: string;
}

export interface SpotifyResponse {
  results: SpotifyResult[];
}
