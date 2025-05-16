import axios from "axios"

const url = "http://localhost:8080/api"

export async function registerShop(body:any) {
    return await axios.post(url+"/register-shop",body)
    .then((res)=>{
        console.log("res ",res)
        return res.data
    })
    .catch((err)=>{
        console.log("err ", err)
        return { result: false}
    })
}