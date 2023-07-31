import "./TicketManage.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFunnel } from "react-icons/bs";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import db from "../../firebase/config";

import SelectPageManage from "../../component/SelectPage/SelectPageManage";
import FilterModal from "../../component/FilterModal/FilterModal";
import {
  getDocs,
  collection,
  query,
  where,
} from "@firebase/firestore";

import type { DatePickerProps } from "antd";
import TableFamily from "../../component/Tables/TableFamily";
import TableEvent from "../../component/Tables/TableEvent";
import UpdateDateModal from "../../component/UpdateDateModal/UpdateDateModal";

interface FirebaseData {
  id: string;
  bookingcode: string;
  eventname: string;
  gate: string;
  exportdate: string;
  status: string;
  ticketnumber: string;
  usedate: string;
}

function TicketManage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState<boolean>(false);

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const [status, setStatus] = useState<string>("Tất cả");

  const [gateAll, setGateAll] = useState<boolean>(false);
  const [gates, setGates] = useState<Array<String>>([]);

  const [pack, setPack] = useState<string>("family");
  const [packOption, setPackOption] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [actionFilter, setActionFilter] = useState<boolean>(false);

  const [searchTicketNum, setSearchTicketNum] = useState<string>("");

  const [filteredData, setFilteredData] = useState<FirebaseData[]>([]);

  const [tkNumModalUpdate, setTkNumModalUpdate] = useState<string>("");

  const [outUseDate, setOutUseDate] = useState<string>("");
  const [idUpdateDate, setIdUpdateDate] = useState<string>('')

  const [data, setData] = useState<FirebaseData[]>([]);
  const ticketCollectionFamily = collection(db, "ticket-list");
  const ticketCollectionEvent = collection(db, "ticket-list-event");

  useEffect(() => {
    getData(pack);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack, actionFilter, modalUpdateOpen]);

  const getData = async (value: string) => {
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
    if (!gateAll && gates.length) {
      q = query(q, where("gate", "in", gates));
    }

    const querySnapshot = await getDocs(q);
    const fetchDb: FirebaseData[] = [];

    querySnapshot.docs.map((doc) => {
      return fetchDb.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });

    setData(fetchDb);
  };

  // handle open modal filter
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // handle open modal update day / transmission data modal update day
  const handleOpenModalUpdate = (ticketNumber: string, outUseDate: string, id: string) => {
    setTkNumModalUpdate(ticketNumber);
    setModalUpdateOpen(!modalUpdateOpen);
    setOutUseDate(outUseDate);
    setIdUpdateDate(id)
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

  // handle change gates
  const onChangeGate = (value: String) => {
    const gateIndex = gates.findIndex((item) => item === value);

    if (gateIndex !== -1) {
      setGates([...gates.slice(0, gateIndex), ...gates.slice(gateIndex + 1)]);
    } else {
      setGates((prevState) => [...prevState, value]);
    }
  };

  // clear gates
  useEffect(() => {
    if (gateAll) {
      setGates([]);
    }
  }, [gateAll]);

  // handle filter value
  const onFilter = () => {
    setActionFilter(!actionFilter);
    setModalOpen(false);
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
    } else if (option === "event") {
      setPackOption(true);
    }
  };

  // handle change pages
  const rowPerPage: number = 10;

  const indexOfLastRow = currentPage * rowPerPage;
  const indexOfFirstRow = indexOfLastRow - rowPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleChangePages = (page: number) => {
    setCurrentPage(page);
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

  return (
    <div className="wrapper-ticket">
      <h2>Danh sách vé</h2>

      <div className="list-package">
        <button
          className={
            pack === "family"
              ? "list-package-option active"
              : "list-package-option"
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
              ? "list-package-option active"
              : "list-package-option"
          }
          onClick={() => {
            handlePackage("event");
            handleChangeOptions("event");
          }}
        >
          Gói sự kiện
        </button>
      </div>

      <div className="wrapper-header-ticket">
        <div className="search-ticket">
          <input
            value={searchTicketNum}
            placeholder="Tìm bằng số vé"
            type="text"
            onChange={handleChangeEvent}
          />
          <AiOutlineSearch size={28} style={{ cursor: "pointer" }} />
        </div>

        <div className="function-ticket">
          <div className="filter-modal">
            <Modal
              centered
              open={modalOpen}
              onCancel={() => setModalOpen(false)}
              footer={null}
              maskClosable={false}
            >
              <FilterModal
                onChangeDateFrom={onChangeDateFrom}
                onChangeDateTo={onChangeDateTo}
                status={status}
                setStatus={setStatus}
                gateAll={gateAll}
                setGateAll={setGateAll}
                gates={gates}
                onChangeGate={onChangeGate}
                onFilter={onFilter}
              />
            </Modal>
          </div>

          <button className="filter-button" onClick={handleOpenModal}>
            <BsFunnel size={20} />
            <span>Lọc vé</span>
          </button>

          <button className="export-button">
            <span>Xuất file (.csv)</span>
          </button>
        </div>
      </div>

      <div className="modal-update-day">
        <Modal
          centered
          open={modalUpdateOpen}
          footer={null}
          maskClosable={false}
          closeIcon
        >
          <UpdateDateModal
            handleOpenModalUpdate={handleOpenModalUpdate}
            tkNumModalUpdate={tkNumModalUpdate}
            pack={pack}
            useDate={outUseDate}
            idDate={idUpdateDate}
          />
        </Modal>
      </div>

      <div className="table-ticket">
        {!packOption ? (
          <TableFamily
            data={currentRows}
            handleOpenModalUpdate={handleOpenModalUpdate}
          />
        ) : (
          <TableEvent
            data={currentRows}
            handleOpenModalUpdate={handleOpenModalUpdate}
          />
        )}
      </div>

      <div className="select-page">
        <SelectPageManage
          data={filteredData}
          currentPage={currentPage}
          rowPerPage={rowPerPage}
          handleChangePages={handleChangePages}
        />
      </div>
    </div>
  );
}

export default TicketManage;
