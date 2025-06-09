export const API = 'http://localhost:5000/api';

export const fetcher = (url) => {
  const token = localStorage.getItem('token');
  
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Unauthorized');
    }
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};

export const postData = (url, body) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json());

export const deleteData = (url) =>
  fetch(url, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete');
    }
    return response.json();
  });