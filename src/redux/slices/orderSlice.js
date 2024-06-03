import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    discountPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivery: false,
    deliveryAt: '',
    isSuccessAddItem: false,
    isErrorAddItem: false
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state,action) => {
        const {orderItem} = action?.payload;
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem?.product);
        if(itemOrder) {
            itemOrder.countInStock = orderItem?.countInStock;
            if(itemOrder.amount + orderItem?.amount <= itemOrder.countInStock){
                itemOrder.amount += orderItem?.amount;
                state.isSuccessAddItem = true;
                state.isErrorAddItem = false;
            }
            else{
                state.isSuccessAddItem = false;
                state.isErrorAddItem = true;
            }
        } else {
            state.orderItems.push(orderItem);
            state.isSuccessAddItem = true;
            state.isErrorAddItem = false;
        }
    },
    increaseAmount: (state,action) => {
        const {idProduct} = action.payload;
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
        itemOrder.amount++;
        if(itemOrderSelected) {
            itemOrderSelected.amount++;
        }
    },
    decreaseAmount: (state,action) => {
        const {idProduct} = action.payload;
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct);
        if(itemOrder.amount > 1){
            itemOrder.amount--;
        }
        if(itemOrderSelected) {
            if(itemOrderSelected.amount > 1) {
                itemOrderSelected.amount--;
            }
        }
    },
    removeOrderProduct: (state,action) => {
        const {idProduct} = action?.payload;
        const itemsOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
        const itemOrderSeleted = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct) ;
        
        state.orderItems = itemsOrder;
        state.orderItemsSelected = itemOrderSeleted;
    },
    removeAllOrderProduct: (state,action) => {
        const {listChecked} = action?.payload;
        const itemsOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
        const itemOrdersSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product));
        
        state.orderItems = itemsOrders;
        state.orderItemsSelected = itemOrdersSelected;
    },
    selectedOrder: (state, action) => {
      const {listChecked} = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((item) => {
        if(listChecked.includes(item.product)){
          orderSelected.push(item)
        };
      });
      state.orderItemsSelected = orderSelected;
    },
    clearOrder: (state, action) => {
        const {listChecked} = action?.payload;
        const itemsOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
        const itemOrdersSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product));

        state.orderItems = itemsOrders;
        state.orderItemsSelected = itemOrdersSelected;

        state.shippingAddress = {};
        state.paymentMethod = '';
        state.itemsPrice = 0;
        state.shippingPrice = 0;
        state.discountPrice = 0;
        state.totalPrice = 0;
        state.user = '';
        state.isPaid = false;
        state.paidAt = '';
        state.isDelivery = false;
        state.deliveryAt = '';
        state.isSuccessAddItem = false;
        state.isErrorAddItem = false;
    },
    emptyOrder: (state, action) => {
        state.orderItems = [];
        state.orderItemsSelected = [];

        state.shippingAddress = {};
        state.paymentMethod = '';
        state.itemsPrice = 0;
        state.shippingPrice = 0;
        state.discountPrice = 0;
        state.totalPrice = 0;
        state.user = '';
        state.isPaid = false;
        state.paidAt = '';
        state.isDelivery = false;
        state.deliveryAt = '';
        state.isSuccessAddItem = false;
        state.isErrorAddItem = false;
    },
    resetAddItemState: (state) => {
        state.isSuccessAddItem = false;
        state.isErrorAddItem = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct ,increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, clearOrder, emptyOrder, resetAddItemState } = orderSlice.actions

export default orderSlice.reducer