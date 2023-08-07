export class CreateProductDto {
  name: string;
  photo: string;
  qtt: number;
  group: string;
  minimum: number;
  available: boolean;
  lastPurchase: Date;
}
