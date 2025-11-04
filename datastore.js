(function(window){
  const COLLECTIONS = ['products','categories','brands','orders'];
  const STORAGE_KEY = 'clickcart_data_v1';

  async function seedFromFiles() {
    const seeded = {};
    for (const name of COLLECTIONS) {
      try {
        const res = await fetch(`./storage/${name}.json`);
        if (res.ok) {
          seeded[name] = await res.json();
        } else {
          seeded[name] = [];
        }
      } catch (e) {
        seeded[name] = [];
      }
    }
    return seeded;
  }

  function loadFromLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return data && typeof data === 'object' ? data : null;
    } catch(e) { return null; }
  }

  function saveToLocal(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function ensureData(data) {
    for (const c of COLLECTIONS) {
      if (!Array.isArray(data[c])) data[c] = [];
    }
    return data;
  }

  function nextId(items) {
    let max = 0;
    for (const it of items) {
      const id = parseInt(it.id || it.product_id || it.category_id || it.brand_id || it.order_id, 10);
      if (!isNaN(id) && id > max) max = id;
    }
    return max + 1;
  }

  async function init() {
    let data = loadFromLocal();
    if (!data) {
      data = await seedFromFiles();
      saveToLocal(ensureData(data));
    }
    return getAPI();
  }

  function getData() {
    return ensureData(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
  }

  function setData(data) {
    saveToLocal(ensureData(data));
  }

  function getAPI() {
    return {
      list: (collection) => Promise.resolve(getData()[collection] || []),
      get: (collection, id) => Promise.resolve((getData()[collection] || []).find(x => String(x.id) === String(id))),
      create: (collection, item) => {
        const data = getData();
        const arr = data[collection] || [];
        const id = nextId(arr);
        const entity = { id, ...item };
        arr.push(entity);
        data[collection] = arr;
        setData(data);
        return Promise.resolve(entity);
      },
      update: (collection, id, partial) => {
        const data = getData();
        const arr = data[collection] || [];
        const idx = arr.findIndex(x => String(x.id) === String(id));
        if (idx === -1) return Promise.resolve(null);
        arr[idx] = { ...arr[idx], ...partial };
        data[collection] = arr;
        setData(data);
        return Promise.resolve(arr[idx]);
      },
      remove: (collection, id) => {
        const data = getData();
        const arr = data[collection] || [];
        const filtered = arr.filter(x => String(x.id) !== String(id));
        data[collection] = filtered;
        setData(data);
        return Promise.resolve(true);
      }
    };
  }

  window.ClickCartStore = { init };
})(window);
