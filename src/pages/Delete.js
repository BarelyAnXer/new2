import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

function Delete () {

  // initial states
  const { id } = useParams()
  const [contact, setContact] = useState({})

  const navigate = useNavigate()


  // load data from db,json
  useEffect(() => {
    fetch(`http://localhost:5000/contacts/${id}`).
    then(response => response.json()).
    then(data => setContact(data))
  }, [])

  const deleteContact = () => {
    // check if user want to delete
    let yes = window.confirm('are you sure you want to delete the record')
    if (yes) {
      fetch(`http://localhost:5000/contacts/${id}`, {
        method: 'DELETE',
      }).
      then(response => response.json()).
      then(data => setContact(data))
      navigate('/')
      // redirect to home
    }
  }

  // HTML
  return (
    <Container>
      <h1>DELETE</h1>
      <p>ID: {contact.id}</p>
      <p>FULL NAME: {contact.fullName}</p>
      <p>EMAIL ADDRESS: {contact.email}</p>
      <p>CONTACT: {contact.location}</p>
      <p>LOCATION: {contact.location}</p>
      <p>REGISTERED DATE: {contact.location}</p>

      <Link to={`/`}>
        <Button variant={'primary'}>
          Back
        </Button>
      </Link>
      <Button variant={'danger'} onClick={deleteContact}>
        Delete
      </Button>
    </Container>

  )
}

export default Delete
