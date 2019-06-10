let axios = require('axios');
let unirest = require('unirest')
// let uri = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo`

home = (req, res) => {


    let api_key = '27G65DPLJKLO4FFD';
    let base_uri = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=${api_key}&symbol=`

    let body = req.body;
    if(!body) return _response(res, true, null, "Body can't be empty");
    let {symbol} = body;
    if(!symbol) return _response(res, true, null, "Body must contain 'symbol' property");

    let uri = `${base_uri}${symbol}`;

    return axios.get(uri).then(response => {
        let data = response.data;
        if(data['Error Message']) return _response(res, true, null, data['Error Message'])
        return _response(res, false, {data}, 'Successfully fetched stok ticker price')
    }).catch(error => {
       return _response(res, true, null, "Error Fetching stock ticker prices")
    })


};

// unirest.get("https://investors-exchange-iex-trading.p.rapidapi.com/stock/amzn/chart/1m")
// .header("X-RapidAPI-Host", "investors-exchange-iex-trading.p.rapidapi.com")
// .header("X-RapidAPI-Key", "629fd703d6mshda107f06ff48df7p16c6b0jsn450ce46ae36c")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });

chart = (req, res) => {
    let body = req.body;
    if(!body) return _response(res, true, null, "Body can't be empty");
    let {symbol} = body;
    if(!symbol) return _response(res, true, null, "Body must contain 'symbol' property");

    let uri = `https://investors-exchange-iex-trading.p.rapidapi.com/stock/${symbol}/chart/1d`;
    console.log(uri)

    return axios.get(uri, {
        headers: {
            "X-RapidAPI-Host": "investors-exchange-iex-trading.p.rapidapi.com",
            "X-RapidAPI-Key": "629fd703d6mshda107f06ff48df7p16c6b0jsn450ce46ae36c"
        }
    }).then(result => {
        return _response(res, false, {data: result.data}, 'Successfully fetched stok ticker price')
    }).catch(error => {
        if(error.response.data){
            return _response(res, true, null, error.response.data)
        }
        return _response(res, true, null, "Error Fetching stock ticker prices")

    })

    // return unirest.get(uri)
    // .header("X-RapidAPI-Host", "investors-exchange-iex-trading.p.rapidapi.com")
    // .header("X-RapidAPI-Key", "629fd703d6mshda107f06ff48df7p16c6b0jsn450ce46ae36c")
    // .end(function (result) {
    // console.log(result.status);
    // if(result.status !== 200){
    //     return _response(res, true, null, result.body)
    // }
    // return _response(res, false, {data: result.body}, 'Successfully fetched stok ticker price')
    // });
}

function _response(res, error, data, message){
    return res.json({
      error, data, message
    })
  }


module.exports = {
    home,chart
};