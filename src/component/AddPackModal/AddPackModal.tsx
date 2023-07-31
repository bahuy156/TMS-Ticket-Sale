import "./AddPackModal.scss";
import { Input } from "antd";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Select } from "antd";
import db from "../../firebase/config";
import { collection, addDoc } from "@firebase/firestore";
import { useState } from "react";
import type { DatePickerProps } from "antd";

interface PropsModal {
  handleOpenModalAdd: any
  addNewData: any
}

function AddPackModal(props: PropsModal) {
  const [packName, setPackName] = useState<string>('')

  const [applicableDate, setApplicableDate] = useState<string>('');
  const [expriedDate, setExpriedDate] = useState<string>('');

  const [applicableTime, setApplicableTime] = useState<string>('');
  const [expriedTime, setExpriedTime] = useState<string>('');

  const [ticketPrice, setTicketPrice] = useState<string>('')
  const [comboPrice, setComboPrice] = useState<string>('')
  const [ticketQuantity, setTicketQuantity] = useState<string>('')

  const [statusAdd, setStatusAdd] = useState<string>('Đang áp dụng')

  // handle add package
  const packCollectionRef = collection(db, "package-list");

  const packNum = applicableDate.split("/").join('')

  const newTicketPrice = ticketPrice + " VNĐ"
  const newComboPrice = comboPrice + " VNĐ /" + ticketQuantity + " vé"

  const handleAddPack = async () => {
    try {
      const newDb = await addDoc(packCollectionRef, {
        packnum: packNum,
        packname: packName,
        applicabledate: applicableDate,
        exprieddate: expriedDate,
        applicabletime: applicableTime,
        expriedtime: expriedTime,
        ticketprice: newTicketPrice,
        comboprice: newComboPrice,
        status: statusAdd
      })

      props.addNewData({
        id: newDb.id,
        packnum: packNum,
        packname: packName,
        applicabledate: applicableDate,
        exprieddate: expriedDate,
        applicabletime: applicableTime,
        expriedtime: expriedTime,
        ticketprice: newTicketPrice,
        comboprice: newComboPrice,
        status: statusAdd
      })

      console.log("Gói đã được thêm");
      props.handleOpenModalAdd()
    } catch {
      console.log('Đã xảy ra lỗi khi thêm gói');
    }
  }

  // handle change value package name
  const handleChangePackName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valuePackName = e.target.value
    setPackName(valuePackName)
    console.log(valuePackName);
  }

  // handle change date
  const onChangeApplicableDate: DatePickerProps["onChange"] = (date, dateString) => {
    setApplicableDate(dateString);
    console.log(date, dateString);
  };

  const onChangeExpriedDate: DatePickerProps["onChange"] = (date, dateString) => {
    setExpriedDate(dateString);
    console.log(date, dateString);
  };

  // handle change time
  const onChangeApplicableTime = (time: any | null) => {
    const timeFormat = time.format("HH:mm:ss")
    setApplicableTime(timeFormat)
    console.log(timeFormat);
  };

  const onChangeExpriedTime = (time: any | null) => {
    const timeFormat = time.format("HH:mm:ss")
    setExpriedTime(timeFormat)
    console.log(timeFormat);
  };

  // handle change checked
  const onChangeChecked = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // handle change value price, combo price, quantity
  const onChangeTicketPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueTicketPrice = e.target.value
    setTicketPrice(valueTicketPrice)
    console.log(valueTicketPrice);
  }

  const onChangeComboPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueComboPrice = e.target.value
    setComboPrice(valueComboPrice)
    console.log(valueComboPrice);
  }

  const onChangeTicketQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueQuantity = e.target.value
    setTicketQuantity(valueQuantity)
    console.log(valueQuantity);
  }

  // handle change select
  const handleChangeSelect = (value: string) => {
    setStatusAdd(value)
  };

  return (
    <div className="warapper-add-pack">
      <h2 className="title-modal-add-pack">Thêm gói vé</h2>

      <div className="name-pack">
        <div className="name-pack-child">
          <p className="name-pack-title">Tên gói vé</p>
          <span>*</span>
        </div>
        <Input
          className="input-name-pack"
          placeholder="Nhập tên gói vé"
          size="large"
          onChange={(e) => handleChangePackName(e)}
        />
      </div>

      <div className="date-pack">
        <div className="date-pack-content">
          <p className="title-applicable">Ngày áp dụng</p>
          <div className="date-pack-content-child1">
            <DatePicker
              className="picker-pack-content-child"
              style={{ marginRight: 7 }}
              onChange={onChangeApplicableDate}
              format="DD/MM/YYYY"
            />
            <TimePicker
              className="picker-pack-content-child"
              onChange={onChangeApplicableTime}
            />
          </div>
        </div>

        <div className="date-pack-content">
          <p className="title-applicable">Ngày hết hạn</p>
          <div className="date-pack-content-child2">
            <DatePicker
              className="picker-pack-content-child"
              style={{ marginRight: 7 }}
              onChange={onChangeExpriedDate}
              format="DD/MM/YYYY"
            />
            <TimePicker
              className="picker-pack-content-child"
              onChange={onChangeExpriedTime}
            />
          </div>
        </div>
      </div>

      <div className="price-pack">
        <p>Giá vé áp dụng</p>
        <div className="price-pack-child">
          <Checkbox
            className="checkbox-price-pack-child"
            onChange={onChangeChecked}
          >
            Vé lẻ (vnđ/vé) với giá
          </Checkbox>
          <Input
            className="input-price-pack-child"
            placeholder="Giá vé"
            style={{ width: 120 }}
            onChange={(e) => onChangeTicketPrice(e)}
          />
          <span className="span-pack-child"> / vé</span>
        </div>

        <div className="price-pack-child">
          <Checkbox
            className="checkbox-price-pack-child"
            onChange={onChangeChecked}
          >
            Combo vé với giá
          </Checkbox>
          <Input
            className="input-price-pack-child"
            placeholder="Giá combo"
            style={{ width: 120 }}
            onChange={(e) => onChangeComboPrice(e)}
          />
          <span className="span-pack-child"> / </span>
          <Input
            className="input-price-pack-child"
            placeholder="Số vé"
            style={{ width: 80 }}
            onChange={(e) => onChangeTicketQuantity(e)}
          />
          <span className="span-pack-child">vé</span>
        </div>
      </div>

      <div className="status-pack">
        <p>Tình trạng</p>
        <Select
          className="select-status-pack"
          defaultValue="Đang áp dụng"
          style={{ width: 150 }}
          onChange={handleChangeSelect}
          options={[
            { value: "Đang áp dụng", label: "Đang áp dụng" },
            { value: "Tắt", label: "Tắt" },
          ]}
        />
      </div>

      <div className="note-pack">
        <span>*</span>
        <p>là thông tin bắt buộc</p>
      </div>

      <div className="button-pack">
        <button className="button-pack-first" onClick={props.handleOpenModalAdd} >Hủy</button>
        <button className="button-pack-second"onClick={handleAddPack} >Lưu</button>
      </div>
    </div>
  );
}

export default AddPackModal;
