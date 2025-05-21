import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import AppRouter from './AppRouter';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
