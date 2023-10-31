import { JSEncrypt } from 'jsencrypt';
import { request } from './request';

export async function encryption(username, password) 
{
    const { data: { publicKey } } = await request.post('/key');
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(atob(publicKey));  

    const encryptedUsername = encryptor.encrypt(username);
    const encryptedPassword = encryptor.encrypt(password);

    const encryptedBody = {
        username: encryptedUsername,
        password: encryptedPassword
    }
    return encryptedBody;
}