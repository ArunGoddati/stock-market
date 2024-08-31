import {Component} from "react"
import Plot from 'react-plotly.js';
import "./index.css"
class StockMarket extends Component{
    state = {stockChartXvalues:[], stockChartYvalues:[]}

    componentDidMount() {
        this.getStockMarketData();
    }

    getStockMarketData = async () =>{
        let stockChartXvaluesFunction = [];
        let stockChartYvaluesFunction = [];
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=1min&apikey=demo`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        for (var key in data["Time Series (1min)"]){
          stockChartXvaluesFunction.push(key)
          stockChartYvaluesFunction.push(data["Time Series (1min)"][key]["1. open"])
        }
    
        this.setState({
          stockChartXvalues:stockChartXvaluesFunction,
          stockChartYvalues:stockChartYvaluesFunction,
        })
      }

    render(){
        const {stockChartXvalues, stockChartYvalues} = this.state
        return (
            <div className="bag-container">
                <div>
                    <h1 className="main-heading">Stock Market of IBM</h1>
                    <p className="information-heading">Information: <spna className="information-text">Intraday (1min) open, high, low, close prices and value</spna></p>
                    <p className="information-heading">Symbol: <span className="information-text">IBM</span></p>
                    <p className="information-heading">Last Refreshed: <span className="information-text">2024-08-23 19:59:00</span></p>
                    <p className="information-heading">Interval: <span className="information-text">1min</span></p>
                    <p className="information-heading">Output Size: <span className="information-text">Compact</span></p>
                    <p className="information-heading">Time Zone: <span className="information-text">US/Eastern</span></p>
                </div>
                <Plot
                    data={[
                        {
                            x:stockChartXvalues,
                            y:stockChartYvalues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                        },
                    ]}
                    layout={{width:400, height:640, title: ''}}
                />
            </div>
        )
    }
}

export default StockMarket