import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

import { db } from '../../firebase';
import { userStore } from '../../store/UserStore';
import { SendInput } from '../sendInput';

export default function MessageList() {
  const user = userStore((state) => state.user);

  const [data, setData] = useState<any>([]);

  const listRef = collection(db, 'list');
  const unsubscribe = onSnapshot(listRef,
    (snapshot) => {
      if (!data || data.length == 0) return;
      console.log('onSnapshot...')

      const addedItems: any[] = [];
      const modifiedItems: any[] = [];
      const removedItems: any[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          addedItems.push(change.doc.data());
        }
        if (change.type === "modified") {
          modifiedItems.push(change.doc.data());
        }
        if (change.type === "removed") {
          removedItems.push(change.doc.data());
        }
      });

      console.log('addedItems', addedItems)
      console.log('modifiedItems', modifiedItems)
      console.log('removedItems', removedItems)

      if (addedItems.length != data.length) {
        getData();
      }
    }, (error) => {
      console.log('onSnapshot error');
      console.log(error);
      unsubscribe();
    });

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    console.log('getData')
    try {
      if (!user?.id) return;

      const q = query(listRef, where('userId', '==', user.id));
      const querySnapshot = await getDocs(q);

      const list: any[] = [];
      querySnapshot?.forEach((doc) => list.push(doc.data()));
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
    <SendInput />
  </>)
}