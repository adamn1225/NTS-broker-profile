import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface FormData {
    e_year: string;
    e_make: string;
    e_model: string;
    length: string;
    width: string;
    height: string;
    machine_weight: string;
    origin: string;
    destination: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
}

const fetchFormData = async (): Promise<FormData[]> => {
    const response = await fetch('http://localhost:3000/api/submit-form', {
        cache: 'no-store',
    });
    const data: FormData[] = await response.json();
    return Array.isArray(data) ? data : [];
};

const AdminPage = async () => {
    const adminToken = cookies().get('adminToken');
    if (!adminToken) {
        redirect('/login');
    }

    const formData = await fetchFormData();

    return (
        <div>
            <h1>Admin Page</h1>
            {formData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Year</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Origin</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.phone_number}</td>
                                <td>{item.email}</td>
                                <td>{item.e_year}</td>
                                <td>{item.e_make}</td>
                                <td>{item.e_model}</td>
                                <td>{item.length}</td>
                                <td>{item.width}</td>
                                <td>{item.height}</td>
                                <td>{item.machine_weight}</td>
                                <td>{item.origin}</td>
                                <td>{item.destination}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default AdminPage;