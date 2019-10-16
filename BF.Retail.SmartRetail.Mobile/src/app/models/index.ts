
export interface User {
  id: number;
  fullName: string;
  email: string;
  photo: string;
}

export interface SignUpRequest {
  nombre: string;
  email: string;
  foto: string;
}

export interface SignUpResponse {
  userid: number;
}

export interface ProductRequest {
  foto: string;
}

export interface ProductHitRequest {
  userid: number;
  productid: number;
}

export interface BuyProductRequest {
  userid: number;
  productid: number;
}

