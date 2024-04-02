import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UpdateMapel() {
  const { id } = useParams(); // Mengambil id dari parameter URL
  const [namaMapel, setNama] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/api/mapel/${id}`,
          config
        );
        const dataMapel = response.data;

        // Mengisi state dengan data yang didapatkan dari API
        setNama(dataMapel.namaMapel);
      } catch (error) {
        alert("Terjadi kesalahan Sir! " + error);
      }
    };

    fetchData();
  }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

  const namaChangeHandler = (event) => {
    setNama(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();

    // Mendapatkan token autentikasi dari local storage
    const token = localStorage.getItem("token");

    // Membuat objek konfigurasi untuk menyertakan token dalam header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Menyertakan token dalam header "Authorization"
      },
    };

    try {
      // Melakukan permintaan PUT ke URL tertentu dengan data guru yang telah diformat
      await axios.put(
        `http://localhost:8080/api/mapel/${id}`,
        {
          namaMapel,
        },
        config // Menyertakan objek konfigurasi yang berisi token autentikasi
      );

      // Jika permintaan berhasil, tampilkan pesan sukses dan arahkan kembali ke halaman "/guru"
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Berhasil",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/mapel";
    } catch (error) {
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      alert("Terjadi kesalahan: " + error);
    }
  };

  const batal = () => {
    window.location.href = "/mapel";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div class="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Update Mapel</h1>
        <div className="update-mapel mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Update Mapel
          </p>
          <form onSubmit={submitActionHandler}>
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Nama Mapel
              </label>
              <input
                type="text"
                id="jurusan"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                placeholder="Nama Mapel"
                value={namaMapel}
                onChange={namaChangeHandler}
                required
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={batal}
                className="block w-20 sm:w-24 rounded-lg text-black outline outline-red-500 py-3 text-sm font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="block w-20 sm:w-24 rounded-lg text-black outline outline-[#0b409c] py-3 text-sm font-medium"
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

export default UpdateMapel;
