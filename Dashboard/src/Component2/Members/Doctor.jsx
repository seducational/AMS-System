import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

export const Doctor = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}auth/doctors`)
            .then((res) => setUser(res.data))
            .catch((err) => console.log("Api error : ", err));
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete Account?',
            text: "This action can't be undone. Do you really want to delete it?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, keep it',
            reverseButtons: true,
            customClass: {
                popup: 'rounded-4 shadow'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}auth/deleteMember/${id}`);
                    setUser(user.filter((u) => u._id !== id));
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'User has been deleted successfully.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                } catch (error) {
                    console.error("Error deleting project:", error);
                    Swal.fire('Oops!', 'Something went wrong while deleting.', 'error');
                }
            }
        });
    };

    return (
        <>
            <Container>
                <div className="dashboard container">
                    <div className="dash-nav d-flex pt-4 pb-2 justify-content-md-between justify-content-around container"></div>
                    <p className="d-flex">
                        <span className='dash-icon shadow '>
                            <box-icon name='contact' type='solid' color='#ffff' width='30px' height='30px'></box-icon>
                        </span>
                        <span className="mx-1 fs-3">Doctors Data</span>
                    </p>
                </div>
                <div></div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Name</th>
                            <th>Email </th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="tbodyContent">
                        {user.map((userData, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{userData.firstName} {userData.middleName} {userData.lastName}</td>
                                <td>{userData.email}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(userData._id)}> Delete </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};
