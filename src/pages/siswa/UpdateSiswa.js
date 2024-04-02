import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateSiswa() {
  const { id } = useParams(); // Mengambil id dari parameter URL
  const [nama_siswa, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [nisn, setNisn] = useState("");
  const [umur, setUmur] = useState("");
  const [alamat, setAlamat] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [kelasList, setKelasList] = useState([]); // Menyimpan daftar mapel

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
          `http://localhost:8080/api/data_siswa/${id}`,
          config
        );
        const dataSiswa = response.data;

        // Mengisi state dengan data yang didapatkan dari API
        setNama(dataSiswa.nama_siswa);
        setAlamat(dataSiswa.alamat);
        setTanggalLahir(dataSiswa.tanggalLahir);
        setUmur(dataSiswa.umur);
        setNisn(dataSiswa.nisn);
        setJurusan(dataSiswa.jurusan);
        setJenisKelamin(dataSiswa.jenisKelamin);
        setSelectedKelas(dataSiswa.kelasModel.id); // Menyimpan mapelModel
      } catch (error) {
        alert("Terjadi kesalahan Sir! " + error);
      }
    };

    fetchData();
  }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

  const namaChangeHandler = (event) => {
    setNama(event.target.value);
  };
  const jurusanChangeHandler = (event) => {
    setJurusan(event.target.value);
  };
  const nisnChangeHandler = (event) => {
    setNisn(event.target.value);
  };
  const tanggalLahirChangeHandler = (event) => {
    setTanggalLahir(event.target.value);
  };
  const alamatChangeHandler = (event) => {
    setAlamat(event.target.value);
  };
  const umurChangeHandler = (event) => {
    setUmur(event.target.value);
  };
  const jenisKelaminChangeHandler = (event) => {
    setJenisKelamin(event.target.value);
  };

  const kelasChangeHandler = (event) => {
    setSelectedKelas(event.target.value); // Mengubah selectedMapel saat mapel dipilih
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();

    // Mendapatkan token autentikasi dari local storage
    const token = localStorage.getItem("token");

    // Membuat objek konfigurasi untuk menyertakan token dalam header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Menyertakan token dalam header "Authorization"
        "Content-Type": "application/json",
      },
    };

    try {
      // Melakukan permintaan PUT ke URL tertentu dengan data guru yang telah diformat
      await axios.put(
        `http://localhost:8080/api/data_siswa/${id}`,
        {
          nama_siswa,
          jurusan,
          tanggalLahir,
          nisn,
          umur,
          alamat,
          kelasModel: { id: selectedKelas },
          jenisKelamin,
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
      window.location.href = "/siswa";
    } catch (error) {
      // Jika terjadi kesalahan, tampilkan pesan kesalahan
      alert("Terjadi kesalahan: " + error);
    }
  };

  const getAllKelas = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/data_kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setKelasList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const batal = () => {
    window.location.href = "/siswa";
  };

  useEffect(() => {
    getAllKelas();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Update Siswa</h1>
        <div className="update-siswa mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Update Siswa
          </p>
          <form onSubmit={submitActionHandler}>
            <div className="relative mt-3">
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                placeholder="Nama"
                value={nama_siswa}
                onChange={namaChangeHandler}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Jurusan
                </label>
                <input
                  type="text"
                  id="jurusan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Jurusan"
                  value={jurusan}
                  onChange={jurusanChangeHandler}
                  required
                />
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="tanggallahir"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Tanggal Lahir"
                  value={tanggalLahir}
                  onChange={tanggalLahirChangeHandler}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Nisn
                </label>
                <input
                  type="text"
                  id="nisn"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Nisn"
                  value={nisn}
                  onChange={nisnChangeHandler}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Umur
                </label>
                <input
                  type="text"
                  id="umur"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Umur"
                  value={umur}
                  onChange={umurChangeHandler}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Alamat
                </label>
                <input
                  type="alamat"
                  id="alamat"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Alamat"
                  value={alamat}
                  onChange={alamatChangeHandler}
                  required
                />
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Kelas
                </label>
                <select
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  id="kelas"
                  name="kelas"
                  autoComplete="kelas-name"
                  value={selectedKelas}
                  onChange={kelasChangeHandler}
                >
                  <option value="" disabled>
                    Kelas
                  </option>
                  {kelasList.map((kelasItem) => (
                    <option key={kelasItem.id} value={kelasItem.id}>
                      {kelasItem.nama_kelas}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center mt-2">
              <label className="block mb-1 text-sm font-medium text-gray-900  text-left col-span-2">
                Jenis Kelamin
              </label>
              <div className="relative mt-[-20px]">
                <input
                  autoComplete="off"
                  className="group peer hidden "
                  type="radio"
                  name="shippingOption"
                  value="Laki-Laki"
                  id="Laki"
                  onChange={jenisKelaminChangeHandler}
                />

                <label
                  htmlFor="Laki"
                  className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <span> Laki-Laki </span>
                </label>

                <svg
                  className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="relative mt-[-20px]">
                <input
                  autoComplete="off"
                  className="group peer hidden"
                  type="radio"
                  name="shippingOption"
                  value="Perempuan"
                  id="Perempuan"
                  onChange={jenisKelaminChangeHandler}
                />

                <label
                  htmlFor="Perempuan"
                  className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                >
                  <span> Perempuan </span>
                </label>

                <svg
                  className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
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

export default UpdateSiswa;
