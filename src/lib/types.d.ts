export type Events = Array<{
  id: string;
  title: string;
  status: string;
  start: Date;
  end: Date;
  createdAt: Date;
  services: {
    id: string;
    name: string;
    price: number;
  };
}>;
