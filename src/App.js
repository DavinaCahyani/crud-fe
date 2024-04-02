import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import "./index.css";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import TableGuru from "./pages/guru/TableGuru";
import TableSiswa from "./pages/siswa/TableSiswa";
import AddGuru from "./pages/guru/AddGuru";
import UpdateGuru from "./pages/guru/UpdateGuru";
import DetailGuru from "./pages/guru/DetailGuru";
import AddSiswa from "./pages/siswa/AddSiswa";
import UpdateSiswa from "./pages/siswa/UpdateSiswa";
import DetailSiswa from "./pages/siswa/DetailSiswa";
import TableKelas from "./pages/kelas/TableKelas";
import AddKelas from "./pages/kelas/AddKelas";
import UpdateKelas from "./pages/kelas/UpdateKelas";
import TableMapel from "./pages/mapel/TableMapel";
import AddMapel from "./pages/mapel/AddMapel";
import UpdateMapel from "./pages/mapel/UpdateMapel";
import { isAuthenticated } from "./utils/auth"; // Import fungsi isAuthenticated

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Tambahkan validasi untuk rute-rute yang memerlukan autentikasi */}
          <Route
            path="/dashboard"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/guru"
            element={isAuthenticated() ? <TableGuru /> : <Navigate to="/" />}
          />
          <Route
            path="/guru/add-guru"
            element={isAuthenticated() ? <AddGuru /> : <Navigate to="/" />}
          />
          <Route
            path="/guru/update-guru/:id"
            element={isAuthenticated() ? <UpdateGuru /> : <Navigate to="/" />}
          />
          <Route
            path="/guru/detail-guru/:id"
            element={isAuthenticated() ? <DetailGuru /> : <Navigate to="/" />}
          />
          <Route
            path="/siswa"
            element={isAuthenticated() ? <TableSiswa /> : <Navigate to="/" />}
          />
          <Route
            path="/siswa/add-siswa"
            element={isAuthenticated() ? <AddSiswa /> : <Navigate to="/" />}
          />
          <Route
            path="/siswa/update-siswa/:id"
            element={isAuthenticated() ? <UpdateSiswa /> : <Navigate to="/" />}
          />
          <Route
            path="/siswa/detail-siswa/:id"
            element={isAuthenticated() ? <DetailSiswa /> : <Navigate to="/" />}
          />
          <Route
            path="/kelas"
            element={isAuthenticated() ? <TableKelas /> : <Navigate to="/" />}
          />
          <Route
            path="/kelas/add-kelas"
            element={isAuthenticated() ? <AddKelas /> : <Navigate to="/" />}
          />
          <Route
            path="/kelas/update-kelas/:id"
            element={isAuthenticated() ? <UpdateKelas /> : <Navigate to="/" />}
          />
          <Route
            path="/mapel"
            element={isAuthenticated() ? <TableMapel /> : <Navigate to="/" />}
          />
          <Route
            path="/mapel/add-mapel"
            element={isAuthenticated() ? <AddMapel /> : <Navigate to="/" />}
          />
          <Route
            path="/mapel/update-mapel/:id"
            element={isAuthenticated() ? <UpdateMapel /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
