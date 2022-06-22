import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'

function Update () {

  // initial states
  const { id } = useParams()
  const navigate = useNavigate()

  const [contact, setContact] = useState({})

  const [email, setEmail] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [location, setLocation] = useState('Cebu')

  const [formErrors, setFormErrors] = useState({})

  // load data from database
  useEffect(() => {
    fetch(`http://localhost:5000/contacts/${id}`).
    then(response => response.json()).
    then(data => {
      setContact(data)
      setEmail(data.email)
      setContactNo(data.contactNumber)
      setLocation(data.location)
    })
  }, [])

  // update contact with validation
  const updateContact = async (event) => {
    event.preventDefault()

    let errors = {}
    // validation form email
    if (email === '') {
      errors.email = 'Email Address field Cannot be blank'
    } else if (email.length > 45) {
      errors.email = 'Email Address field up to 45 in size only'
    } else if (!/\S+@\S+\.\S+/.test(email.toLowerCase().trim())) {
      errors.email = 'Email Address field should have email domain'
    }
// validation form contact
    if (contactNo === '') {
      errors.contactNumber = 'Contact Number field cannot be blank'
    } else if (contactNo.length > 11) {
      errors.contactNumber = 'Contact Number accept up to 11 size only'
    } else if (/[a-zA-Z]/g.test(contactNo.toLowerCase().trim())) {
      errors.contactNumber = 'Contact Number field accept numeric values only'
    }
// validation form location
    if (location === '') {
      errors.location = 'Location field cannot be blank'
    }

    setFormErrors(prevState => {
      return { ...prevState, ...errors }
    })

    if (Object.keys(errors).length === 0) {

      let yes = window.confirm(`
      Please confirm the update to the following
      Email Address: ${email}
      Contact Number: ${contactNo}
      Location: ${location}
      
      `)
      if (yes) {
        await fetch(`http://localhost:5000/contacts/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              contactNumber: contactNo,
              location: location,
            }),
          })
        navigate('/')
      }
    }
  }

  // HTML
  return (
    <Container style={{
      marginTop: '20px',
      marginBottom: '20px',
    }}>
      <Row sm={3}>
        <Col>
          <h1>Update</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Full Name</Form.Label>
              <p>{contact.fullName}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="example@email.com"
                            value={email}
                            onChange={event => setEmail(
                              event.target.value)}/>
              <p style={{ color: 'red' }}>{formErrors.email}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" placeholder="99999999999"
                            value={contactNo}
                            onChange={event => setContactNo(
                              event.target.value)}/>
              <p style={{ color: 'red' }}>{formErrors.contactNumber}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Select aria-label="Default select example"
                           value={location}
                           onChange={(event) => setLocation(
                             event.target.value)}>
                <option value="Cebu">Cebu</option>
                <option value="Manila">Manila</option>
              </Form.Select>
              <p style={{ color: 'red' }}>{formErrors.location}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Registered Date</Form.Label>
              <p>{contact.registeredDate}</p>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Link to={`/`}>
        <Button variant={'primary'}>
          Back
        </Button>
      </Link>
      <Link to={`/`}>
        <Button variant={'warning'} onClick={updateContact}>
          Update
        </Button>
      </Link>
    </Container>

  )
}

export default Update
