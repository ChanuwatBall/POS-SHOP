import axios from "axios"

const url = "http://localhost:8080"

export async function registerShop(body:any) {
    return await axios.post(url+"/api/register-shop",body)
    .then((res)=>{
        console.log("res ",res)
        return res.data
    })
    .catch((err)=>{
        console.log("err ", err)
        return { result: false}
    })
}

export async function registered() {
    return await axios.get(url+"/api/isRegisterSite",{
        headers:{
           "mySite": window.location.host
        }
    })
    .then((res)=>{
        console.log("res ",res)
        return res.data
    })
    .catch((err)=>{
        console.log("err ", err)
        return { result: false}
    })
}