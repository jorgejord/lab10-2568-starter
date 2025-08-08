import { BsMailbox2, BsFillPinMapFill } from "react-icons/bs";

interface UserCardDetailProps {
  email: string;
  address: string;
}

export const UserCardDetail = ({ email, address }: UserCardDetailProps) => {
  return (
    <div className="text-center">
      <p>
        <BsMailbox2 /> {email}
      </p>
      <p>
        <BsFillPinMapFill /> {address}
      </p>
    </div>
  );
};
