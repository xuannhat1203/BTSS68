import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Table.css";

export default function Table() {
  const listBooks: any = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [id, setID] = useState();
  const [formData, setFormData] = useState({
    tenSach: "",
    sinhVienMuon: "",
    ngayMuon: "",
    ngayTra: "",
  });

  const openModal = (book: any) => {
    setEditingBook(book);
    setShowModal(true);
    setID(book.soThuTu);
    setFormData({
      tenSach: book.tenSach,
      sinhVienMuon: book.sinhVienMuon,
      ngayMuon: book.ngayMuon,
      ngayTra: book.ngayTra,
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleStatusChange = (id: number, status: string) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: { id, status: status === "Đã trả" },
    });
  };

  const handleEdits = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    dispatch({
      type: "EDIT",
      payload: formData,
      payload2: id,
    });
    closeModal();
  };

  const handleDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {listBooks.map((item: any, index: any) => (
            <tr key={index}>
              <td>{item.soThuTu}</td>
              <td>{item.tenSach}</td>
              <td>{item.sinhVienMuon}</td>
              <td>{item.ngayMuon}</td>
              <td>{item.ngayTra}</td>
              <td>
                <select
                  value={item.trangThai ? "Đã trả" : "Chưa trả"}
                  onChange={(e) =>
                    handleStatusChange(item.soThuTu, e.target.value)
                  }
                >
                  <option value="Đã trả">Đã trả</option>
                  <option value="Chưa trả">Chưa trả</option>
                </select>
              </td>
              <td>
                <button className="edit-button" onClick={() => openModal(item)}>
                  Sửa
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.soThuTu)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Sửa thông tin sách</h2>
            <form>
              <label>Tên sách:</label>
              <input
                name="tenSach"
                value={formData.tenSach}
                onChange={handleEdits}
                type="text"
              />
              <label>Sinh viên mượn:</label>
              <input
                name="sinhVienMuon"
                value={formData.sinhVienMuon}
                onChange={handleEdits}
                type="text"
              />
              <label>Ngày mượn:</label>
              <input
                name="ngayMuon"
                value={formData.ngayMuon}
                onChange={handleEdits}
                type="text"
              />
              <label>Ngày trả:</label>
              <input
                name="ngayTra"
                value={formData.ngayTra}
                onChange={handleEdits}
                type="text"
              />
              <button type="button" onClick={handleEdit}>
                Lưu thay đổi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
