import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getValue = localStorage.getItem("books");
    if (getValue) {
      setListBooks(JSON.parse(getValue));
    }
  }, []);

  const [listBooks, setListBooks] = useState(() => {
    const getValue = localStorage.getItem("books");
    return getValue ? JSON.parse(getValue) : [];
  });

  const [formData, setFormData] = useState({
    soThuTu: listBooks.length + 1,
    tenSach: "",
    sinhVienMuon: "",
    ngayMuon: "",
    ngayTra: "",
    trangThai: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedListBooks = [...listBooks, formData];
    setListBooks(updatedListBooks);
    localStorage.setItem("books", JSON.stringify(updatedListBooks));
    dispatch({
      type: "ADD",
      payload: formData,
    });
    setIsOpen(false);
  };

  const handleFilter = (trangThai: string) => {
    console.log(trangThai);

    dispatch({
      type: trangThai,
      payload: listBooks,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div>
        <h2>
          <strong>Quản lí mượn sách</strong>
        </h2>
      </div>
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option value="All">Chọn bộ lọc</option>
        <option value="True">Đã trả</option>
        <option value="False">Chưa trả</option>
      </select>
      <div style={{ border: "none" }}>
        <button
          style={{ backgroundColor: "blue", color: "white", border: "none" }}
          onClick={() => setIsOpen(true)}
        >
          Thêm thông tin
        </button>
      </div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h2>Thêm thông tin mượn sách</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Tên sách:
                <input
                  type="text"
                  name="tenSach"
                  value={formData.tenSach}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Tên người mượn:
                <input
                  type="text"
                  name="sinhVienMuon"
                  value={formData.sinhVienMuon}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Ngày mượn:
                <input
                  type="date"
                  name="ngayMuon"
                  value={formData.ngayMuon}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Ngày trả:
                <input
                  type="date"
                  name="ngayTra"
                  value={formData.ngayTra}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div style={{ marginTop: "10px" }}>
              <button type="submit" style={{ marginRight: "10px" }}>
                Lưu
              </button>
              <button type="button" onClick={() => setIsOpen(false)}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default Header;
