import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function UpdateKelas() {
  const { id } = useParams(); // Mengambil id dari parameter URL
  const [nama_kelas, setKelas] = useState("");
  const [nama_jurusan, setJurusan] = useState("");

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
          `http://localhost:8080/api/data_kelas/${id}`,
          config
        );
        const dataKelas = response.data;

        // Mengisi state dengan data yang didapatkan dari API
        setKelas(dataKelas.nama_kelas);
        setJurusan(dataKelas.nama_jurusan);
      } catch (error) {
        alert("Terjadi kesalahan Sir! " + error);
      }
    };

    fetchData();
  }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

  const kelasChangeHandler = (event) => {
    setKelas(event.target.value);
  };

  const jurusanChangeHandler = (event) => {
    setJurusan(event.target.value);
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
        `http://localhost:8080/api/data_kelas/${id}`,
        {
          nama_kelas,
          nama_jurusan,
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
      window.location.href = "/kelas";
    } catch (error) {
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      alert("Terjadi kesalahan: " + error);
    }
  };

  const batal = () => {
    window.location.href = "/kelas";
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Update Kelas</h1>
        <div className="update-kelas mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Update Kelas
          </p>
          <form onSubmit={submitActionHandler}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Kelas
                </label>
                <input
                  type="text"
                  id="jurusan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Kelas"
                  value={nama_kelas}
                  onChange={kelasChangeHandler}
                  required
                />
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Nama Jurusan
                </label>
                <input
                  type="text"
                  id="tanggallahir"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Nama Jurusan"
                  value={nama_jurusan}
                  onChange={jurusanChangeHandler}
                  required
                />
              </div>
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

export default UpdateKelas;
