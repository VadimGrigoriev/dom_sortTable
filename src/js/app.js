import '../css/style.css';
import dataList from './data';
import Table from './sort-table/sort-table';

document.addEventListener('DOMContentLoaded', () => {
  const table = new Table(dataList);
});
