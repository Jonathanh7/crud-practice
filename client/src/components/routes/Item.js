import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Layout from '../shared/Layout';

const Item = (props) => {
  const [item, setItem] = useState(null)
  const [deleted, setDeleted] = useState(false)

  
  const fetchItem = async () => {
    try {
      const response = await axios(`http://localhost:3000/api/items/${props.match.params.id}`)
      setItem(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  
  useEffect( () => {
    fetchItem()
  }, [])
  
   const destroy = async () => {
   await axios({
      url: `http://localhost:3000/api/items/${props.match.params.id}`,
      method: 'DELETE',
    }).then(() => {
      setDeleted(true)
    }).catch(console.error)
  }
  // useEffect(() => {
  //   destroy()
  // }, [])

  if (!item) {
  return <p>Loading...</p>
  }
  if (deleted) {
    return <Redirect to={ {pathname: '/', state: {msg: 'Item successfully deleted'}}} />
  }

  return (
    <Layout>
      <h4>{item.title}</h4>
      <p>Link: {item.link}</p>
      <button onClick={destroy}>Delete Item</button>
      <Link to={`/items/${props.match.params.id}/edit`}>
        <button>Edit Item</button>
      </Link>
      <Link to="/items">Back to all items</Link>
    </Layout>
  
)

}

export default Item