import { use, useState } from 'react'

const data = [
  {id:1, title: "Yumurta", quantity: 10, completed: true },
  {id:2, title: "Ekmek", quantity: 2, completed: true },
  {id:3, title: "Süt", quantity: 5, completed: false },
  {id:4, title: "Et", quantity: 3, completed: true },
  {id:5, title: "Zeytin", quantity: 7, completed: false },
];

function App() {
  const [items, setItems] = useState(data);
  const itemsCount = items.length;

  function handleAddItem(item) {
    setItems((items) => [...items,item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleUpdateItem(id) {
    setItems(items => items.map(item => item.id == id ? {...item, completed: !item.completed} : item));
  }

  function handleClearList() {
    const onay = window.confirm("Listedeki tüm ürünleri silmek istediğinizdden emin misiniz?");
    if(onay) {
      setItems([]);
    }
    
  }

  return (
    <>
      <div className='app'>
        <Header/>
        <Form onAddItem={handleAddItem} onClearList={handleClearList}/>
        <List items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}/>
        <Summary items={items}/>
      </div>
    </>
  )
}

function Header() {
  return (
    <h1>🛒 Shopping list</h1>
  )
}

function Form( { onAddItem, onClearList } ) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  

  function handleFormSubmit(e) {
    if(title) {
      e.preventDefault();
      const item = {id: Date.now(), title, quantity, completed: false};
      //console.log(item);

      onAddItem(item);
      setTitle("");
      setQuantity(1);
    }
   
  }

  return(
    <form className='form' onSubmit={handleFormSubmit}>
      <input type="text" placeholder='Ürün adı giriniz' value={title} onChange={(e) => setTitle(e.target.value)}/>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {
          Array.from({length:10}, (v,i) => i + 1)        // to produce numbers from 1 to 10
          .map(num => <option key= {num} value={num}>{num}</option>)
        }
      </select>
      <button type="submit">➕ Ekle</button>
      <button type='button' onClick={onClearList}>🗑️ Temizle</button>
    </form>
  )
}

function List({items, onDeleteItem, onUpdateItem}) {
  return (
    <>
    {items.length > 0 ? (
      <div className='list'>
        <ul>
          { items.map((i,index) => (<Item item={i} key= {index} 
          onDeleteItem={onDeleteItem} 
          onUpdateItem={onUpdateItem}/>))}
        </ul>
      </div>
      ) : 
      <div className='list'>
        Sepette Ürün yok.
      </div>
    }
    </>

    
    
  );
}

function Item( { item, onDeleteItem, onUpdateItem} ) {
  return(
    <li>
      <input type="checkbox" checked={item.completed} onChange={() => onUpdateItem(item.id)}/>
      <span style={item.completed ? {textDecoration: "line-through"} : {}}>{item.quantity} { item.title }</span>
      <button onClick={() => onDeleteItem(item.id)}>X</button>  
    </li>
  );
}

function Summary({items}) {
  if(items.length === 0 ) {
    return (
      <footer className='summary'>
      <p> Alişveriş listenizi hazırlamaya başlayabilirsiniz.</p>
      </footer>
    );
  }
  const itemsCount = items.length;
  const completedItemsCount = items.filter(item => item.completed).length;
  return(
    <footer className='summary'>
      {itemsCount == completedItemsCount ? <p>Alişverişi tamaladınız. </p> : 
      <p>Alişveriş sepetinizde {itemsCount} üründen {completedItemsCount} tanesini aldınız. </p>}
      </footer>
  );
}




export default App
