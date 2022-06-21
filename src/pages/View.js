import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'

function View () {

  // initial states
  const { id } = useParams()
  const [contact, setContact] = useState({})

  // load data from db.json
  useEffect(() => {
    fetch(`http://localhost:5000/contacts/${id}`).
    then(response => response.json()).
    then(data => setContact(data))
  }, [])

  // HTML design
  return (

    <Container>
      <h1>View - READ ONLY</h1>
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
    </Container>

  )
}

export default View
