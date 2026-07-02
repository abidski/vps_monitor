export type Tab = "overview" | "history" | "services";
export interface DataPoint {
  time: string;
  cpu: number;
  mem: number;
  disk: number;
  temp: number | null;
}
