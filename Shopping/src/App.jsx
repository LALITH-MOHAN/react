import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import AppRouter from './AppRouter';
import { OrderProvider } from './context/OrderContext';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <AppRouter />
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  );
}


export default App;
