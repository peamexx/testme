import './Join.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { db } from '../../firebase';
import UseAuth from '../../hooks/UseAuth';

export default function Join() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { login } = UseAuth();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (id == '' || password == '') {
      alert('올바른 아이디/비밀번호를 입력해주세요.');
      return;
    } else if (company == '') {
      alert('소속을 선택해주세요.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, `${id}@${company}.com`, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'member', id), {
        email: user.email,
      });

      login(user.email ? user.email : '', () => {
        setTimeout(() => {
          navigate('/');
        }, 500);
      })
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode.includes('auth/invalid-email')) {
        alert('올바른 이메일을 입력해주세요.');
      } else if (errorCode.includes('auth/weak-password')) {
        alert('비밀번호는 6자 이상입니다.');
      } else if (errorCode.includes('auth/email-already-in-use')) {
        alert('이미 존재하는 아이디입니다.');
      }
      console.log(errorCode)
      console.log(errorMessage)
    }
  };

  return (<>
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <input name="id" type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={company} onChange={(e) => setCompany(e.target.value)}>
        <option value="">소속</option>
        <option value="IDIGROW">이디그로</option>
      </select>
      <button onClick={handleSignup}>회원가입</button>
    </form>
  </>)
}