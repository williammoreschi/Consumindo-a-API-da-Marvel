import axios from "axios";
import md5 from 'js-md5';
const PUBLIC_KEY = '5d234ec2b808cd23fa141838207e6745';
const PRIVATE_KEY = '6da1e9186b0cc517d89b65ea19e7d920843e8c21';
const timestamp = Number(new Date());
const hash = md5.create();
hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);
const api = axios.create({
	baseURL: `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}&orderBy=name&limit=10`
});

export default api;

