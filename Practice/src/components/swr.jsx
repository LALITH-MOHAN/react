import { useState } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SWR() {
  const { data, error, isLoading } = useSWR('http://localhost:3001/items', fetcher);
  const [itemName, setItemName] = useState('');

  const addItem = async () => {
    if (!itemName.trim()) return;

    await fetch('http://localhost:3001/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemName }),
    });

    setItemName('');
    mutate('http://localhost:3001/items');
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:3001/items/${id}`, {
      method: 'DELETE',
    });
    mutate('http://localhost:3001/items');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Item List</h1>
      <input
        type="text"
        placeholder="Enter item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}{' '}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

