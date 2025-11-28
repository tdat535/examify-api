// test-firestore.js
const admin = require('./Config/firebase'); // file firebase.js bạn đã tạo

async function testFirestore() {
  try {
    const snapshot = await admin.firestore().collection('notifications').get();
    console.log(`✅ Lấy thành công ${snapshot.size} documents từ collection 'notifications'`);
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data());
    });
  } catch (error) {
    console.error('❌ Lỗi khi kết nối Firestore:', error.message);
  }
}

testFirestore();
