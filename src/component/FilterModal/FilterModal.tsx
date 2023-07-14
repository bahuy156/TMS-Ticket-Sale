import "./FilterModal.scss";

function FilterModal() {
  return (
    <div className="wrapper-modal">
      <h1 className="title-modal">Lọc vé</h1>

      <div className="date-modal">
        <div className="since-modal">
          <p>Từ ngày</p>
          <input type="date" />
        </div>
        <div className="todate-modal">
          <p>Đến ngày</p>
          <input type="date" />
        </div>
      </div>

      <div className="usage-status-modal">
        <p className="title-usage">Tình trạng sử dụng</p>
        <div className="usage-status-modal-input">
          <div className="usage-status-modal-input-child">
            <input type="radio" />
            <span>Tất cả</span>
          </div>
          <div className="usage-status-modal-input-child">
            <input type="radio" />
            <span>Đã sử dụng</span>
          </div>
          <div className="usage-status-modal-input-child">
            <input type="radio" />
            <span>Chưa sử dụng</span>
          </div>
          <div className="usage-status-modal-input-child">
            <input type="radio" />
            <span>Hết hạn</span>
          </div>
        </div>
      </div>

      <div className="checkin-modal">
        <p className="title-checkin">Cổng Check - in</p>
        <div className="checkin-modal-input">
          <div className="checkin-modal-input-child">
            <input type="checkbox" />
            <span>Tất cả</span>
          </div>
          <div className="checkin-modal-input-child">
            <input type="checkbox" />
            <span>Cổng 1</span>
          </div>
          <div className="checkin-modal-input-child">
            <input type="checkbox" />
            <span>Cổng 2</span>
          </div>
        </div>

        <div className="checkin-modal-input">
          <div className="checkin-modal-input-child">
            <input type="checkbox" />
            <span>Cổng 3</span>
          </div>
          <div className="checkin-modal-input-child">
            <input type="checkbox" />
            <span>Cổng 4</span>
          </div>
          <div className="checkin-modal-input-child">
            <input type="checkbox" />
            <span>Cổng 5</span>
          </div>
        </div>
      </div>

      <div className="filter-modal-button">
        <button>Lọc</button>
      </div>
    </div>
  );
}

export default FilterModal;
