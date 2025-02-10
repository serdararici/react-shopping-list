

export default function Summary({items}) {
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