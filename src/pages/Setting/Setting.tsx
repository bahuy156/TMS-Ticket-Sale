import { useCallback, useEffect, useState } from "react";
import "./Setting.scss";
import { AiOutlineSearch } from "react-icons/ai";
import db from "../../firebase/config";
import { getDocs, collection } from "@firebase/firestore";
import TablePack from "../../component/Tables/TablePack";
import { Modal } from "antd";
import AddPackModal from "../../component/AddPackModal/AddPackModal";
import UpdatePackModal from "../../component/UpdatePackModal/UpdatePackModal";

interface FirebaseData {
  id: string;
  packnum: string;
  packname: string;
  applicabledate: string;
  applicabletime: string;
  exprieddate: string;
  expriedtime: string;
  ticketprice: string;
  comboprice: string;
  quantity: string;
  status: string;
}

function Setting() {
  const [modalAddOpen, setModalAddOpen] = useState<boolean>(false);
  const [modalUpdateOpen, setModalUpdateOpen] = useState<boolean>(false);

  const [selectedPackId, setSelectedPackId] = useState<string>("");

  const [valueSearch, setValueSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<FirebaseData[]>([]);

  const [valuePackNum, setValuePackNum] = useState<string>("");
  const [valuePackName, setValuePackName] = useState<string>("");
  const [valueTicketPrice, setValueTicketPrice] = useState<string>("");
  const [valueComboPrice, setValueComboPrice] = useState<string>("");
  const [valueStatus, setValueStatus] = useState<string>("");

  const [data, setData] = useState<FirebaseData[]>([]);
  const packCollectionRef = collection(db, "package-list");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(packCollectionRef);
      const fetchDb: FirebaseData[] = [];

      querySnapshot.docs.map((doc) => {
        return fetchDb.push({ id: doc.id, ...doc.data() } as FirebaseData);
      });

      setData(fetchDb);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle update data when add package
  const addNewData = useCallback((newData: FirebaseData) => {
    setData((pevData) => [...pevData, newData]);
  }, []);

  // handle update data when update package
  const updateData = useCallback((updatedData: FirebaseData) => {
    setData((pevDb) =>
      pevDb.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
  }, []);

  // handle open modal filter
  const handleOpenModalAdd = () => {
    setModalAddOpen(!modalAddOpen);
  };

  const handleOpenModalUpdate = (
    id: string,
    packnum: string,
    packname: string,
    ticketprice: string,
    comboprice: string,
    status: string
  ) => {
    setSelectedPackId(id);
    setValuePackNum(packnum);
    setValuePackName(packname);
    setValueTicketPrice(ticketprice);
    setValueComboPrice(comboprice);
    setValueStatus(status)
    setModalUpdateOpen(!modalUpdateOpen);
  };

  // handle search by code package
  useEffect(() => {
    searchByCodePack(valueSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueSearch(value);
  };

  const searchByCodePack = (valueSearch: string) => {
    const searchData = data.filter((item) => {
      return item.packnum.includes(valueSearch);
    });
    setFilteredData(searchData);
  };

  return (
    <div className="wrapper-setting">
      <h2>Danh sách gói vé</h2>

      <div className="wrapper-header-ticket-pack">
        <div className="search-ticket">
          <input
            placeholder="Tìm bằng mã gói"
            type="text"
            onChange={(e) => handleChangeValue(e)}
          />
          <AiOutlineSearch size={28} style={{ cursor: "pointer" }} />
        </div>

        <div className="action-ticket">
          <div className="add-pack-modal">
            <Modal
              centered
              open={modalAddOpen}
              onCancel={() => setModalAddOpen(false)}
              footer={null}
              maskClosable={false}
              closeIcon
            >
              <AddPackModal
                handleOpenModalAdd={handleOpenModalAdd}
                addNewData={addNewData}
              />
            </Modal>
          </div>

          <button className="export-pack-button">
            <span>Xuất file (.csv)</span>
          </button>

          <button className="add-pack-button" onClick={handleOpenModalAdd}>
            <span>Thêm gói vé</span>
          </button>
        </div>
      </div>

      <div className="table-pack">
        <div className="update-pack-modal">
          <Modal
            centered
            open={modalUpdateOpen}
            onCancel={() => setModalUpdateOpen(false)}
            footer={null}
            maskClosable={false}
            closeIcon
          >
            <UpdatePackModal
              handleOpenModalUpdate={handleOpenModalUpdate}
              updateData={updateData}
              id={selectedPackId}
              valuePackNum={valuePackNum}
              valuePackName={valuePackName}
              valueTicketPrice={valueTicketPrice}
              valueComboPrice={valueComboPrice}
              valueStatus={valueStatus}
            />
          </Modal>
        </div>

        <TablePack
          data={filteredData}
          handleOpenModalUpdate={handleOpenModalUpdate}
        />
      </div>
    </div>
  );
}

export default Setting;
