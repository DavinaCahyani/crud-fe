import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function DetailGuru() {
  const { id } = useParams(); // Mengambil id dari parameter URL
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [mapel, setMapel] = useState("");

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
          `http://localhost:8080/api/data_guru/${id}`,
          config
        );
        const dataGuru = response.data;

        // Mengisi state dengan data yang didapatkan dari API
        setNama(dataGuru.nama);
        setJabatan(dataGuru.jabatan);
        setMapel(dataGuru.mapelModel.namaMapel); // Mengakses namaMapel dari mapelModel
        setTanggalLahir(dataGuru.tanggalLahir);
        setNoTelepon(dataGuru.noTelepon);
        setEmail(dataGuru.email);
        setAlamat(dataGuru.alamat);
        setJenisKelamin(dataGuru.jenisKelamin);
      } catch (error) {
        alert("Terjadi kesalahan Sir! " + error);
      }
    };

    fetchData();
  }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

  function formatTanggal(tanggal) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(tanggal);

    return formattedDate.toLocaleDateString("id-ID", options);
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="mx-auto min-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen max-h-screen p-4 sm:ml-64">
        <div className="grid md:grid-cols-2 gap-3">
          <section className="bg-white p-8 shadow-md rounded-md">
            <h1 className="text-xl font-semibold text-gray-900 mb-8 text-center">
              Informasi Detail Guru
            </h1>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Nama:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {nama}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Jabatan:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {jabatan}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Mapel:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {mapel}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Tanggal Lahir:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {formatTanggal(tanggalLahir)}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                No Telepon:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {noTelepon}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Email:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {email}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Alamat:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {alamat}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Jenis Kelamin:
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {jenisKelamin}
              </p>
            </div>
            {/* Tombol kembali menggunakan Link */}
            <div className="flex justify-end mt-7">
              <Link
                to="/guru"
                className="z-20 block rounded-full border-2 border-blue-500 bg-blue-500 text-white p-2 text-sm transition-all hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-700"
              >
                Kembali
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DetailGuru;
