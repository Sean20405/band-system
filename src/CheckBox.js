const CheckBox = () => {
  return(
    <div className="checkBox">
      <input class="inp-cbx" id="morning" type="checkbox"></input>
      <label class="cbx" for="morning"><span>
        <svg width="12px" height="10px">
        </svg></span><span>Morning</span>
      </label>
    </div>
    
  )
}
export default CheckBox;