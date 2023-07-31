import "./UpdatePackModal.scss";
import { Input } from "antd";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Select } from "antd";
import db from "../../firebase/config";
import { useEffect, useState } from "react";
import type { DatePickerProps } from "antd";
import { collection, updateDoc, doc } from "@firebase/firestore";

interface PropsModal {
  handleOpenModalUpdate: any
  id: string
  updateData: any
  valuePackNum: string
  valuePackName: string
  valueTicketPrice: string
  valueComboPrice: string
  valueStatus: string
}

function UpdatePackModal(props: PropsModal) {
  const [codePackNum, setCodePackNum] = useState<string>('')
  const [packName, setPackName] = useState<string>('')

  const [applicableDate, setApplicableDate] = useState<string>('');
  const [expriedDate, setExpriedDate] = useState<string>('');

  const [applicableTime, setApplicableTime] = useState<string>('');
  const [expriedTime, setExpriedTime] = useState<string>('');

  const [ticketPrice, setTicketPrice] = useState<string>('')
  const [comboPrice, setComboPrice] = useState<string>('')
  const [ticketQuantity, setTicketQuantity] = useState<string>('')

  const [statusAdd, setStatusAdd] = useState<string>('')

  // handle switch value 
  useEffect(()=>{
    setCodePackNum(props.valuePackNum)
    setPackName(props.valuePackName)
    setStatusAdd(props.valueStatus)
  },[props.valuePackNum, props.valuePackName, props.valueStatus])

  //handle update package
  const packCollectionRef = collection(db, "package-list");

  const newTicketPrice = ticketPrice + " VNĐ"
  const newComboPrice = comboPrice + " VNĐ /" + ticketQuantity + " vé"
  
  const handleUpdatePack = async () => {
    try {
      const packDocRef = doc(packCollectionRef, props.id)
      await updateDoc(packDocRef, {
        packnum: codePackNum,
        packname: packName,
        applicabledate: applicableDate,
        exprieddate: expriedDate,
        applicabletime: applicableTime,
        expriedtime: expriedTime,
        ticketprice: newTicketPrice,
        comboprice: newComboPrice,
        status: statusAdd
      })

      props.updateData({
        id: props.id,
        packnum: codePackNum,
        packname: packName,
        applicabledate: applicableDate,
        exprieddate: expriedDate,
        applicabletime: applicableTime,
        expriedtime: expriedTime,
        ticketprice: newTicketPrice,
        comboprice: newComboPrice,
        status: statusAdd
      })

      console.log('Gói đã được cập nhật');
      props.handleOpenModalUpdate()
    } catch {
      console.log("Đã xảy ra lỗi khi cập nhật gói");
    }
  }

  // handle change value code package name
  const handleChangeCodePackName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueCodePackName = e.target.value
    setCodePackNum(valueCodePackName)
  }

  // handle change value package name
  const handleChangePackName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valuePackName = e.target.value
    setPackName(valuePackName)
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

  // handle checked
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
      <h2 className="title-modal-add-pack">Cập nhật thông tin gói vé</h2>

      <div className="wrapper-info-pack">
        <div className="code-pack">
          <div className="name-pack-child">
            <p className="name-pack-title">Mã gói</p>
            <span>*</span>
          </div>
          <Input
            value={codePackNum}
            className="input-name-pack"
            placeholder="Nhập mã gói"
            onChange={(e) => handleChangeCodePackName(e)}
          />
        </div>

        <div className="name-pack-update">
          <div className="name-pack-child">
            <p className="name-pack-title">Tên Gói</p>
          </div>
          <Input
            value={packName}
            className="input-name-pack"
            placeholder="Nhập tên gói"
            onChange={(e) => handleChangePackName(e)}
          />
        </div>
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
            defaultChecked={true}
            className="checkbox-price-pack-child"
            onChange={onChangeChecked}
          >
            Vé lẻ (vnđ/vé) với giá
          </Checkbox>
          <Input
            className="input-price-pack-child"
            placeholder="Giá vé"
            style={{ width: 120 }}
            onChange={onChangeTicketPrice}
          />
          <span className="span-pack-child"> / vé</span>
        </div>

        <div className="price-pack-child">
          <Checkbox
            defaultChecked={true}
            className="checkbox-price-pack-child"
            onChange={onChangeChecked}
          >
            Combo vé với giá
          </Checkbox>
          <Input
            className="input-price-pack-child"
            placeholder="Giá combo"
            style={{ width: 120 }}
            onChange={onChangeComboPrice}
          />
          <span className="span-pack-child"> / </span>
          <Input
            className="input-price-pack-child"
            placeholder="Số vé"
            style={{ width: 80 }}
            onChange={onChangeTicketQuantity}
          />
          <span className="span-pack-child">vé</span>
        </div>
      </div>

      <div className="status-pack">
        <p>Tình trạng</p>
        <Select
          className="select-status-pack"
          value={statusAdd}
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
        <button className="button-pack-first" onClick={props.handleOpenModalUpdate} >Hủy</button>
        <button className="button-pack-second" onClick={handleUpdatePack} >Lưu</button>
      </div>
    </div>
  );
}

export default UpdatePackModal;
