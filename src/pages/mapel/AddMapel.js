import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";

function AddMapel() {
  const [namaMapel, setMapel] = useState("");

  const addMapel = async (e) => {
    e.preventDefault();

    const newMapel = {
      namaMapel,
    };

    // Mendapatkan token dari local storage
    const token = localStorage.getItem("token");

    try {
      // Menambahkan header Authorization dengan token ke dalam permintaan
      const response = await axios.post(
        "http://localhost:8080/api/mapel",
        newMapel,
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
        window.location.href = "/mapel";
      }, 1500);
    } catch (error) {
      console.error("Error adding mapel:", error);
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
    window.location.href = "/mapel";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div class="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Mapel</h1>
        <div className="add-mapel mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Tambah Mapel
          </p>
          <form onSubmit={addMapel}>
            <div className="relative mt-3">
              <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                Nama Mapel
              </label>
              <input
                type="text"
                id="kelas"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Masukan Nama Mapel"
                value={namaMapel}
                onChange={(e) => setMapel(e.target.value)}
                required
              />
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

export default AddMapel;
