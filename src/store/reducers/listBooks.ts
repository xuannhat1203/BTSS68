// const libraryRecord2s = [
//   {
//     soThuTu: 1,
//     tenSach: "Lập trình Java",
//     sinhVienMuon: "Nguyễn Văn A",
//     ngayMuon: "2024-06-01",
//     ngayTra: "2024-06-15",
//     trangThai: true,
//   },
//   {
//     soThuTu: 2,
//     tenSach: "Cấu trúc dữ liệu và giải thuật",
//     sinhVienMuon: "Trần Thị B",
//     ngayMuon: "2024-06-05",
//     ngayTra: "2024-06-20",
//     trangThai: false,
//   },
//   {
//     soThuTu: 3,
//     tenSach: "Cơ sở dữ liệu",
//     sinhVienMuon: "Lê Văn C",
//     ngayMuon: "2024-06-03",
//     ngayTra: "2024-06-18",
//     trangThai: true,
//   },
//   {
//     soThuTu: 4,
//     tenSach: "Lập trình web",
//     sinhVienMuon: "Phạm Thị D",
//     ngayMuon: "2024-06-07",
//     ngayTra: "2024-06-22",
//     trangThai: false,
//   },
//   {
//     soThuTu: 5,
//     tenSach: "Mạng máy tính",
//     sinhVienMuon: "Nguyễn Văn E",
//     ngayMuon: "2024-06-08",
//     ngayTra: "2024-06-23",
//     trangThai: true,
//   },
//   {
//     soThuTu: 6,
//     tenSach: "Hệ điều hành",
//     sinhVienMuon: "Trần Thị F",
//     ngayMuon: "2024-06-10",
//     ngayTra: "2024-06-25",
//     trangThai: false,
//   },
//   {
//     soThuTu: 7,
//     tenSach: "Lập trình di động",
//     sinhVienMuon: "Lê Văn G",
//     ngayMuon: "2024-06-12",
//     ngayTra: "2024-06-27",
//     trangThai: true,
//   },
//   {
//     soThuTu: 8,
//     tenSach: "Phân tích thiết kế hệ thống",
//     sinhVienMuon: "Phạm Thị H",
//     ngayMuon: "2024-06-13",
//     ngayTra: "2024-06-28",
//     trangThai: false,
//   },
//   {
//     soThuTu: 9,
//     tenSach: "Khoa học dữ liệu",
//     sinhVienMuon: "Nguyễn Văn I",
//     ngayMuon: "2024-06-14",
//     ngayTra: "2024-06-29",
//     trangThai: true,
//   },
//   {
//     soThuTu: 10,
//     tenSach: "Trí tuệ nhân tạo",
//     sinhVienMuon: "Trần Thị J",
//     ngayMuon: "2024-06-16",
//     ngayTra: "2024-07-01",
//     trangThai: false,
//   },
// ];
// localStorage.setItem("books", JSON.stringify(libraryRecord2s));

const libraryRecords = JSON.parse(localStorage.getItem("books") || "[]");

const reducerBooks = (state = libraryRecords, action: any) => {
  switch (action.type) {
    case "ADD":
      const newStateAdd = [...state, action.payload];
      localStorage.setItem("books", JSON.stringify(newStateAdd));
      return newStateAdd;
    case "DELETE":
      const newStateDelete = state.filter(
        (item: any) => item.soThuTu !== action.payload
      );
      localStorage.setItem("books", JSON.stringify(newStateDelete));
      return newStateDelete;
    case "EDIT":
      const updatedState = state.map((item: any) => {
        if (item.soThuTu === action.payload2) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
      localStorage.setItem("books", JSON.stringify(updatedState));
      return updatedState;
    case "CHANGE_STATUS":
      const changeStatusState = state.map((item: any) => {
        if (item.soThuTu === action.payload.id) {
          return {
            ...item,
            trangThai: action.payload.status,
          };
        }
        return item;
      });
      localStorage.setItem("books", JSON.stringify(changeStatusState));
      return changeStatusState;
    case "True":
      return action.payload.filter((item: any) => item.trangThai === true);
    case "False":
      return action.payload.filter((item: any) => item.trangThai === false);
    case "All":
      return action.payload;
    default:
      return state;
  }
};

export default reducerBooks;
