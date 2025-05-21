import { ProductProvider } from './context/ProductContext';
import AppRouter from './AppRouter';

function App() {
  return (
    <ProductProvider>
      <AppRouter />
    </ProductProvider>
  );
}

export default App;
