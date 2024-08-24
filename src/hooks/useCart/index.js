import { CartsService } from "../../services/cart";
import { userCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { throttle } from "../../utils/throttle";
const makeRequestUpdateItem = throttle(async (id, qty) => {
  try {
    await CartsService.updateItem(id, qty);
  } catch (error) {
    // fazer nada
  }
}, 1000);

let isCartLoaded = false;
export const useCart = () => {
  const { items, total, setItems, setTotal } = userCartStore();

  const user = useAuthStore(({ user }) => user);

  const { isLoading, isError } = useQuery({
    queryKey: "cart",
    queryFn: CartsService.find,
    enabled: user && !isCartLoaded ? true : false,
    refetchOnMount: false,
    onSuccess: (data) => {
      if (data?.data && !isLoading && !isError) {
        const itemsFromServer = data.data?.items?.map((item) => ({
          id: item.productId,
          imgSrc: item.product.imgSrc,
          name: item.product.name,
          price: item.product.price,
          qty: item.quantity,
          subTotal: item.subTotal,
        }));
        setItems(itemsFromServer || items);
        setTotal(data.data?.total || total);
      }
    },
  });
  const calculateTotal = (itemsList) => {
    let t = 0;
    itemsList.forEach((item) => (t += item.subTotal));
    return t;
  };

  const addItem = async (product) => {
    const item = items.find((item) => item.id === product.id);
    if (item) {
      changeQuantity(product.id, item.qty + 1);
      return;
    }
    const data = [...items, { ...product, qty: 1, subTotal: product.price }];
    const total = calculateTotal(data);
    setItems(data);
    setTotal(total);
    if (user) {
      try {
        await CartsService.addItem(product.id, 1);
      } catch (error) {
        // fazer nada
      }
    }
  };

  const changeQuantity = (id, qty) => {
    if (qty < 1) {
      return;
    }

    const newItems = items.map((item) => {
      if (item.id === id) {
        item.qty = qty;
        item.subTotal = item.price * qty;
        return item;
      }
      return item;
    });

    setItems(newItems);
    setTotal(calculateTotal(newItems));
    if (user) {
      makeRequestUpdateItem(id, qty);
    }
  };

  const removeItem = async (productId) => {
    const newItems = items.filter((item) => item.id !== productId);
    const total = calculateTotal(newItems);
    setItems(newItems);
    setTotal(total);

    if (user) {
      try {
        await CartsService.deleteItem(productId);
      } catch (error) {
        // fazer nada
      }
    }
  };

  const handleInputChange = (e, id) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      changeQuantity(id, value);
    }
  };

  return {
    items,
    total,
    changeQuantity,
    addItem,
    removeItem,
    handleInputChange,
    isLoading,
    isError,
  };
};
