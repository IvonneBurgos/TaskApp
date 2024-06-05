import { useState, useEffect } from 'react';
import { User } from '../../domain/entities';
import axios from 'axios';
const baseUrl = 'https://6172cfe5110a740017222e2b.mockapi.io/elements';

function useUser() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUsers = async(): Promise<User[]> => {
        var users: User[] = []
         return axios<User[]>({
              method: 'get',
              url: baseUrl,
            }).then((response) => {
              users = response.data
              return users
            }).catch((error)=>{
              throw new Error(error)
            });
      }

    useEffect(() => {
        const getAllUsers = async () => {
            const allUsers = await getUsers()
            setUsers(allUsers);
            setLoading(false);
        };
        getAllUsers();
    }, []);

    return { users, loading};
}

export default useUser;