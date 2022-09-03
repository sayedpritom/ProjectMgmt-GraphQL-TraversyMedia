import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../Mutations/ClientMutations';
import { GET_CLIENTS } from '../Queries/ClientQueries';


const ClientRow = ({ client }) => {
    const { email, name, phone } = client;
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // refetchQueries: [{ query: GET_CLIENTS }],
        update(cache, { data: { deleteClient } }) { 
            const { clients } = cache.readQuery({ query: GET_CLIENTS});
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter(client => client.id !== deleteClient.id) }
            })
        }
    });
    return (
        <tr>
            <td>{email}</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td><button className="btn btn-danger btn-sm" onClick={deleteClient}><FaTrash /></button></td>
        </tr>
    );
};

export default ClientRow;