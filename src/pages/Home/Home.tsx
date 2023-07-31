import ChartDoughnut from "../../component/Charts/DoughtnutChart";
import LineChartComponent from "../../component/Charts/Linechart";
import "./Home.scss";
import { DatePicker } from "antd";
import db from "../../firebase/config";
import { getDocs, collection, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import type { DatePickerProps } from "antd";
import dayjs from 'dayjs';

interface FirebaseData {
  id: string;
  bookingcode: string;
  eventname: string;
  gate: string;
  exportdate: string;
  status: string;
  ticketnumber: string;
  usedate: string;
  price: any
}

function Home() {
  const [dataFamily, setDataFamily] = useState<FirebaseData[]>([]);
  const [dataEvent, setDataEvent] = useState<FirebaseData[]>([]);

  const [newDataFamily, setNewDataFamily] = useState<FirebaseData[]>([]);
  const [newDataEvent, setNewDataEvent] = useState<FirebaseData[]>([]);

  const [dataDayOfMonth, setDataDayOfMonth] = useState<FirebaseData[]>([]);

  const [monthDn, setMonthDn] = useState<string>()
  const [monthLine, setMonthLine] = useState<string>()

  const [totalPrice, setTotalPrice] = useState<number | any>(0)

  // handle fetch data
  useEffect(() => {
    fetchData("ticket-list");
    fetchData( "ticket-list-event")
  }, []);

  const fetchData = async (value: any) => {
    let q = query(collection(db, value))

    const querySnapshot = await getDocs(q);
    const fetchDb: FirebaseData[] = [];

    querySnapshot.docs.map((doc) => {
      return fetchDb.push({ id: doc.id, ...doc.data() } as FirebaseData);
    });

    if (value === "ticket-list") {
      setDataFamily(fetchDb)
      setNewDataFamily(fetchDb)
    } else {
      setDataEvent(fetchDb);
      setNewDataEvent(fetchDb)
    }
  };

  // handle filter dounghtnut
  useEffect(() => {
    if (monthDn) {
      const [m, y] = monthDn.split(", ")

      const firstDay = new Date(Number(y), Number(m) - 1, 1).toLocaleString().split(" ")[1].split("/").reverse().join("-")
      const lastDay = new Date(Number(y), Number(m), 0).toLocaleString().split(" ")[1].split("/").reverse().join("-")

      const filterDateFm = dataFamily.filter((item) => {
        const itemDate = Date.parse(item.usedate.split("/").reverse().join("-"))
        return itemDate <= Date.parse(lastDay) && itemDate >= Date.parse(firstDay)
      })

      const filterDateEv = dataEvent.filter((item) => {
        const itemDate = Date.parse(item.usedate.split("/").reverse().join("-"))
        return itemDate <= Date.parse(lastDay) && itemDate >= Date.parse(firstDay)
      })

      setNewDataFamily(filterDateFm)
      setNewDataEvent(filterDateEv)
    } else {
      setNewDataFamily(dataFamily)
      setNewDataEvent(dataEvent)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthDn])

  const unUseFm = newDataFamily.filter((item) => item.status === "Chưa sử dụng")
  const haveUseFm = newDataFamily.filter((item) => item.status === "Đã sử dụng")

  const unUseEv = newDataEvent.filter((item) => item.status === "Chưa sử dụng")
  const haveUseEv = newDataEvent.filter((item) => item.status === "Đã sử dụng")

  const onChangeMonthDn: DatePickerProps["onChange"] = (date, dateString) => {
    setMonthDn(dateString);
  };

  // handle filter line 
  useEffect(() => {
    if (monthLine) {
      const [m, y] = monthLine.split(", ")

      const firstDay = new Date(Number(y), Number(m) - 1, 1).toLocaleString().split(" ")[1].split("/").reverse().join("-")
      const lastDay = new Date(Number(y), Number(m), 0).toLocaleString().split(" ")[1].split("/").reverse().join("-")

      const filterDateFm = dataFamily.filter((item) => {
        const itemDate = Date.parse(item.usedate.split("/").reverse().join("-"))
        return itemDate <= Date.parse(lastDay) && itemDate >= Date.parse(firstDay)
      })

      setDataDayOfMonth(filterDateFm)
    } else {
      setDataDayOfMonth(dataFamily)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthLine])

  const onChangeMonthLine: DatePickerProps["onChange"] = (date, dateString) => {
    setMonthLine(dateString);
  };

  // handle calculate total
  useEffect(() => {
      const total = dataDayOfMonth.reduce((prev: any, curr: any) => prev += curr.price, 0)
      const newTotal = total.toLocaleString('en-US')
      setTotalPrice(newTotal)
  }, [dataDayOfMonth])

  return (
    <div className="wrapper-home">
      <h2>Thống kê</h2>
      <div className="wrapper-chart">
        <div className="header-chart">
          <p>Doanh thu</p>
          <DatePicker
            defaultValue={dayjs('04, 2023', 'MM, YYYY')}
            picker="month"
            placeholder="Chọn tháng"
            className="date-chart-input"
            format="MM, YYYY"
            onChange={onChangeMonthLine}
          />
        </div>

        <div className="content-chart">
          <LineChartComponent dataFamily={dataFamily} dataDayOfMonth={dataDayOfMonth} />
        </div>

        <div className="total-revenue">
          <p className="title-revenue">Tổng doanh thu theo tháng</p>
          <div className="number-revenue">
            <span>{totalPrice}</span>
            <span>đồng</span>
          </div>
        </div>

        <div className="footer-chart">
          <DatePicker
            picker="month"
            placeholder="Chọn tháng"
            className="date-chart-input"
            format="MM, YYYY"
            onChange={onChangeMonthDn}
          />

          <div className="chart-package">
            <div className="chart-package-child">
              <p>Gói gia đình</p>
              <div className="chart-circle">
                <ChartDoughnut unUse={unUseFm.length} haveUse={haveUseFm.length} />
              </div>
            </div>
            <div className="chart-package-child">
              <p>Gói sự kiện</p>
              <div className="chart-circle">
                <ChartDoughnut unUse={unUseEv.length} haveUse={haveUseEv.length} />
              </div>
            </div>
          </div>

          <div className="desc-chart">
            <div className="desc-chart-child">
              <button className="bt1"></button>
              <p>Vé đã sử dụng</p>
            </div>
            <div className="desc-chart-child">
              <button className="bt2"></button>
              <p>Vé chưa sử dụng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
