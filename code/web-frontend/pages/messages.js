import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../app/firebase/config';
import Image from 'next/image';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { useAuthState } from 'react-firebase-hooks/auth';
import ErrorPage from './errorPage';

export default function Messages() {
  const [formValue, setFormValue] = useState('');
  const [activeTab, setActiveTab] = useState();
  const [userInfo, setUserInfo] = useState();
  const [messagesQuery, setMessagesQuery] = useState(null);
  const [loggedUser] = useAuthState(auth)

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('userInfo'));
    setUserInfo(user);
    if (user && user.contacts.length > 0) {
      setActiveTab(user.contacts[0]);
    }
  }, []);

  useEffect(() => {
    if (activeTab) {
      const messageRef = collection(firestore, 'messages');
      const queryByReceiver = query(
        messageRef,
        orderBy('createdAt'),
        limit(25)
      );
      setMessagesQuery(queryByReceiver);
    }
  }, [activeTab]);

  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await addDoc(collection(firestore, 'messages'), {
      text: formValue,
      createdAt: serverTimestamp(),
      profilePic: !userInfo.profilePicture ? "/avatar.svg" : userInfo.profilePicture,
      uid,
      receiver: activeTab
    });

    setFormValue('');
  };

  if (!loggedUser) return <ErrorPage />;

  return (
    <div className="bg-blue-50 min-h-screen">
      <Header />
      {loggedUser && <div className="flex flex-col lg:flex-row gap-6 container py-8 px-4 sm:px-8 max-w-screen-xl mx-auto">
        <aside className="w-full lg:w-72 lg:min-h-screen border rounded-2xl shadow-lg bg-white text-black p-4 sm:p-6">
          <nav className="space-y-4">
            {userInfo?.contacts?.map((contact, index) => (
              <button
                key={contact}
                onClick={() => setActiveTab(contact)}
                className={`flex items-center space-x-3 px-4 py-2 w-full rounded-lg ${activeTab === contact ? "bg-blue-50" : "hover:bg-[#01ABF0] hover:text-white"
                  }`}
              >
                <span>Anonymous user {index + 1}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-blue-50">
          <div className="p-4 sm:p-8 border shadow-md rounded-xl  bg-white">
            <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-center">Messages</h2>
            <div className="h-80 sm:h-96 overflow-y-auto mb-4 px-2">
              {messages &&
                messages
                  .filter(
                    (el) =>
                      (el.receiver === activeTab && el.uid === userInfo.uid) ||
                      (el.receiver === userInfo.uid && el.uid === activeTab)
                  )
                  .map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
            </div>
            <form onSubmit={sendMessage} className="flex items-center gap-2">
              <input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                disabled={!formValue}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <svg
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </main>
      </div>}
      <Footer />
    </div>
  );
}

// Snippet from firestore examples
function ChatMessage({ message }) {
  const { text, uid, profilePic } = message;
  const messageClass =
    uid === auth.currentUser.uid
      ? 'bg-blue-500 text-white ml-auto'
      : 'bg-gray-300 text-gray-700';

  return (
    <div className={`flex items-center mb-4 p-2 rounded-lg max-w-xs ${messageClass}`}>
      <Image
        src={!profilePic ? "/avatar.svg" : profilePic}
        alt="Avatar"
        width={32}
        height={32}
        className="rounded-full mr-2"
      />
      <p className="px-2 break-words">{text}</p>
    </div>
  );
}
