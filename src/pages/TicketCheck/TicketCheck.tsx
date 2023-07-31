import "./TicketCheck.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs"
import { Radio } from "antd";
import { DatePicker } from "antd";
import TableCheckFamily from "../../component/Tables/TableCheckFamily";
import { useEffect, useState } from "react";
import db from "../../firebase/config";
import { getDocs, collection, query, where } from "@firebase/firestore";
import SelectPageCheck from "../../component/SelectPage/SelectPageCheck";
import TableCheckEvent from "../../component/Tables/TableCheckEvent";
import type { DatePickerProps } from "antd";

interface FirebaseData {
  id: string;
  ticketnumber: string;
  eventname: string;
  usedate: string;
  tickettype: string;
  gate: string;
  status: string;
}

function TicketCheck() {
  const [searchTicketNum, setSearchTicketNum] = useState<string>("");

  const [filteredData, setFilteredData] = useState<FirebaseData[]>([]);

  const [pack, setPack] = useState<string>("family");
  const [packOption, setPackOption] = useState<boolean>(false);

  const [selectOption, setSelectOption] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("Tất cả");

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const [actionFilter, setActionFilter] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [data, setData] = useState<FirebaseData[]>([]);
  const ticketCollectionFamily = collection(db, "tkcheck-gd");
  const ticketCollectionEvent = collection(db, "tkcheck-ev");

  useEffect(() => {
    fetchData(pack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack, actionFilter]);

  const fetchData = async (value: string) => {
    let q = query(
      value === "family" ? ticketCollectionFamily : ticketCollectionEvent
    );

    if (status !== "Tất cả") {
      q = query(q, where("status", "==", status));
    }
    if (dateFrom) {
      q = query(q, where("usedate", ">=", dateFrom));
    }
    if (dateTo) {
      q = query(q, where("usedate", "<=", dateTo));
    }

    const querySnapshot = await getDocs(q);
    const fetchDb: FirebaseData[] = [];

    querySnapshot.docs.map((doc) => {
      return fetchDb.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });

    setData(fetchDb);
  };

  // search by ticket number
  useEffect(() => {
    searchByTicketNum(searchTicketNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTicketNum]);

  useEffect(() => {
    // Khởi tạo trạng thái filteredData với dữ liệu gốc
    setFilteredData(data);
  }, [data]);

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tickNum = e.target.value;
    setSearchTicketNum(tickNum);
  };

  const searchByTicketNum = (ticketNum: string) => {
    const searchData = data.filter((item) =>
      item.ticketnumber.includes(ticketNum)
    );
    setFilteredData(searchData);
  };

  // handle active button list package
  const handlePackage = (pack: string) => {
    if (pack === "family") {
      setPack("family");
    } else if (pack === "event") {
      setPack("event");
    }
  };

  // hanlde change options
  const handleChangeOptions = (option: string) => {
    if (option === "family") {
      setPackOption(false);
      setSelectOption(false);
    } else if (option === "event") {
      setPackOption(true);
      setSelectOption(true);
    }
  };

  // handle change date
  const onChangeDateFrom: DatePickerProps["onChange"] = (date, dateString) => {
    setDateFrom(dateString);
    console.log(date, dateString);
  };

  const onChangeDateTo: DatePickerProps["onChange"] = (date, dateString) => {
    setDateTo(dateString);
    console.log(date, dateString);
  };

  // handle filter
  const onFilter = () => {
    setActionFilter(!actionFilter);
  };

  // handel change pages
  const rowsPerPage: number = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="wrapper-ticketcheck">
      <div className="ticketcheck">
        <h2>Đối soát vé</h2>

        <div className="list-package-check">
          <button
            className={
              pack === "family"
                ? "list-package-option-check active"
                : "list-package-option-check"
            }
            onClick={() => {
              handlePackage("family");
              handleChangeOptions("family");
            }}
          >
            Gói gia đình
          </button>

          <button
            className={
              pack === "event"
                ? "list-package-option-check active"
                : "list-package-option-check"
            }
            onClick={() => {
              handlePackage("event");
              handleChangeOptions("event");
            }}
          >
            Gói sự kiện
          </button>
        </div>

        <div className="wrapper-header-ticketcheck">
          <div className="search-ticketcheck">
            <input
              placeholder="Tìm bằng số vé"
              type="text"
              onChange={handleChangeEvent}
            />
            <AiOutlineSearch size={28} style={{ cursor: "pointer" }} />
          </div>

          <div className="check-button">
            <button>Chốt đối soát</button>
          </div>
        </div>

        <div className="table-ticket">
          {!packOption ? (
            <TableCheckFamily data={currentRows} />
          ) : (
            <TableCheckEvent data={currentRows} />
          )}
        </div>

        <div className="select-page">
          <SelectPageCheck
            data={filteredData}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>

      <div className="ticket-filter">
        <h3 className="title-ticket-filter">Lọc vé</h3>

        {selectOption ? (
          <div className="select-wrapper">
            <select className="select-package" name="package" id="" disabled >
              <option value="">Hội chợ triển lãm tiêu dùng 2023</option>
            </select>
              <BsChevronDown className="select-icon" size={15} />
          </div>
        ) : (
          <></>
        )}

        <div className="check-status">
          <div className="check-input">
            <p>Tình trạng đối soát</p>

            <Radio.Group
              className="check-radio"
              name="radiogroup"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <Radio value="Tất cả">Tất cả </Radio>
              <Radio value="Đã đối soát">Đã đối soát</Radio>
              <Radio value="Chưa đối soát">Chưa đối soát</Radio>
            </Radio.Group>
          </div>

          <div className="type-rangeday-check">
            <div className="type-check">
              <p>Loại vé</p>
              <span>Vé cổng</span>
            </div>
            <div className="since-check">
              <p>Từ ngày</p>
              <DatePicker
                placeholder="Chọn ngày"
                className="date-modal-input-check"
                format="DD/MM/YYYY"
                onChange={onChangeDateFrom}
              />
            </div>
            <div className="todate-check">
              <p>Đến ngày</p>
              <DatePicker
                placeholder="Chọn ngày"
                className="date-modal-input-check"
                format="DD/MM/YYYY"
                onChange={onChangeDateTo}
              />
            </div>
          </div>

          <div className="filter-check" onClick={onFilter}>
            <button>Lọc</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketCheck;
