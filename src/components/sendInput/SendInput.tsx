import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";

import { db } from '../../firebase';
import { userStore } from '../../store/UserStore';

export default function SendInput() {
  const user = userStore((state) => state.user);

  const [val, setVal] = useState('');

  const handleMessage = async () => {
    try {
      if (!user?.id) return;

      await addDoc(collection(db, 'list'), {
        value: val,
        type: 'string',
        userId: user.id,
        createTime: new Date().toISOString()
      });
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode)
      console.log(errorMessage)
    }
  }

  return (<>
    <input type="text" value={val} onChange={(e: any) => setVal(e.target.value)} />
    <button onClick={handleMessage}>보내기</button>
  </>)
}