export interface GolferPick {
  name: string;
  thursday: number | null;
  friday: number | null;
  saturday: number | null;
  sunday: number | null;
  total: number | null;
}

export interface Participant {
  name: string;
  paid: boolean;
  golfers: GolferPick[];
  totalScore: number;
  rank: number;
}
