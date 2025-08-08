import { UserCard } from "../components/UserCard";
import { cleanUser } from "../libs/CleanUser";
import axios from "axios";
import { useState , useEffect  } from "react";
import type { CardUserProps } from "../libs/CardUserType";

export default function RandomUserPage() {
  const [users, setUsers] = useState<CardUserProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState(() => {
    const saved = localStorage.getItem("genAmount");
  return saved ? parseInt(saved) : 1;
});

  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const rawUsers = resp.data.results;
    const cleanedUsers = rawUsers.map(cleanUser);
    setUsers(cleanedUsers);
  };
  
  useEffect(() => {
    localStorage.setItem("genAmount", genAmount.toString());
  }, [genAmount]);

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(event) => setGenAmount(Number(event.target.value))}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && (
        <p className="display-6 text-center fst-italic my-4">Loading ...</p>
      )}
      {users && !isLoading && users.map
      ((user) => (
          <UserCard
            key={user.email}
            name={user.name}
            imgUrl={user.imgUrl}
            address={user.address}
            email={user.email}
          />
        ))}
    </div>
  );
}
