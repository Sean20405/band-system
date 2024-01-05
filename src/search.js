import { useState, useRef } from "react";
import SearchResult from "./SearchResult";
const Search = () => {

  const [instrument, setInstrument] = useState([]);
  const [region, setRegion] = useState([]);
  const [style, setStyle] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const ref = useRef(null);

  const handleInstrumentChange = (e) => {
    console.log(e);
    const value = e.target.defaultValue;
    if (e.target.checked) {
      setInstrument(instrument => [...instrument, `${value}`]);
      console.log('Add ' + value + ' successfully!');
    }
    else {
      setInstrument(instrument.filter(item => item !== value));
      console.log('Delete ' + value + ' successfully!');
    }
    console.log('Current selected: ' + instrument);
  };

  const handleStyleChange = (e) => {
    console.log(e);
    const value = e.target.defaultValue;
    if (e.target.checked) {
      setStyle(item => [...item, `${value}`]);
      console.log('Add ' + value + ' successfully!');
    }
    else {
      setStyle(style.filter(item => item !== value));
      console.log('Delete ' + value + ' successfully!');
    }
    console.log('Current selected: ' + style);
  };

  const handleRegionChange = (e) => {
    //const key = event
    console.log(e);
    const value = e.target.defaultValue;
    if (e.target.checked) {
      setRegion(item => [...item, `${value}`]);
      console.log('Add ' + value + ' successfully!');
    }
    else {
      setRegion(region.filter(item => item !== value));
      console.log('Delete ' + value + ' successfully!');
    }
    console.log('Current selected: ' + region);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const params = new URLSearchParams({})
    instrument.forEach(item => { params.append("instrument", item) });
    region.forEach(item => { params.append("region", item) });
    style.forEach(item => { params.append("style", item) });
    /*var para = '';
    instrument.forEach(item => { para = para + 'instrument=' + item + '&'; });
    region.forEach(item => { para = para + 'region=' + item + '&'; });
    style.forEach(item => { para = para + 'style=' + item + '&'; });
    para = para.slice(0, -1);
    const url = 'https://f139-140-113-235-250.ngrok-free.app/?' + para;*/

    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    };
    console.log(`https://f139-140-113-235-250.ngrok-free.app/?${params}`);
    //setIsPending(true);
    fetch(`https://f139-140-113-235-250.ngrok-free.app/?${params}`, {
      method: 'GET',
      headers: headers
    }).then((response) => {
      console.log(response.json());
      console.log('Successfully search!');
      setIsPending(false);
      setHasResult(true);
    }).then(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    })
  }

  return (
    <div className="search">
      <div className="filter">
        <h2>Search for a musician!</h2>
        <form onSubmit={handleSubmit}>
          <h4>Instrument:</h4>
            <label><input type="checkbox" classname="keyboard" onChange={handleInstrumentChange} value="1"/>Keyboard</label>
            <label><input type="checkbox" onChange={handleInstrumentChange} value="2"/>吉他</label>
            <label><input type="checkbox" onChange={handleInstrumentChange} value="3"/>Bass</label>
            <label><input type="checkbox" onChange={handleInstrumentChange} value="4"/>Vocal</label>
            <label><input type="checkbox" onChange={handleInstrumentChange} value="5"/>鼓</label>
          <br />
          <br />
          <h4>Region:</h4>
            <label><input type="checkbox" onChange={handleRegionChange} value="KLU"/>基隆市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="TPH"/>新北市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="TPE"/>臺北市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="TYC"/>桃園市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="HSH"/>新竹縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="HSC"/>新竹市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="MAL"/>苗栗縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="TXG"/>臺中市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="CWH"/>彰化縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="NTO"/>南投縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="YLH"/>雲林縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="CHY"/>嘉義縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="CYI"/>嘉義市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="TNN"/>臺南市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="KHH"/>高雄市</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="IUH"/>屏東縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="ILN"/>宜蘭縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="HWA"/>花蓮縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="TTT"/>臺東縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="PEH"/>澎湖縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="GNI"/>綠島</label>
            <label><input type="checkbox" onChange={handleRegionChange} value="KYD"/>蘭嶼</label>
            <label><input type="checkbox" onChange={handleRegionChange} value="KMN"/>金門縣</label>	
            <label><input type="checkbox" onChange={handleRegionChange} value="LNN"/>連江縣</label>	
          <br />
          <br />
          <h4>Style:</h4>
            <label><input type="checkbox" onChange={handleStyleChange} value="1"/>獨立</label>
            <label><input type="checkbox" onChange={handleStyleChange} value="2"/>搖滾</label>
            <label><input type="checkbox" onChange={handleStyleChange} value="3"/>抒情</label>
            <label><input type="checkbox" onChange={handleStyleChange} value="4"/>R&B</label>
            <label><input type="checkbox" onChange={handleStyleChange} value="5"/>IDK...</label>
          <br />
          { !isPending && (<button>Search!</button>) }
          { isPending && (<button disabled style={{color: "#eb91ac"}}>Searching...</button>) }
        </form>
      </div>
      { hasResult && 
      (<div className="result" ref={ref}>
        <SearchResult></SearchResult>
      </div>) }
  </div>
  
  );
}
 
export default Search;