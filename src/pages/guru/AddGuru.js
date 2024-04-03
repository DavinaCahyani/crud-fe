import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

function AddGuru() {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [selectedMapel, setSelectedMapel] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [mapel, setMapel] = useState([]);

  const addGuru = async (e) => {
    e.preventDefault();

    const newGuru = {
      nama,
      jabatan,
      tanggalLahir,
      noTelepon,
      email,
      alamat,
      mapelModel: selectedMapel,
      jenisKelamin,
    };

    // Mendapatkan token dari local storage
    const token = localStorage.getItem("token");

    try {
      // Menambahkan header Authorization dengan token ke dalam permintaan
      const response = await axios.post(
        "http://localhost:8080/api/data_guru",
        newGuru,
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
        window.location.href = "/guru";
      }, 1500);
    } catch (error) {
      console.error("Error adding guru:", error);
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

  const getAllMapel = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/mapel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMapel(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const batal = () => {
    window.location.href = "/guru";
  };

  useEffect(() => {
    getAllMapel();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div class="content-page max-h-screen container p-8 min-h-screen">
        <h1 className="judul text-3xl font-semibold">Tambah Guru</h1>
        <div className="add-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Tambah Guru
          </p>
          <form onSubmit={addGuru}>
            <div className="relative mb-3">
              <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Masukan Nama Guru"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                  Jabatan
                </label>
                <input
                  type="text"
                  id="jabatan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Jabatan"
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  id="tanggallahir"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Tanggal Lahir"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                  required
                />
              </div>{" "}
              <div className="relative">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                  No Telepon
                </label>
                <input
                  type="text"
                  id="notelepon"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan No Telepon"
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900 ">
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900">
                  Mapel
                </label>
                <select
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm sm:text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="mapel"
                  name="mapel"
                  value={selectedMapel ? selectedMapel.id : ""}
                  onChange={(e) =>
                    setSelectedMapel({
                      id: e.target.value,
                      namaMapel: e.target.options[e.target.selectedIndex].text,
                    })
                  }
                  required
                >
                  <option value="" disabled>
                    Pilih Mapel
                  </option>
                  {mapel.map((mapelItem) => (
                    <option key={mapelItem.id} value={mapelItem.id}>
                      {mapelItem.namaMapel}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center mt-2 col-span-2">
                <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900  text-left col-span-2">
                  Jenis Kelamin
                </label>
                <div className="relative mt-[-20px]">
                  <input
                    autoComplete="off"
                    className="group peer hidden"
                    type="radio"
                    name="shippingOption"
                    value="Laki-Laki"
                    id="Laki"
                    onChange={(e) => setJenisKelamin(e.target.value)}
                  />

                  <label
                    htmlFor="Laki"
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-2 text-sm sm:text-xs font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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
                    onChange={(e) => setJenisKelamin(e.target.value)}
                  />

                  <label
                    htmlFor="Perempuan"
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-2 text-sm sm:text-xs font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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

export default AddGuru;
