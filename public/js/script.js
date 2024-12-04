const API_URL = 'http://localhost:3000/transactions';

document.getElementById('transactionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const transaction = {
    title: document.getElementById('title').value,
    amount: parseFloat(document.getElementById('amount').value),
    type: document.getElementById('type').value,
    date: document.getElementById('date').value,
  };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });

 
});

async function loadTransactions() {
    const response = await fetch(API_URL);
    const transactions = await response.json();
  
    const list = document.getElementById('transactionsList');
    list.innerHTML = '';
  
    transactions.forEach(({ id, title, amount, type, date }) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      li.setAttribute('id', `transaction-${id}`); // Adiciona um ID único para cada transação
  
      li.innerHTML = `
        <div>
          <strong>${title}</strong> - ${type === 'income' ? '+' : '-'}${amount} - ${date}
        </div>
        <div>
          <button class="btn btn-warning btn-sm me-2" onclick="editTransaction(${id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${id})">Excluir</button>
        </div>
      `;
  
      list.appendChild(li);
    });
  }
  
  
  async function deleteTransaction(id) {
    if (confirm('Tem certeza que deseja excluir esta transação?')) {
      // Faz a exclusão no backend
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  
      if (response.ok) {
        // Remove o item correspondente do DOM
        const transactionElement = document.querySelector(`#transaction-${id}`);
        if (transactionElement) {
          transactionElement.remove();
        }
      } else {
        console.error('Erro ao excluir a transação.');
      }
    }
  }
  
  
  async function editTransaction(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const transaction = await response.json();
  
    document.getElementById('title').value = transaction.title;
    document.getElementById('amount').value = transaction.amount;
    document.getElementById('type').value = transaction.type;
    document.getElementById('date').value = transaction.date;
  
    document.getElementById('transactionForm').onsubmit = async (e) => {
      e.preventDefault();
  
      const updatedTransaction = {
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        type: document.getElementById('type').value,
        date: document.getElementById('date').value,
      };
  
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTransaction),
      });
  
  
      
    };
  }
  
  async function handleFormSubmit(e) {
    e.preventDefault();
  
    const transaction = {
      title: document.getElementById('title').value,
      amount: parseFloat(document.getElementById('amount').value),
      type: document.getElementById('type').value,
      date: document.getElementById('date').value,
    };
  
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
  
    loadTransactions();

      
  }
  document.getElementById('transactionForm').onsubmit = handleFormSubmit;
