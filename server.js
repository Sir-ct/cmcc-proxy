const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
const CMC_KEY = "bb59d24c-a855-43b5-836a-163f35a328c4"
const base_url = "https://pro-api.coinmarketcap.com"
const port = 3025

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/all-listings", async (req, res)=>{
    console.log("requesting")
    //let resp = await getDataFromCMC(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`)
    let respcg = await getDatafromCoinGecko(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true`)
    console.log(respcg.response)
    res.json({data: respcg.response})
})

app.get("/trending-latest", async (req, res)=>{
    let resp = await getDataFromCMC(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/latest?limit=5`)
    console.log(resp)
    res.json({data: resp.response})
})

app.get("/fear-greed", async(req, res)=>{
    let resp = await getDataFromCMC(`https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest`)
    console.log(resp)
    res.json({data: resp.response})
})

app.get("/", (req, res)=>{
    console.log("hello")
})


async function getDataFromCMC(url){
        try{
            let response = null;
            response = await axios.get(url, {
                headers: {
                    "Accept": "application/json",
                    "X-CMC_PRO_API_KEY": CMC_KEY
                    //"x-cg-demo-api-key": "CG-ZkPiNUHJodnK7qrnGwx1Rcoj"
                }
            })
            console.log(response.data)
            return {success: true, response: response.data}
        }catch(e){
            console.log(e)
            return {success: false, response: e}
        }
     
}

async function getDatafromCoinGecko(url){
    try{
        let response = null;
        response = await axios.get(url, {
            headers: {
                "Accept": "application/json",
                "x-cg-demo-api-key": "CG-ZkPiNUHJodnK7qrnGwx1Rcoj"
            }
        })
        console.log(response.data)
        return {success: true, response: response.data}
    }catch(e){
        console.log(e)
        return {success: false, e}
    }
}

app.listen(port, ()=>{
    console.log("app listening on port "+ port)
})