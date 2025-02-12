

export default function Item({ item, onDeleteItem, onUpdateItem }) {
    return (
      <li>
        {/* Gizli checkbox */}
        <input 
          type="checkbox" 
          id={`checkbox-${item.id}`} 
          checked={item.completed} 
          onChange={() => onUpdateItem(item.id)}
        />
  
        {/* Görsel olarak şık checkbox için label */}
        <label htmlFor={`checkbox-${item.id}`} className="custom-label">
          <span className="custom-checkbox"></span>
          {item.quantity} {item.title}
        </label>
  
        {/* Silme butonu */}
        <button onClick={() => onDeleteItem(item.id)}>X</button>  
      </li>
    );
  }
  