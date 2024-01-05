import { useState } from "react";
//import { useHistory } from "react-router-dom";
const Search = () => {

  const [instrument, setInstrument] = useState('');
  const [region, setRegion] = useState('');
  const [style, setStyle] = useState('');
  //const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const condition = {instrument, region, style};

    console.log(condition);
    /*setIsPending(true);
    fetch('http://localhost:8000/blogs/', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(blog)
    }).then(() => {
      setIsPending(false);
      console.log('Successfully create a new blog');
      navigate('/');
    })*/
  }

  return (
    <div className="search">
      <h2>Search for a musician!</h2>
      <form onSubmit={handleSubmit}>
        <label>Type of instrument:
          <select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
              <option value="KB">Keyboard</option>
              <option value="GT">吉他</option>
              <option value="BS">Bass</option>
              <option value="VC">Vocal</option>
              <option value="DM">鼓</option>
          </select>
        </label>
        <br />
        <label>Region: 
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="KLU">基隆市</option>	
            <option value="TPH">新北市</option>	
            <option value="TPE">臺北市</option>	
            <option value="TYC">桃園市</option>	
            <option value="HSH">新竹縣</option>	
            <option value="HSC">新竹市</option>	
            <option value="MAC">苗栗市</option>	
            <option value="MAL">苗栗縣</option>	
            <option value="TXG">臺中市</option>	
            <option value="CWH">彰化縣</option>	
            <option value="CWS">彰化市</option>	
            <option value="NTC">南投市</option>	
            <option value="NTO">南投縣</option>	
            <option value="YLH">雲林縣</option>	
            <option value="CHY">嘉義縣</option>	
            <option value="CYI">嘉義市</option>	
            <option value="TNN">臺南市</option>	
            <option value="KHH">高雄市</option>	
            <option value="IUH">屏東縣</option>	
            <option value="PTS">屏東市</option>	
            <option value="ILN">宜蘭縣</option>	
            <option value="ILC">宜蘭市</option>	
            <option value="HWA">花蓮縣</option>	
            <option value="HWC">花蓮市</option>	
            <option value="TTC">臺東市</option>	
            <option value="TTT">臺東縣</option>	
            <option value="PEH">澎湖縣</option>	
            <option value="GNI">綠島</option>
            <option value="KYD">蘭嶼</option>
            <option value="KMN">金門縣</option>	
            <option value="MZW">馬祖</option>
            <option value="LNN">連江縣</option>	
          </select>
        </label>
        <br />
        <label>Style:
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="1">獨立</option>
              <option value="2">搖滾</option>
              <option value="3">抒情</option>
              <option value="4">R&B</option>
              <option value="5">IDK...</option>
          </select>
        </label>
        <br />
        <button>Search!</button>
      </form>
  </div>
  );
}
 
export default Search;