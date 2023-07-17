import "./TicketManage.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFunnel } from "react-icons/bs";
import { Modal } from "antd";
import { useState, useEffect } from "react";
import db from "../../firebase/config";

import SelectPage from "../../component/SelectPage/SelectPage";
import FilterModal from "../../component/FilterModal/FilterModal";
import { getDocs, collection, query, where } from "@firebase/firestore";

import type { DatePickerProps } from "antd";

interface FirebaseData {
  id: string;
  bookingcode: string;
  checkin: string;
  exportdate: string;
  status: string;
  ticketnumber: string;
  usedate: string;
}

function TicketManage() {
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState<FirebaseData[]>([]);
  const ticketCollectionRef = collection(db, "ticket-list");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(ticketCollectionRef);

      const fetchData: FirebaseData[] = [];

      querySnapshot.docs.map((doc) => {
        return fetchData.push({ id: doc.id, ...doc.data() } as FirebaseData);
      });

      setData(fetchData);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // handle change date
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const onChangeDateFrom: DatePickerProps["onChange"] = (date, dateString) => {
    setDateFrom(dateString);
    console.log(date, dateString);
  };

  const onChangeDateTo: DatePickerProps["onChange"] = (date, dateString) => {
    setDateTo(dateString);
    console.log(date, dateString);
  };

  const [status, setStatus] = useState("all");

  const [gateAll, setGateAll] = useState(false);
  const [gates, setGates] = useState<Array<String>>([]);

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
  const onFilter = async () => {
    const filterQuery = query(
      ticketCollectionRef,
      where("status", "==", status),
      where("usedate", ">=", dateFrom),
      where("usedate", "<=", dateTo)
      // where("checkin", "array-contains", gates)
    );

    const querySnapshot = await getDocs(filterQuery);

    const fetchData: FirebaseData[] = [];

    querySnapshot.docs.map((doc) => {
      return fetchData.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });

    console.log(fetchData);

    setData(fetchData);
    setModalOpen(false);
  };

  return (
    <div className="wrapper-ticket">
      <h2>Danh sách vé</h2>

      <div className="wrapper-header-ticket">
        <div className="search-ticket">
          <input placeholder="Tìm bằng số vé" type="text" />
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

      <div className="table-ticket">
        <table>
          <tr>
            <th>STT</th>
            <th>Booking code</th>
            <th>Số vé</th>
            <th>Tình trạng sử dụng</th>
            <th>Ngày sử dụng</th>
            <th>Ngày xuất vé</th>
            <th>Cổng check - in</th>
          </tr>
          {data.map((item, index) => {
            let clStatus;

            if (item.status === "Chưa sử dụng") {
              clStatus = "notused";
            } else if (item.status === "Hết hạn") {
              clStatus = "expired";
            } else if (item.status === "Đã sử dụng") {
              clStatus = "used";
            }

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.bookingcode}</td>
                <td>{item.ticketnumber}</td>
                <td className={clStatus}>{item.status}</td>
                <td>{item.usedate}</td>
                <td>{item.exportdate}</td>
                <td>{item.checkin}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="select-page">
        <SelectPage />
      </div>
    </div>
  );
}

export default TicketManage;
