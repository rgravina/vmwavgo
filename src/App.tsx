import React, { useState } from 'react';
import './App.css';

const vmw = {
  priceAquired: 142,
  priceBeforeClose: 180.61
}

const avgo = {
  stockConversionRate: 0.252,
  currentPrice: 944.30
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const defaultWithholdingTax = 15;

function App() {
  const [vmwStock, setVmwStock] = useState(100)
  const [avgoStock, setAvgoStock] = useState(13)
  const [avgoStockPrice, setAvgoStockPrice] = useState(avgo.currentPrice)
  const [withholdingTax, setWithholdingTax] = useState(defaultWithholdingTax)

  const totalIfAllAvgo = (vmwStock * avgo.stockConversionRate);
  const avgoPercent = avgoStock / totalIfAllAvgo * 100;
  const avgoValue = avgoStock * avgoStockPrice;
  const cashPercent = 100 - avgoPercent;
  const expectedCash = vmw.priceAquired * (vmwStock * cashPercent/100);

  return (
    <div className="App">
      <header className="App-header">
        <h1><span className="vmw">VMW</span> to <span className="avgo">AVGO</span> Stock Migration</h1>
      </header>
      <main>
        <div className="form">
        <div>You had: <input value={vmwStock} maxLength={5} onChange={(e) => setVmwStock(Number(e.target.value))}/> <span className="vmw">VMW</span>.</div>
        <div>You have: <input value={avgoStock} maxLength={5} onChange={(e) => setAvgoStock(Number(e.target.value))}/> <span className="avgo">AVGO</span>.</div>
        </div>
        <div>
        <div className="stock">
          <h2>Stock Portion</h2>
          <ul>
            <li>{avgoPercent.toFixed(2)}% of your <span className="vmw">VMW</span> is <span className="avgo">AVGO</span> now (at a conversion rate of {avgo.stockConversionRate} <span className="avgo">AVGO</span> per <span className="vmw">VMW</span> share).</li>
            <li>Your <span className="avgo">AVGO</span> is worth {usdFormatter.format(avgoValue)} at its current price of <input type="number" value={avgoStockPrice} maxLength={5} onChange={(e) => setAvgoStockPrice(Number(e.target.value))}/>.</li>
          </ul>
          </div>
          <div className="cash">
            <h2>Cash Portion</h2>
            <ul>
              <li>{cashPercent.toFixed(2)}% of your <span className="vmw">VMW</span> was converted to cash at a price of {usdFormatter.format(vmw.priceAquired)}.</li>
              <li>{usdFormatter.format(expectedCash)} before tax cash expected.</li>
              <li>{usdFormatter.format(expectedCash * (100 - withholdingTax)/100)} after <input className="percentage" value={withholdingTax} maxLength={2} onChange={(e) => setWithholdingTax(Number(e.target.value))}/>% US tax withholding.</li>
            </ul>
            </div>
          <h2>Other Info</h2>
          <ul>
            <li>Your <span className="vmw">VMW</span> was worth {usdFormatter.format(vmwStock * vmw.priceBeforeClose)} before conversion when it hit its peak of {usdFormatter.format(vmw.priceBeforeClose)}.</li>
            <li>Your <span className="vmw">VMW</span> would be worth {usdFormatter.format(vmwStock * vmw.priceAquired)} if you got all cash at a price of {usdFormatter.format(vmw.priceAquired)}.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
