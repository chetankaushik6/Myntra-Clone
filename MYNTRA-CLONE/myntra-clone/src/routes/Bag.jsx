import React from 'react'
import BagSummary from '../Components/BagSummary'
import BagItem from '../Components/BagItem'
import {useSelector} from 'react-redux'


const Bag = () => {
  const items = useSelector(store => store.items);
  const bagItems= useSelector(store => store.bag);
  const finalItem = items.filter(item => {
       const itemIndex = bagItems.indexOf(item.id)
       return itemIndex >=0
  })

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
              {
                finalItem.map(items => <BagItem item={items}/>)
              }
        </div>
             <BagSummary/>
      </div>
    </main>
  )
}

export default Bag
