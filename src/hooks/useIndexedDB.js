const useIndexedDB = () => {
  // 打开数据库
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('userInfoDB', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('imgs', { keyPath: 'id' });
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  };

  // 存储图片
  const storeImg = async (id, img) => {
    const db = await openDB();
    const transaction = db.transaction(['imgs'], 'readwrite');
    const store = transaction.objectStore('imgs');

    store.put({ id, img });
  };

  // 检索图片
  const getImg = async (id) => {
    const db = await openDB();
    const transaction = db.transaction(['imgs']);
    const store = transaction.objectStore('imgs');
    return new Promise((resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  return { storeImg, getImg };
};

export default useIndexedDB;
