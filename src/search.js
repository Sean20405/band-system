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
    const value = parseInt(e.target.defaultValue);
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
    const value = parseInt(e.target.defaultValue);
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
    
    const formData = new FormData();
    instrument.forEach(item => { formData.append('instrument', item) });
    region.forEach(item => { formData.append('region', item) });
    style.forEach(item => { formData.append('style', item) });
    /* === GET url ===
    const params = new URLSearchParams({})
    instrument.forEach(item => { params.append("instrument", item) });
    region.forEach(item => { params.append("region", item) });
    style.forEach(item => { params.append("style", item) });
    var para = '';
    instrument.forEach(item => { para = para + 'instrument=' + item + '&'; });
    region.forEach(item => { para = para + 'region=' + item + '&'; });
    style.forEach(item => { para = para + 'style=' + item + '&'; });
    para = para.slice(0, -1);
    const url = 'https://f139-140-113-235-250.ngrok-free.app/?' + para;*/

    fetch(`https://9837-3-112-171-158.ngrok-free.app/`, {
      method: 'POST',
      headers: { 'ngrok-skip-browser-warning': 'true' },
      body: formData
    }).then(
      res => res.json()
    ).then((data) => {
      console.log(data);
      console.log('Successfully search!');
      setIsPending(false);
      setHasResult(true);
      ref.current?.scrollIntoView({ behavior: '' });
    })
  }

  const styles = ['J-rock', 'Metal', 'J-pop', 'Lo-Fi', 'Jazz', 'Post Rock', 'Math Rock', 'Acoustic', 'Softcore', 'Pop-Punk', 'Country', "Others"];
  const regions = [["KLU", "基隆市"], ["TPH", "新北市"], ["TPE", "臺北市"], ["TYC", "桃園市"], ["HSH", "新竹縣"], ["HSC", "新竹市"], ["MAL", "苗栗縣"], ["TXG", "臺中市"], ["CWH", "彰化縣"], ["NTO", "南投縣"], ["YLH", "雲林縣"], ["CHY", "嘉義縣"], ["CYI", "嘉義市"], ["TNN", "臺南市"], ["KHH", "高雄市"], ["IUH", "屏東縣"], ["ILN", "宜蘭縣"], ["HWA", "花蓮縣"], ["TTT", "臺東縣"], ["PEH", "澎湖縣"], ["GNI", "綠島"], ["KYD", "蘭嶼"], ["KMN", "金門縣"], ["LNN", "連江縣"]];
  const Instruments = ["Electric Guitar", "KB", "Drums", "Bass", "Vocal", "Saxophone", "Cello", "Acoustic Guitar", "Trumper", "Others"];
  return (
    <div className="search">
      <div className="filter">
        <h2>Search for a musician!</h2>
        <form onSubmit={handleSubmit}>
          <div className="instrument">
            <h4>Instrument:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {Instruments.map((style, index) => (
                  <li><input type="checkbox" id={index} value={index} onChange={handleInstrumentChange}/><label for={index}>{style}</label></li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <br />
          <div className="region">
            <h4>Region:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {regions.map((region, index) => (
                  <li><input type="checkbox" id={10 + index} value={region[0]} onChange={handleRegionChange}/><label for={10 + index}>{region[1]}</label></li>
                ))}
              </ul>
            </div>
          </div>	
          <br />
          <br />
          <div className="style">
            <h4>Style:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {styles.map((style, index) => (
                  <li><input type="checkbox" id={34 + index} value={index} onChange={handleStyleChange}/><label for={34 + index}>{style}</label></li>
                ))}
              </ul>
            </div>
          </div>
          <br />
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

/*
{Instruments.map((style, index) => (
              <span style={{"white-space":"nowrap"}}><label><input type="checkbox" onChange={handleInstrumentChange} value={index}/>{style}</label></span>
            ))}
*/