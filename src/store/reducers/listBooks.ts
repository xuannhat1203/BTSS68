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
      return state.filter((item: any) => item.trangThai === true);
    case "False":
      return state.filter((item: any) => item.trangThai === false);
    default:
      return state;
  }
};

export default reducerBooks;
