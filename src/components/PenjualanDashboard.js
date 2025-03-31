import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Penting untuk mendaftarkan semua komponen Chart.js

function PenjualanDashboard() {
  const [dataPenjualan, setDataPenjualan] = useState({});
  const [filterPeriode, setFilterPeriode] = useState('bulanan');
  const [filterProduk, setFilterProduk] = useState('semua');
  const [filterLokasi, setFilterLokasi] = useState('semua');
  const [filterSaluran, setFilterSaluran] = useState('semua');

  useEffect(() => {
    // Fungsi untuk mengambil data penjualan dari API
    const fetchDataPenjualan = async () => {
      try {
        // Ganti URL dengan endpoint API Anda
        const response = await fetch(`/api/penjualan?periode=${filterPeriode}&produk=${filterProduk}&lokasi=${filterLokasi}&saluran=${filterSaluran}`);
        const result = await response.json();
        setDataPenjualan(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataPenjualan();
  }, [filterPeriode, filterProduk, filterLokasi, filterSaluran]);

  // Opsi grafik untuk Chart.js
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tren Penjualan',
      },
    },
  };

  return (
    <div>
      <h2>Dashboard Penjualan</h2>

      {/* Filter */}
      <div>
        <select value={filterPeriode} onChange={(e) => setFilterPeriode(e.target.value)}>
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
          <option value="tahunan">Tahunan</option>
        </select>
        {/* Tambahkan filter untuk produk, lokasi, dan saluran penjualan */}
      </div>

      {/* Grafik Tren Penjualan */}
      {dataPenjualan.trenPenjualan && (
        <Line data={{
          labels: dataPenjualan.trenPenjualan.labels,
          datasets: [{
            label: 'Penjualan',
            data: dataPenjualan.trenPenjualan.data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          }],
        }} options={options} />
      )}

      {/* Grafik Analisis Produk (Matriks ABC) */}
      {dataPenjualan.matriksABC && (
        <Bar data={{
          labels: dataPenjualan.matriksABC.labels,
          datasets: [{
            label: 'Penjualan',
            data: dataPenjualan.matriksABC.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          }],
        }} options={{ ...options, title: { display: true, text: 'Matriks ABC Produk' } }} />
      )}

      {/* Grafik Analisis Pelanggan (RFM) */}
      {dataPenjualan.rfm && (
        <Pie data={{
          labels: dataPenjualan.rfm.labels,
          datasets: [{
            label: 'Pelanggan',
            data: dataPenjualan.rfm.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          }],
        }} options={{ ...options, title: { display: true, text: 'Analisis RFM Pelanggan' } }} />
      )}

      {/* Tambahkan komponen untuk analisis penjualan lainnya */}
    </div>
  );
}

export default PenjualanDashboard;
