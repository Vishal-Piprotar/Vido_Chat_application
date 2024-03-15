import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { usersRef } from "../utils/firebaseConfig";
import { UserType } from "../utils/types";
import { useAppSelector } from "../redux/hooks";

function useFetchUsers() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector((quick_meet) => quick_meet.auth.userInfo?.uid);

  useEffect(() => {
    if (uid) {
      const getUser = async () => {
        const firestoreQuery = query(usersRef, where("uid", "!=", uid));
        const data = await getDocs(firestoreQuery);
        const firebaseUsers: Array<UserType> = [];

        data.forEach((user) => {
          const userData: UserType = user.data() as UserType;
          firebaseUsers.push({
            ...userData,
            label: userData.name,
          });
        });
        setUsers(firebaseUsers);
      };
      getUser();
    }
  }, [uid]);
  return [users];
}

export default useFetchUsers;
