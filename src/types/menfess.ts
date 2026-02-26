export interface Reaction {
  type: string;
  count: number;
}

export interface Comment {
  _id: string;
  name: string;
  content: string;
  isSender: boolean;
  replyTo?: string | null; // ID komentar yang dibalas
  replyToName?: string | null; // Nama orang yang dibalas
  reactions: Reaction[];
  createdAt: string;
}

export interface Menfess {
  _id: string;
  to: string;
  message: string;
  song: {
    title: string;
    artist: string;
    url: string;
    coverUrl: string;
  };
  reactions: Reaction[]; // Reaksi pada pesan utama
  comments: Comment[]; // Daftar komentar
  createdAt: string;
}
