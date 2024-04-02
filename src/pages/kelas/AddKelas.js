import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

function AddKelas() {
  const [nama_kelas, setKelas] = useState("");
  const [nama_jurusan, setJurusan] = useState("");

  const addKelas = async (e) => {
    e.preventDefault();

    const newKelas = {
      nama_kelas,
      nama_jurusan,
    };

    // Mendapatkan token dari local storage
    const token = localStorage.getItem("token");

    try {
      // Menambahkan header Authorization dengan token ke dalam permintaan
      const response = await axios.post(
        "http://localhost:8080/api/data_kelas",
        newKelas,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/kelas";
      }, 1500);
    } catch (error) {
      console.error("Error adding kelas:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const batal = () => {
    window.location.href = "/kelas";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Kelas</h1>
        <div className="add-kelas mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Tambah Kelas
          </p>
          <form onSubmit={addKelas}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative mt-3">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                  Kelas
                </label>
                <input
                  type="text"
                  id="nama_kelas"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Kelas"
                  value={nama_kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  required
                />
              </div>
              <div className="relative mt-3">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                  Nama Jurusan
                </label>
                <input
                  type="text"
                  id="nama_jurusan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Jurusan"
                  value={nama_jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={batal}
                className="block w-20 sm:w-24 rounded-lg text-black outline outline-red-500 py-3 text-sm sm:text-xs font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="block w-20 sm:w-24 rounded-lg text-black outline outline-[#0b409c] py-3 text-sm sm:text-xs font-medium"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddKelas;
