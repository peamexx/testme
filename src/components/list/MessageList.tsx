import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from '../../firebase';
import { userStore } from '../../store/UserStore';
import { SendInput } from '../sendInput';

export default function MessageList() {
  const user = userStore((state) => state.user);

  const [enableUpdate, setEnableUpdate] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    if (enableUpdate) {
      getData();
      setEnableUpdate(false);
    }
  }, [enableUpdate])

  const getData = async () => {
    try {
      if (!user?.id) return;

      const q = query(collection(db, 'list'), where('userId', '==', user.id));
      const querySnapshot = await getDocs(q);

      let list: any[] = [];
      querySnapshot.forEach((doc) => list.push(doc.data()));
      setData(list)
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode)
      console.log(errorMessage)
    }
  }

  return (<>
    <h1>hello</h1>
    {data?.map((d: any) => d.value)}
    <SendInput onUpdate={() => setEnableUpdate(true)} />
  </>)
}