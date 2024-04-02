import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function TableSiswa() {
  const [siswa, setSiswa] = useState([]);

  const getAllSiswa = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/data_siswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSiswa(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteSiswa = async (id) => {
    const token = localStorage.getItem("token");

    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data siswa ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/data_siswa/hapus/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Menghapus!!",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllSiswa(); // Mengambil data guru kembali setelah menghapus
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  useEffect(() => {
    getAllSiswa();
  }, []);

  return (
    <div className="flex h-screen">
      {/* <nav className="bg-gray-800 dark:bg-gray-900 py-4 pl-6">
      <p className="mr-6 text-white text-xl">Dashboard</p>
    </nav> */}
      <div>
        <Sidebar />
      </div>
      {/* Konten Dashboard */}
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tabel Siswa</h1>
        <div className="tabel-siswa mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Tabel siswa
            <Link to={`/siswa/add-siswa`}>
              <div className="rounded-lg shadow-xl px-3 py-3 bg-slate-100">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="h-5 w-5 text-blue-500"
                />
              </div>
            </Link>
          </h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-s">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nama
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Jurusan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Kelas
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nisn
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Umur
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {siswa.map((siswaData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.nama_siswa}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.kelasModel.nama_jurusan}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.kelasModel.nama_kelas}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.nisn}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {siswaData.umur}
                    </td>

                    <td className="whitespace-nowrap text-ceter py-2">
                      <div className="flex items-center -space-x-4 hover:space-x-1">
                        <Link to={`/siswa/update-siswa/${siswaData.id}`}>
                          <button
                            className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                            type="button"
                          >
                            {/* Pencil Icon */}
                            <span className="relative inline-block">
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="h-4 w-4"
                              />
                            </span>
                          </button>
                        </Link>
                        <Link to={`/siswa/detail-siswa/${siswaData.id}`}>
                          <button
                            className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-green-500 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                            type="button"
                          >
                            {/* Pencil Icon */}
                            <span className="relative inline-block">
                              <FontAwesomeIcon
                                icon={faInfo}
                                className="h-4 w-4"
                              />
                            </span>
                          </button>
                        </Link>
                        <button className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50">
                          <span className="relative inline-block">
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="h-4 w-4"
                              onClick={() => deleteSiswa(siswaData.id)}
                            />
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSiswa;
