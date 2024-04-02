import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar"; // Sesuaikan path sesuai dengan lokasi file Sidebar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faClipboard,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Dashboard() {
  const [guru, setGuru] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [mapel, setMapel] = useState([]);

  const getAllGuru = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/data_guru`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGuru(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const getAllMapel = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/mapel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setKelas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getAllKelas = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:8080/api/data_kelas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMapel(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllMapel();
    getAllKelas();
    getAllSiswa();
    getAllGuru();
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
        <h1 className="judul text-3xl font-semibold">Dashboard</h1>
        <div className="card-dashboard grid grid-cols-4 gap-4 mt-12">
          <div className="pl-1 h-20 bg-green-400 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA GURU</p>
                <p className="text-lg">{guru.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
          </div>
          <div className="pl-1 h-20 bg-blue-500 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA SISWA</p>
                <p className="text-lg">{siswa.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
          </div>
          <div className="pl-1 h-20 bg-purple-500 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA KELAS</p>
                <p className="text-lg">{kelas.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faClipboard} />
              </div>
            </div>
          </div>
          <div className="pl-1 h-20 bg-yellow-400 rounded-lg shadow-md">
            <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
              <div className="my-auto">
                <p className="font-bold">DATA MAPEL</p>
                <p className="text-lg">{mapel.length}</p>
              </div>
              <div className="my-auto">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
            </div>
          </div>
        </div>
        <div className="tabel-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl">Tabel guru</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nama
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Jabatan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Mapel
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {guru.map((guruData, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {guruData.nama}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {guruData.jabatan}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {guruData.mapelModel && guruData.mapelModel.namaMapel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="tabel-siswa mt-12 bg-white p-5 rounded-xl shadow-lg">
          <h2 className="text-xl">Tabel siswa</h2>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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

export default Dashboard;
