import axios from 'axios'



var url = "http://localhost:9000/allPubs"
export function getAllInTimeLine  () {
axios.get(url).then(res=>{
    var response = JSON.stringify(res)
    console.log(res.data[0])
    return res.data[0]
}).catch(error=>{
    console.error(error)
})
}