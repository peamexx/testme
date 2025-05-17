import './Login.css';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase';

export default function Login() {
  const auth = getAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (id == '' || password == '') {
      alert('올바른 아이디/비밀번호를 입력해주세요.');
      return;
    }

    try {
      const docRef = doc(db, 'member', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert('일치하는 아이디가 없습니다.');
        return;
      }

      const data = docSnap.data();
      console.log(data)
      if (data?.email) {
        const res = await signInWithEmailAndPassword(auth, data.email, password);
        console.log(res);
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode.includes('auth/invalid-credential')) {
        alert('올바른 비밀번호를 입력해주세요.');
      }
      console.log(errorCode)
      console.log(errorMessage)
    }
  }

  return (<>
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <input name="id" type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
    </form>
  </>)
}