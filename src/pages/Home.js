import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Home () {

  // states
  const [contacts, setContacts] = useState([])
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [location, setLocation] = useState('Cebu')
  const [registeredDate, setRegisteredDate] = useState('')

  const [formErrors, setFormErrors] = useState({})

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(5)

  // loading initial data from db.json
  useEffect(() => {
    fetch('http://localhost:5000/contacts').
    then(response => response.json()).
    then(data => setContacts(data))
  }, [formErrors])

  // validation
  const addContact = async (event) => {
    event.preventDefault()

    let errors = {
      fullName: '',
      email: '',
      contactNumber: '',
      location: '',
      registeredDate: '',
    }

    console.log(fullName.match('[A-Za-z]+,[ ]+[A-Za-z]+[ ]+[A-Z].'), 'aksjdk')

    // validation of fullname
    if (fullName === '') {
      errors.fullName = 'Full Name field cannot be blank'
      setFormErrors(prevState => ({
        ...prevState,
        fullName: 'Full Name field cannot be blank',
      }))
    }
      // else if (fullName.match(/[^a-zA-Z ]/g)) {
      //   errors.fullName = 'Full Name field accept characters only'
    // }
    else if (fullName.length > 30) {
      errors.fullName = 'Full Name field accept up to 30 in size only'
    }

// validation of email
    if (email === '') {
      errors.email = 'Email Address field Cannot be blank'
    } else if (email.length > 45) {
      errors.email = 'Email Address field up to 45 in size only'
    } else if (!/\S+@\S+\.\S+/.test(email.toLowerCase().trim())) {
      errors.email = 'Email Address field should have email domain'
    }
// validation of contact
    if (contactNo === '') {
      errors.contactNumber = 'Contact Number field cannot be blank'
    } else if (contactNo.length > 11) {
      errors.contactNumber = 'Contact Number accept up to 11 size only'
    } else if (/[a-zA-Z]/g.test(contactNo.toLowerCase().trim())) {
      errors.contactNumber = 'Contact Number field accept numeric values only'
    }
// validation of location
    if (location === '') {
      errors.location = 'Location field cannot be blank'
    }
// validation of registered date
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    today = mm + '/' + dd + '/' + yyyy
    today = today.toString()
    if (registeredDate === '') {
      errors.registeredDate = 'Registered date field cannot be blank'
    } else if (today !== registeredDate) {
      errors.registeredDate = 'Registered date field accept current date'
    }

    setFormErrors(prevState => {
      return { ...prevState, ...errors }
    })

    // post new contact if validation doesnt fail
    if (errors.fullName === '' && errors.contactNumber === '' &&
      errors.email === '' && errors.registeredDate === '' &&
      errors.registeredDate === '') {
      const rawResponse = await fetch('http://localhost:5000/contacts/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          contactNumber: contactNo,
          location: location,
          registeredDate: registeredDate,
        }),
      })
      const content = await rawResponse.json()
      setContacts([...contacts, content])
    }

  }

  // pagination calculation to get how many numbers will show at button
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentContacts = contacts.slice(indexOfFirstPost, indexOfLastPost)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(contacts.length / postPerPage); i++) {
    pageNumbers.push(i)
  }

  // HTML design
  return (
    <>
      <Container style={{
        marginTop: '20px',
        marginBottom: '20px',
      }}>
        <Row sm={3} style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Col>
            <Form onSubmit={addContact}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <input type="text" pattern="[A-Za-z]+,[ ]+[A-Za-z]+[ ]+[A-Z]."
                       title="Format should be: Lastname, Firstname Mi."
                       placeholder="LastName, FirstName MiddleInitial."
                       style={{
                         boxSizing: 'border-box',
                         margin: '0',
                         fontFamily: 'inherit',
                         display: 'block',
                         width: '100%',
                         padding: '.375rem .75rem',
                         fontSize: '1rem',
                         fontWeight: '400',
                         lineHeight: '1.5',
                         color: '#212529',
                         backgroundColor: '#fff',
                         backgroundClip: 'padding-box',
                         border: '1px solid #ced4da',
                         appearance: 'none',
                         borderRadius: '.25rem',
                       }}
                       onChange={event => setFullName(
                         event.target.value)}/>
                <p style={{ color: 'red' }}>{formErrors.fullName}</p>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="example@email.com"
                              onChange={event => setEmail(
                                event.target.value)}/>
                <p style={{ color: 'red' }}>{formErrors.email}</p>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="text" placeholder="99999999999"
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
                <Form.Control type="date"
                              onChange={event => {
                                const [year, month, day] = event.target.value.split(
                                  '-')
                                const result = [month, day, year].join('/')
                                setRegisteredDate(result)
                              }}/>
                <p style={{ color: 'red' }}>{formErrors.registeredDate}</p>
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Contact
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>Registered Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            currentContacts.map(contact => {
              return (
                <>
                  <tr>
                    <td>{contact.id}</td>
                    <td>{contact.fullName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.contactNumber}</td>
                    <td>{contact.location}</td>
                    <td>{contact.registeredDate}</td>
                    <td style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '20px',
                    }}>
                      <Link to={`contacts/view/${contact.id}`}>
                        <Button variant={'primary'}>
                          View
                        </Button>
                      </Link>
                      <Link to={`contacts/update/${contact.id}`}>
                        <Button variant={'warning'}>
                          Update
                        </Button>
                      </Link>
                      <Link to={`contacts/delete/${contact.id}`}>
                        <Button variant={'danger'}>
                          Delete
                        </Button>
                      </Link>
                    </td>
                  </tr>
                </>
              )
            })
          }
          </tbody>
        </Table>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <Pagination>
            <Pagination.Prev onClick={event => setCurrentPage(prevState => {
              if (prevState - 1 < 1) {
                return prevState
              } else {
                return prevState - 1
              }

            })}/>
            {
              pageNumbers.map(number =>
                <Pagination.Item key={number}
                                 onClick={(event => setCurrentPage(number))}>
                  {number}
                </Pagination.Item>,
              )
            }
            <Pagination.Next
              onClick={event => setCurrentPage(prevState => {
                if (prevState + 1 > pageNumbers.length) {
                  return prevState
                } else {
                  return prevState + 1
                }

              })}/>
          </Pagination>


          <p>showing {currentContacts.length + (currentPage - 1) *
            5} of {contacts.length}</p>

        </div>


      </Container>
    </>
  )
}

export default Home
