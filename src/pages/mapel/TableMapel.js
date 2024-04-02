import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function TableMapel() {
  const [mapel, setMapel] = useState([]);

  const getAllMapel = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/mapel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMapel(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteMapel = async (id) => {
    const token = localStorage.getItem("token");

    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data mapel ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/mapel/hapus/${id}`, {
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
            getAllMapel(); // Mengambil data guru kembali setelah menghapus
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  useEffect(() => {
    getAllMapel();
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
        <h1 className="judul text-3xl font-semibold">Tabel Mapel</h1>
        <div className="tabel-mapel mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl flex justify-between items-center">
            Tabel Mapel
            <Link to={`/mapel/add-mapel`}>
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
                    Nama Mapel
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {mapel.map((mapelData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {mapelData.namaMapel}
                    </td>
                    <td className="whitespace-nowrap text-ceter py-2">
                      <div className="flex items-center -space-x-4 hover:space-x-1">
                        <Link to={`/mapel/update-mapel/${mapelData.id}`}>
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

                        <button
                          className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                          type="button"
                        >
                          <span className="relative inline-block">
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="h-4 w-4"
                              onClick={() => deleteMapel(mapelData.id)}
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

export default TableMapel;
