import "./FilterModal.scss";
import { Radio } from "antd";
import { DatePicker } from "antd";

interface PropsFilter {
  onChangeDateFrom: any;
  onChangeDateTo: any;
  status: any;
  setStatus: any;
  gateAll: any;
  setGateAll: any;
  gates: any;
  onChangeGate: any;
  onFilter: any;
}

function FilterModal(props: PropsFilter) {
  const gateNumber = [1, 2, 3, 4, 5];

  return (
    <div className="wrapper-modal">
      <h1 className="title-modal">Lọc vé</h1>

      <div className="date-modal">
        <div className="since-modal">
          <p>Từ ngày</p>
          <DatePicker
            placeholder="Chọn ngày"
            className="date-modal-input"
            format="DD/MM/YYYY"
            onChange={props.onChangeDateFrom}
          />
        </div>
        <div className="todate-modal">
          <p>Đến ngày</p>
          <DatePicker
            placeholder="Chọn ngày"
            className="date-modal-input"
            format="DD/MM/YYYY"
            onChange={props.onChangeDateTo}
          />
        </div>
      </div>

      <div className="usage-status-modal">
        <p className="title-usage">Tình trạng sử dụng</p>
        <div className="usage-status-modal-input">
          <Radio.Group
            name="radiogroup"
            defaultValue={props.status}
            onChange={(e) => {
              props.setStatus(e.target.value);
            }}
          >
            <Radio value="Tất cả">Tất cả </Radio>
            <Radio value="Đã sử dụng">Đã sử dụng</Radio>
            <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
            <Radio value="Hết hạn">Hết hạn</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className="checkin-modal">
        <p className="title-checkin">Cổng Check - in</p>
        <div className="checkin-modal-input">
          <div className="checkin-modal-input-child">
            <input
              type="checkbox"
              checked={props.gateAll}
              onChange={(e) => {
                props.setGateAll(e.target.checked);
              }}
            />
            <span>Tất cả</span>
          </div>

          {gateNumber.map((gateValue) => {
            return (
              <div key={gateValue} className="checkin-modal-input-child">
                <input
                  checked={
                    props.gates.includes("Cổng" + gateValue) ? true : false
                  }
                  type="checkbox"
                  value={"Cổng" + gateValue}
                  disabled={props.gateAll}
                  onChange={() => props.onChangeGate("Cổng" + gateValue)}
                />
                <span>Cổng {gateValue}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="filter-modal-button" onClick={props.onFilter}>
        <button>Lọc</button>
      </div>
    </div>
  );
}

export default FilterModal;
