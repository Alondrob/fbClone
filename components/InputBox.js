import { useSession } from "next-auth/react"
import Image from "next/image"
import { CameraIcon, EmojiHappyIcon, VideoCameraIcon } from "@heroicons/react/solid";
import firebase from 'firebase/compat/app';
import firestore from 'firebase/compat/firestore'
import {useRef} from 'react'
import {db, storage} from '../fireBase';

const InputBox = () => {
    const {data: session} = useSession();
    const inputRef = useRef(null);

    const sendPost = (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return;

        db.collection("posts").add({
                message: inputRef.current.value,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        inputRef.current.value = ""
    }

   

  return (
      <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
          <div className="flex space-x-4 p-4 items-center">
              <Image
                  className="rounded-full"
                  src={session.user.image}
                  width={40}
                  height={40}
                  layout="fixed"
              />

              <form className="flex flex-1">
                  <input
                    className="rounded-full h-12 bg-gray-100 flex-grow px-5 outline-none" 
                    type="text" 
                    ref={inputRef}
                    placeholder={`What's On Your Mind ${session.user.name} ?`}
                    />
                    <button hidden type="submit" onClick={sendPost}> Submit </button>
              </form>
          </div>

          <div className="flex justify-evenly p-3 border-t">
              <div className="inputIcon">
                  <VideoCameraIcon className="h-7 text-red-500"/>
                  <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
              </div>

              <div className="inputIcon">
                  <CameraIcon className="h-7 text-green-500" />
                  <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
              </div>
              <div className="inputIcon">
                  <EmojiHappyIcon className="h-7 text-yellow-500" />
                  <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
              </div>
          </div>
      </div>

  )
}

    export default InputBox;