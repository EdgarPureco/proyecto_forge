export interface Orders {
    id?: number;
    payment?: string;
    status?: string;
    deliveryFee?: number;
    date?: string;
    subtotal?: number;
    total?: number;
    details?: [
      {
        id?: number;
        productId?: number;
        quantity?: number;
        price?: number;
        productName?: string;
      }
    ];
    customer?: {
      id?: number;
      email?: string;
      names?: string;
      lastnames?: string;
      address?: string;
      phone?: string
    };
    userId?: number;
  }