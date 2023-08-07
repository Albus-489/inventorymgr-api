export class ProductEtt {
  constructor(
    name,
    photo = '',
    group,
    lastPurchase,
    qtt = 0,
    minimum = 0,
    available = true,
    storage,
  ) {
    this.name = name;
    this.photo = photo;
    this.group = group;
    this.lastPurchase = lastPurchase;
    this.qtt = qtt;
    this.minimum = minimum;
    this.available = available;
    this.storage = storage;
  }

  name: string;
  photo: string;
  group: string;
  lastPurchase: Date;
  qtt: number;
  minimum: number;
  available: boolean;
  storage: string;
}
