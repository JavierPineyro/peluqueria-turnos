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

export type Service = {
  id: string;
  name: string;
  price: number;
};

export type IncomeResponse = {
  id: number
  date: Date
  revenue: number
  "id_service": {
    name: string
  }
}
