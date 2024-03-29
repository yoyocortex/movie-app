import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef(); // use state instead 
    const passwordRef = useRef(); // use state instead
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch {
            setError('Failed to sign in.');
        }
        setLoading(false);
    }

    return (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: "400px" }}>
                <Card style={{ backgroundColor: 'rgb(15, 15, 15)', border: 'solid', borderColor: '#181818', borderRadius: '2.25rem' }}>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Login</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required></Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-4 btn btn-dark' type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to='/signup'>Signup</Link>
                </div>
            </div>
        </Container>
    );
}
