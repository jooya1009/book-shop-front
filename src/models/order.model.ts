export interface Order {
    id: number;
    created_at: string;
    address: string;
    receiver: string;
    contact: string;
    book_title: string;
    total_quantity: number;
    total_price: number;
}

export interface OrderSheet {
    items: number[];
    totalQuantity: number;
    totalPrice: number;
    firstBookTitle: string;
    delivery: Delivery;
}

export interface Delivery {
    address: string;
    receiver: string;
    contact: string;
}

export interface OrderDetailItem {
    book_id: number;
    author: string;
    price: number;
    quantity: number;
    title: string;
}

export interface OrderListItem extends Order {
    detail?: OrderDetailItem[];
}