import axios from "axios";
//import Cards from "./card";
export default function Apicall() {
    const [movies,SetMovie] = useState([]);
    async function Api(){
        let url = "https://omdbapi.com/?apikey=4e9e8ed7&s=";
        let type = "movie";
        let api = await axios.get(url + type);
        console.log(api.data.Search);
        SetMovie(api.data.Search)
    }   
    return (
        <>
        <button onClick={Api}>click</button>
        </>
    );
}

