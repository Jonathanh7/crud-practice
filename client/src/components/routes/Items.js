import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Layout from "../shared/Layout";

const Items = () => {
  const [items, setItems] = useState([]);
  

  const fetchCall = async () => {
      try {
        const response = await axios(`http://localhost:3000/api/items`)
        setItems(response.data.items)
      } catch (err) {
        console.error(err)
      }
    }
  useEffect( async() => {
  fetchCall()
  }, [])

  const itemss = items.map(item => (
    <li key={item._id}>
      <Link to={`/items/${item._id}`}>{item.title}</Link>
    </li>
  ))

  return (

    <Layout>
      <h4>Items</h4>
      <ul>{itemss}</ul>
    </Layout> 
)
}

export default Items