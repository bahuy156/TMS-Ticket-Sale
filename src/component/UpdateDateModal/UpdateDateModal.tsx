import "./UpdateDateModal.scss";
import dayjs from "dayjs";
import CalendarValue from "../Calendar/CalendarValue";
import { useState } from "react";
import { collection, doc, updateDoc } from "@firebase/firestore";
import db from "../../firebase/config";

interface PropsModal {
  handleOpenModalUpdate: any;
  tkNumModalUpdate: string;
  pack: string;
  useDate: string;
  idDate: string;
}

function UpdateDateModal(props: PropsModal) {
  const [newDate, setNewdate] = useState<dayjs.Dayjs>();

  const ticketCollectionFamily = collection(db, "ticket-list");
  const ticketCollectionEvent = collection(db, "ticket-list-event");

  const handleUpdate = async () => {
    try {
      // Update date
      if (newDate) {
        const docRef = doc(
          props.pack === "family"
            ? ticketCollectionFamily
            : ticketCollectionEvent,
          props.idDate
        );
        await updateDoc(docRef, { usedate: newDate.format("DD/MM/YYYY") });
      }

      // close modal
      props.handleOpenModalUpdate();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="wrapper-modal-updateday">
      <h2 className="title-modal-updateday">Đổi ngày sử dụng vé</h2>

      <div className="update-ticket-num update-day">
        <p>Số vé</p>
        <span>{props.tkNumModalUpdate}</span>
      </div>

      <div className="update-ticket-type update-day">
        <p>Loại vé</p>
        {props.pack === "family" ? (
          <span>Vé cổng - Gói gia đình</span>
        ) : (
          <span>Vé cổng - Gói sự kiện</span>
        )}
      </div>

      {props.pack === "family" ? (
        <></>
      ) : (
        <div className="update-name-event update-day">
          <p>Tên sự kiện</p>
          <span>Hội chợ triển lãm hàng tiêu dùng 2023</span>
        </div>
      )}

      <div className="update-expiry update-day">
        <p>Hạn sử dụng</p>
        <CalendarValue newUseDate={setNewdate} />
      </div>

      <div className="button-update-day">
        <button
          className="button-update-day-first"
          onClick={props.handleOpenModalUpdate}
        >
          Hủy
        </button>
        <button onClick={handleUpdate} className="button-update-day-second">
          Lưu
        </button>
      </div>
    </div>
  );
}

export default UpdateDateModal;
