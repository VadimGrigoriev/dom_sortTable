export default class Table {
  constructor(dataList) {
    this.dataList = dataList;
    this.sortIndex = 0;
    this.sortOption = ['desc', 'asc'];
    this.sortFunc = [
      (a, b) => a.dataset.id - b.dataset.id,
      (a, b) => b.dataset.id - a.dataset.id,
      (a, b) => a.dataset.title.localeCompare(b.dataset.title),
      (a, b) => b.dataset.title.localeCompare(a.dataset.title),
      (a, b) => a.dataset.year - b.dataset.year,
      (a, b) => b.dataset.year - a.dataset.year,
      (a, b) => a.dataset.imdb - b.dataset.imdb,
      (a, b) => b.dataset.imdb - a.dataset.imdb,
    ];
    this.tbody = document.querySelector('.content');
    this.buildTable = this.buildTable.bind(this);
    this.sortTable = this.sortTable.bind(this);
    this.buildTable();
    this.start();
  }

  buildRow(data) {
    const tr = document.createElement('tr');
    tr.classList.add('content-row');
    tr.setAttribute('data-id', data.id);
    tr.setAttribute('data-title', data.title);
    tr.setAttribute('data-year', data.year);
    tr.setAttribute('data-imdb', data.imdb);

    tr.innerHTML = `
            <td>#${data.id}</td>
            <td>${data.title}</td>
            <td>(${data.year})</td>
            <td>imdb: ${data.imdb.toFixed(2)}</td>
        `;
    return tr;
  }

  buildTable() {
    this.tbody.innerHTML = '';
    this.dataList.forEach((data) => {
      this.tbody.appendChild(this.buildRow(data));
    });
  }

  //отрисовка стрелки
  updateSortIndicator() {
    const headers = document.querySelectorAll('.heading');
    headers.forEach((header, index) => {
      header.classList.remove('sorted-asc', 'sorted-desc');
      if (index === Math.floor(this.sortIndex / 2)) {               //Чтобы определить, какой столбец таблицы в данный момент отсортирован
        const option = this.sortOption[this.sortIndex % 2];
        header.classList.add(`sorted-${option}`);
      }
    });
  }

  sortTable() {
    const rows = [...this.tbody.querySelectorAll('.content-row')];
    rows.sort(this.sortFunc[this.sortIndex]);
    rows.forEach((row) => this.tbody.appendChild(row));
    this.updateSortIndicator();
    this.sortIndex = (this.sortIndex + 1) % this.sortFunc.length;
  }

  start() {
    setInterval(() => this.sortTable(), 5000);
  }
}
